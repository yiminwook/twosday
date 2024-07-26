import "@/style/highlight.css"; // 코드박스 하이라이트 스타일
import "@/style/editor.css";
import { getWasUrl } from "@/app/_lib/getWasUrl";
import Viewer from "@web/(withAuth)/upload/_component/Viewer";
import { notFound } from "next/navigation";

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
  const response = await fetch(`${getWasUrl()}/api/twosday/post/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const body: { data: Post; message: string[] } = await response.json();

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(body.message[0]);
  }

  return (
    <div>
      <h1>단건 조회 페이지</h1>
      <div>
        <div>
          <h2>{body.data.title}</h2>
          <p>{body.data.createdAt}</p>
          <p>{body.data.updatedAt}</p>
        </div>
        <Viewer content={body.data.content} />
      </div>
    </div>
  );
}
