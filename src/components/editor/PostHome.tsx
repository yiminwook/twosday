"use client";
import { clientApi } from "@/apis/fetcher";
import { IMAGE_URL } from "@/constances";
import { useSession } from "@/libraries/auth/useSession";
import { extensions } from "@/libraries/extentions";
import { TTag } from "@/types";
import {
  ActionIcon,
  ComboboxData,
  ComboboxItem,
  ComboboxLikeRenderOptionInput,
  Input,
  Stack,
  TagsInput,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEditor } from "@tiptap/react";
import ky from "ky";
import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import Editor from "./Editor";
import css from "./Home.module.scss";
import editCss from "./Edit.module.scss";
import { useSetModalStore } from "@/stores/modalStore";
import ConfirmModal from "../common/modal/ConfirmModal";

type Props = {};
export default function PostHome({}: Props) {
  const session = useSession().data!;
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const router = useRouter();
  const [togglePreview, setTogglePreview] = useState(false);
  const queryClient = useQueryClient();
  const modalStore = useSetModalStore();

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
      editable: !togglePreview,
    },
    [togglePreview],
  );

  const tagsQuery = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const json = await clientApi.get<{ message: string; data: TTag[] }>("tags").json();
      return json.data;
    },
  });

  const postTagMutation = useMutation({
    mutationFn: async (arg: { name: string; session: Session }) => {
      const json = await clientApi
        .post<{ message: string; data: { id: number } }>("tags", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${arg.session.accessToken}`,
          },
          json: {
            name: arg.name,
          },
        })
        .json();

      return json.data;
    },
    onSuccess: (data, arg) => {
      queryClient.setQueryData(["tags"], (prev: TTag[] | undefined) => {
        if (!prev) return prev;
        return [...prev, { id: data.id, name: arg.name }];
      });

      toast.success("태그가 추가되었습니다.");
    },
    onError: async (error, arg) => {
      await queryClient.invalidateQueries({ queryKey: ["tags"] });
      setTags((prev) => prev.filter((tag) => tag !== arg.name));
      toast.error(error.message);
    },
  });

  const removeTagMutation = useMutation({
    onMutate: (arg) => {
      // Optimistic UI update
      queryClient.setQueryData(["tags"], (prev: TTag[] | undefined) => {
        if (!prev) return prev;
        return prev.filter((tag) => tag.id !== arg.id);
      });

      toast.success("태그가 삭제되었습니다.");
    },
    mutationFn: async (arg: { id: number; session: Session }) => {
      const json = await clientApi
        .delete<{ message: string; data: { id: number } }>(`tags/${arg.id}`, {
          headers: {
            Authorization: `Bearer ${arg.session.accessToken}`,
          },
        })
        .json();

      return json.data;
    },
    onSuccess: (data) => {},
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.error(error.message);
    },
  });

  const mutationPost = useMutation({
    mutationFn: async (arg: { content: string; imageKeys: string[] }) => {
      const json = await clientApi<{ data: { id: number }; message: string }>("posts", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        json: {
          title,
          content: arg.content,
          tagIds: [],
          imageKeys: arg.imageKeys,
          categoryId: null,
          isPublic: true,
        },
      }).json();

      return json.data;
    },
    onSuccess: (data) => {
      toast.success("업로드 성공");
      router.push(`/posts/${data.id}`);
    },
    onSettled: async () => {
      await ky.get("/api/revalidate/tag?name=post");
    },
  });

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(() => e.target.value);
  };

  const onSave = (e: MouseEvent<HTMLButtonElement>) => {
    if (mutationPost.isPending) return;
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

    mutationPost.mutate({
      content: editor.getHTML(),
      imageKeys: savedImageKeys || [],
    });
  };

  const onChangeSelect = async (value: string[]) => {
    if (!tagsQuery.data) return;
    if (postTagMutation.isPending) return;

    value.forEach((v) => {
      const index = tagsQuery.data.findIndex((tag) => tag.name === v);
      if (index === -1) {
        postTagMutation.mutate({ name: v, session });
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

  const comboboxTags = useMemo<ComboboxData>(() => {
    return (
      tagsQuery.data?.map((tag) => ({
        value: tag.id.toString(),
        label: tag.name,
      })) || []
    );
  }, [tagsQuery.data]);

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

  const text = editor.getText();
  console.log("text", text);

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
        <div className={css.nav}>
          <button
            className={css.navBtn}
            type="button"
            onClick={() => setTogglePreview((pre) => !pre)}
          >
            {togglePreview ? "편집" : "미리보기"}
          </button>
          <button className={css.navBtn} type="button">
            삭제
          </button>
          <button
            className={css.navBtn}
            type="submit"
            disabled={mutationPost.isPending}
            onClick={onSave}
          >
            저장
          </button>
        </div>
        <div>
          <Stack gap="md" component="form">
            <Input
              size="md"
              type="text"
              placeholder="제목을 입력해주세요"
              id="upload-tag"
              onChange={onChangeTitle}
              value={title}
            />
            <TagsInput
              size="md"
              onChange={onChangeSelect}
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
            <Editor editor={editor} editable={!togglePreview} session={session} />
          </Stack>
        </div>
      </section>
    </div>
  );
}
