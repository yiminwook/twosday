"use client";
import { MouseEvent, useRef, useState } from "react";
import Viewer from "./Viewer";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getWasUrl } from "@/utils/getWasUrl";
import * as css from "./home.css";
import { useSetModalStore } from "@/stores/modalStore";
import TagsModal from "./TagsModal";
import Form from "./Form";
import { excuteThumnail } from "@/utils/excuteThumbnail";
import { extensions } from "@/libraries/extentions";
import { useEditor } from "@tiptap/react";

interface HomeProps {
  session: Session;
}

export default function Home({ session }: HomeProps) {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();
  const modalStore = useSetModalStore();
  const [togglePreview, setTogglePreview] = useState(false);

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

  const mutation = useMutation({
    mutationFn: async (e: MouseEvent) => {
      if (!editor) return;
      const response = await fetch(`${getWasUrl()}/api/twosday/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          title,
          content: editor.getHTML(),
          tags: [],
          isPublic: true,
          thumbnail: excuteThumnail(value),
        }),
        credentials: "include",
      });

      const body: { data: { id: number }; message: string[] } = await response.json();

      if (!response.ok) {
        throw new Error(body.message[0]);
      }

      return body;
    },
    onSuccess: (body) => {
      toast.success("업로드 성공");
      router.push(`/post/${body?.data.id}`);
    },
    onSettled: async () => {
      await fetch("/api/revalidate/tag?name=post");
    },
  });

  const onChange = (value: string) => {
    setValue(() => value);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(() => e.target.value);
  };

  const addTag = (tag: string) => {
    setTags((prev) => [...prev, tag]);
  };

  const openTagsModal = async () => {
    const newTag: string[] = await modalStore.push(TagsModal, {
      props: { tags, session },
    });
    setTags(() => newTag);
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
            onClick={mutation.mutate}
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
              value={value}
              onChange={onChange}
              tags={tags}
              openTagsModal={openTagsModal}
              editor={editor}
              session={session}
            />
          )}
        </div>
      </section>
    </div>
  );
}
