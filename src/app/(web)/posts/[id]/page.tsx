import Viewer from "@/components/editor/Viewer";
import { notFound } from "next/navigation";
import Comment from "@/components/editor/Comment";
import * as css from "./page.css";
import AdBanner from "@/components/adBanner/AdBanner";
import { TSelectPost } from "@/libraries/pg/posts/posts.type";
import { body } from "@/components/editor/editor.css";
import KakaoAdFit from "@/components/adBanner/KakaoAdfit";

type Author = {
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  email: string;
  nickname: string;
  avartar: string | null;
};

type Tag = string[];

type Post = {
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  title: string;
  thumbnail: string | null;
  content: string;
  isPublic: boolean;
  viewCount: number;
  author: Author;
  tags: Tag;
};

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json: { data: TSelectPost; message: string } = await response.json();

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }

    throw new Error(json.message);
  }

  console.log(json.data);

  return (
    <div className={css.wrap}>
      <h1 className="blind">단건 조회 페이지</h1>
      <div className={css.viewerBox}>
        <div className={css.viewerHead}>
          <h2>{json.data.title}</h2>
          <p>{json.data.createdAt}</p>
          <p>{json.data.updatedAt}</p>
        </div>
        <Viewer content={json.data.content} />
      </div>

      <KakaoAdFit width={728} height={90} unit="DAN-CScUcNvZZ5M7SER1" />

      <div className={css.commentBox}>
        <Comment />
      </div>
    </div>
  );
}
