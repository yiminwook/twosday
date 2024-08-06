/* eslint-disable @next/next/no-img-element */
"use client";
import { useQuery } from "@tanstack/react-query";
import * as css from "./list.css";
import { useRouter } from "next/navigation";
import { getWasUrl } from "@/app/_lib/getWasUrl";

export type Post = {
  id: number;
  updatedAt: string;
  createdAt: string;
  title: string;
  thumbnail: string | null;
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

      const body: { data: { posts: Post[] }; message: string[] } = await response.json();

      if (!response.ok) {
        throw new Error(body.message[0]);
      }

      return body.data.posts as Post[];
    },
  });

  if (isPending) return <div className={css.wrap}>로딩중...</div>;

  if (!data) return <div className={css.wrap}>데이터가 없습니다.</div>;

  return (
    <div className={css.wrap}>
      <div className={css.header}>
        <div className={css.headerCell}>썸네일</div>
        <div className={css.headerCell}>타이틀</div>
        <div className={css.headerCell}>작성자</div>
        <div className={css.headerCell}>생성일</div>
        <div className={css.headerCell}>수정일</div>
        <div className={css.headerCell}>태그</div>
      </div>
      {data.map((rowData) => (
        <div
          key={rowData.id}
          className={css.row}
          onClick={() => {
            router.push(`/post/${rowData.id}`);
          }}
        >
          <div className={css.thumbnailBox}>
            <img className={css.thumbnail} src={rowData.thumbnail || ""} alt={`${rowData.title}`} />
          </div>
          <div className={css.cell}>{rowData.title}</div>
          <div className={css.cell}>{rowData.author.nickname}</div>
          <div className={css.cell}>{rowData.createdAt}</div>
          <div className={css.cell}>{rowData.updatedAt}</div>
          <div className={css.cell}>{rowData.tags.map((tag) => tag.name).join(", ")}</div>
        </div>
      ))}
    </div>
  );
}
