"use client";
import { MouseEvent, useState } from "react";
import Viewer from "./Viewer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import * as css from "./home.css";
import Form from "./Form";
import { extensions } from "@/libraries/extentions";
import { useEditor } from "@tiptap/react";
import { useSession } from "@/libraries/auth/useSession";
import { clientApi } from "@/apis/fetcher";
import { IMAGE_URL } from "@/constances";
import { TTag } from "@/types";
import {
  deleteTagController,
  getTagsController,
  postTagController,
} from "@/libraries/pg/tags/tag.controller";
import { serverActionHandler } from "@/apis/serverActionHandler";
import ky from "ky";

interface HomeProps {}

export default function Home({}: HomeProps) {
  const session = useSession().data!;
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const router = useRouter();
  const [togglePreview, setTogglePreview] = useState(false);
  const queryClient = useQueryClient();

  const editor = useEditor({
    extensions,
    /** 에디터가 초기화될 때 기다리지 않고 바로 콘텐츠를 렌더링 **/
    immediatelyRender: false,
    /** 에디터 내부에서 트랜잭션 발생시 리렌더링 **/
    shouldRerenderOnTransaction: false,
    content: `
      <p>Hello! This is a <code>tiptap</code> editor.</p>
      `,
  });

  const tagsQuery = useQuery({
    queryKey: ["tags"],
    queryFn: () => serverActionHandler(getTagsController()),
  });

  const postTagMutation = useMutation({
    mutationFn: async (arg: { name: string; session: Session }) =>
      serverActionHandler(postTagController({ name: arg.name })),
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
    mutationFn: async (arg: { id: number; session: Session }) =>
      serverActionHandler(deleteTagController({ id: arg.id })),
    onSuccess: (data) => {
      queryClient.setQueryData(["tags"], (prev: TTag[] | undefined) => {
        if (!prev) return prev;
        return prev.filter((tag) => tag.id !== data.id);
      });

      toast.success("태그가 삭제되었습니다.");
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey: ["tags"] });
      setTags((prev) => prev.filter((tag) => tag !== value));
      toast.error(error.message);
    },
  });

  const mutation = useMutation({
    mutationFn: async (arg: { content: string; imageKeys: string[] }) => {
      const response = await clientApi("posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          title,
          content: arg.content,
          tagIds: [],
          imageKeys: arg.imageKeys,
          categoryId: null,
          isPublic: true,
        }),
        credentials: "include",
      });

      const body: { data: { id: number }; message: string } = await response.json();

      return body;
    },
    onSuccess: (body) => {
      toast.success("업로드 성공");
      // router.push(`/posts/${body?.data.id}`);
    },
    onSettled: async () => {
      await ky.get("/api/revalidate/tag?name=post");
    },
  });

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(() => e.target.value);
  };

  const onSave = (e: MouseEvent<HTMLButtonElement>) => {
    if (mutation.isPending) return;
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

    mutation.mutate({
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

  const removeTag = async (tagId: number) => {
    if (removeTagMutation.isPending) return;
    removeTagMutation.mutate({ id: tagId, session });
  };

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
            disabled={mutation.isPending}
            onClick={onSave}
          >
            저장
          </button>
        </div>
        <div>
          {togglePreview ? (
            <Viewer content={value} />
          ) : (
            <Form
              title={title}
              onChangeTitle={onChangeTitle}
              tags={tagsQuery.data || []}
              selectedTags={tags}
              onChangeSelect={onChangeSelect}
              removeTag={removeTag}
              isLoadingTags={tagsQuery.isPending}
              editor={editor}
              session={session}
            />
          )}
        </div>
      </section>
    </div>
  );
}
