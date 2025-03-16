"use client";
import { MouseEvent, useState } from "react";
import Viewer from "./Viewer";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import * as css from "./home.css";
import Form from "./Form";
import { excuteThumnail } from "@/utils/excuteThumbnail";
import { extensions } from "@/libraries/extentions";
import { useEditor } from "@tiptap/react";
import { useSession } from "@/libraries/auth/useSession";
import { clientApi } from "@/apis/fetcher";
import { IMAGE_URL } from "@/constances";

interface HomeProps {}

export default function Home({}: HomeProps) {
  const session = useSession().data!;
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();
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
      await fetch("/api/revalidate/tag?name=post");
    },
  });

  const onChange = (value: string) => {
    setValue(() => value);
  };

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

    console.log("images", savedImageKeys);
    mutation.mutate({
      content: editor.getHTML(),
      imageKeys: savedImageKeys || [],
    });
  };

  const addTag = (tag: string) => {
    setTags((prev) => [...prev, tag]);
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
              value={value}
              onChange={onChange}
              tags={tags}
              editor={editor}
              session={session}
            />
          )}
        </div>
      </section>
    </div>
  );
}
