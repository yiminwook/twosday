import { getWasUrl } from "@/app/_lib/getWasUrl";
import Viewer from "@web/(withAuth)/upload/_component/Viewer";
import { notFound } from "next/navigation";
import { title } from "process";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  console.log("test", params);
  const response = await fetch(`${getWasUrl()}/api/twosday/post/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(data.message);
  }

  const post = data.post as {
    id: number;
    updatedAt: string;
    createdAt: string;
    deletedAt: string | null;
    title: string;
    content: string;
    isPublic: boolean;
  };

  return (
    <div>
      <h1>단건 조회 페이지</h1>
      <div>
        <div>
          <h2>{post.title}</h2>
          <p>{post.createdAt}</p>
          <p>{post.updatedAt}</p>
        </div>
        <Viewer content={post.content} />
      </div>
    </div>
  );
}
