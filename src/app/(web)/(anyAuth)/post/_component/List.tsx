"use client";
import { useQuery } from "@tanstack/react-query";
import { cell, header, headerCell, row, wrap } from "./list.css";
import { useRouter } from "next/navigation";
import { getWasUrl } from "@/app/_lib/getWasUrl";

export type Post = {
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  title: string;
  author: {
    nickname: string;
    mail: string;
    avatar: string | null;
  };
  tags: { id: number; name: string }[];
};

export default function List() {
  const router = useRouter();

  const { data, isPending } = useQuery({
    queryKey: ["/api/twosday/post"],
    queryFn: async () => {
      const response = await fetch(`${getWasUrl()}/api/twosday/post`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data.posts as Post[];
    },
  });

  if (isPending) return <div className={wrap}>로딩중...</div>;

  if (!data) return <div className={wrap}>데이터가 없습니다.</div>;

  return (
    <div className={wrap}>
      <div className={header}>
        <div className={headerCell}>타이틀</div>
        <div className={headerCell}>작성자</div>
        <div className={headerCell}>생성일</div>
        <div className={headerCell}>수정일</div>
        <div className={headerCell}>태그</div>
      </div>
      {data.map((rowData) => (
        <div
          key={rowData.id}
          className={row}
          onClick={() => {
            router.push(`/post/${rowData.id}`);
          }}
        >
          <div className={cell}>{rowData.title}</div>
          <div className={cell}>{rowData.author.nickname}</div>
          <div className={cell}>{rowData.createdAt}</div>
          <div className={cell}>{rowData.updatedAt}</div>
          <div className={cell}>{rowData.tags.map((tag) => tag.name).join(", ")}</div>
        </div>
      ))}
    </div>
  );
}
