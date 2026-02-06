"use client";
import { revalidateApi } from "@/apis/fetcher";
import { IMAGE_URL, POST_TAG } from "@/constants";
import { useSession } from "@/libraries/auth/use-session";
import { extensions } from "@/libraries/extentions";
import {
  ActionIcon,
  Button,
  ButtonGroup,
  Checkbox,
  ComboboxData,
  ComboboxItem,
  ComboboxLikeRenderOptionInput,
  Input,
  Stack,
  TagsInput,
} from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useEditor } from "@tiptap/react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import Editor from "./editor";
import css from "./home.module.scss";
import editCss from "./edit.module.scss";
import { useSetModalStore } from "@/stores/modal-store";
import ConfirmModal from "../common/modal/confirm-modal";
import { useManageTags, useServerTags } from "@/hooks/use-tags";
import { usePostCreateMutation } from "@/hooks/use-post";

type Props = {};

export default function PostHome({}: Props) {
  const router = useRouter();
  const session = useSession().data!;

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(false);

  const [togglePreview, setTogglePreview] = useState(false);

  const queryClient = useQueryClient();
  const modalStore = useSetModalStore();

  const tagsQuery = useServerTags();
  const { postTagMutation, removeTagMutation } = useManageTags(session);
  const mutationPost = usePostCreateMutation();

  const editor = useEditor(
    {
      extensions,
      /** 에디터가 초기화될 때 기다리지 않고 바로 콘텐츠를 렌더링 **/
      immediatelyRender: true,
      /** 에디터 내부에서 트랜잭션 발생시 리렌더링 **/
      shouldRerenderOnTransaction: false,
      content: `
      <p>Hello! This is a <code>tiptap</code> editor.</p>
      `,
      editable: true, // 인스턴스 생성시 결정, 초기값
      onUpdate: ({ editor }) => {
        console.log("HTML", editor.getHTML());
      },
    },
    [togglePreview],
  );

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(() => e.target.value);
  };

  const onSave = (e: MouseEvent<HTMLButtonElement>) => {
    if (mutationPost.isPending) return;
    if (!tagsQuery.data) return;
    if (!editor) {
      toast.warning("에디터를 로드하지 못했습니다.");
      return;
    }

    const savedImageKeys = editor
      .getJSON()
      .content?.filter((node) => node.type === "image")
      .map((node) => {
        const src = node.attrs?.src as string | undefined;
        if (!src) return null;
        return src.startsWith(IMAGE_URL) ? src.replace(IMAGE_URL + "/", "") : null;
      })
      .filter((src): src is string => typeof src === "string");

    mutationPost.mutate(
      {
        title,
        content: editor.getHTML(),
        isPublic,
        imageKeys: savedImageKeys || [],
        tagIds: tags
          .map((tag) => tagsQuery.data.find((t) => t.name === tag)?.id)
          .filter((tagId): tagId is number => typeof tagId === "number"),
        session,
      },
      {
        onSuccess: async (data) => {
          await Promise.all([
            revalidateApi.get(`tag?name=${POST_TAG}`), // 서버캐시
            queryClient.invalidateQueries({ queryKey: ["author-posts"] }), // 클라이언트캐시
          ]);
          toast.success("업로드 성공");
          router.push(`/my/posts/${data.id}`);
        },
      },
    );
  };

  const comboboxTags = useMemo<ComboboxData>(() => {
    return (
      tagsQuery.data?.map((tag) => ({
        value: tag.id.toString(),
        label: tag.name,
      })) || []
    );
  }, [tagsQuery.data]);

  const selectTag = (value: string[]) => {
    if (!tagsQuery.data) return;
    if (postTagMutation.isPending) return;

    value.forEach((v) => {
      const index = tagsQuery.data.findIndex((tag) => tag.name === v);
      if (index === -1) {
        postTagMutation.mutate(
          { name: v, session },
          {
            onError: async (error, arg) => {
              await queryClient.invalidateQueries({ queryKey: ["tags"] });
              setTags((prev) => prev.filter((tag) => tag !== arg.name));
              toast.error(error.message);
            },
          },
        );
      }
    });

    setTags(() => value);
  };

  const removeTag = useCallback(
    (tagId: number) => {
      if (removeTagMutation.isPending) return;
      removeTagMutation.mutate({ id: tagId, session });
    },
    [removeTagMutation, session],
  );

  const renderTagsInputOption = useCallback(
    (
      input: ComboboxLikeRenderOptionInput<{
        value: string;
        label: string;
      }>,
    ) => (
      <div className={editCss.tagsInputItem}>
        <span>{input.option.label}</span>
        <ActionIcon
          variant="subtle"
          size="md"
          onClick={(e) => {
            e.stopPropagation();
            removeTag(Number(input.option.value));
          }}
        >
          <X size={14} />
        </ActionIcon>
      </div>
    ),
    [removeTag],
  );

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // 새로고침 방지
      const text = editor.getText();
      if (!text) return;

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [editor, router, modalStore]);

  return (
    <div className={css.main}>
      <h1 className="blind">게시글 업로드 페이지</h1>
      <section className={css.section}>
        <h2 className="blind">{togglePreview ? "미리보기" : "게시글 작성"}</h2>

        <nav className={css.nav}>
          <ButtonGroup>
            <Button variant="default" onClick={() => setTogglePreview((pre) => !pre)}>
              {togglePreview ? "편집" : "미리보기"}
            </Button>
            <Button variant="default">삭제</Button>
            <Button variant="default" disabled={mutationPost.isPending} onClick={onSave}>
              저장
            </Button>
          </ButtonGroup>

          <Button variant="default" onClick={() => setIsPublic((pre) => !pre)}>
            {isPublic ? "공개" : "비공개"}
            <Checkbox checked={isPublic} readOnly ml={10} />
          </Button>
        </nav>

        <Input
          size="md"
          mt={10}
          type="text"
          value={title}
          onChange={onChangeTitle}
          placeholder="제목을 입력해주세요"
        />

        <TagsInput
          size="md"
          mt={10}
          onChange={selectTag}
          value={tags}
          data={comboboxTags}
          renderOption={renderTagsInputOption as any}
          splitChars={[",", " ", "|"]}
          acceptValueOnBlur
          clearable
          filter={({ options, search }) => {
            const filtered = (options as ComboboxItem[]).filter((option) =>
              option.label.toLowerCase().trim().includes(search.toLowerCase().trim()),
            );
            // 알파벳 순서로 정렬
            filtered.sort((a, b) => a.label.localeCompare(b.label));
            return filtered;
          }}
        />

        <div className={css.editorBox}>
          <Editor editor={editor} editable={!togglePreview} session={session} />
        </div>
      </section>
    </div>
  );
}
