"use client";
import { MouseEvent, useRef, useState } from "react";
import ReactQuill from "react-quill";
import Viewer from "./_component/Viewer";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getWasUrl } from "@/app/_lib/getWasUrl";
import * as css from "./home.css";
import { useSetModalStore } from "@/app/_lib/modalStore";
import TagsModal from "./_component/TagsModal";
import Form from "./_component/Form";

interface HomeProps {
  session: Session;
}

export default function Home({ session }: HomeProps) {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const quillRef = useRef<ReactQuill>(null);
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();
  const modalStore = useSetModalStore();
  const [togglePreview, setTogglePreview] = useState(false);

  const mutation = useMutation({
    mutationFn: async (e: MouseEvent) => {
      const response = await fetch(`${getWasUrl()}/api/twosday/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          title,
          content: value,
          tags: [],
          isPublic: true,
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
      router.push(`/post/${body.data.id}`);
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
      props: { tags },
    });
    setTags(() => newTag);
  };

  return (
    <div className={css.main}>
      <h1 className="blind">게시글 업로드 페이지</h1>
      <section>
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
              quillRef={quillRef}
              session={session}
            />
          )}
        </div>
      </section>
    </div>
  );
}
