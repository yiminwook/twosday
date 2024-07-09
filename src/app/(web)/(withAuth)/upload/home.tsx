"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import Viewer from "./_component/Viewer";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Post } from "@web/(anyAuth)/post/_component/List";
import { useRouter } from "next/navigation";

const Editor = dynamic(() => import("./_component/Editor"), { ssr: false });

interface HomeProps {
  session: Session;
}

export default function Home({ session }: HomeProps) {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const quillRef = useRef<ReactQuill>(null);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/was/twosday/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          title,
          content: value,
          tags: [],
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data as Post;
    },
    onSuccess: (data) => {
      toast.success("업로드 성공");
      router.push(`/post/${data.id}`);
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  const onChange = (value: string) => {
    setValue(() => value);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(() => e.target.value);
  };

  return (
    <div>
      <div>
        <h1>포스트</h1>
      </div>
      <section>
        <form onSubmit={onSubmit}>
          <h2>에디터</h2>
          <div>
            <input type="text" onChange={onChangeTitle} />
          </div>
          <Editor value={value} onChange={onChange} editorRef={quillRef} session={session} />
          <div>
            <button type="submit" disabled={mutation.isPending}>
              업로드
            </button>
          </div>
        </form>
      </section>
      <section>
        <h2>미리보기</h2>
        <Viewer content={value} />
      </section>
    </div>
  );
}
