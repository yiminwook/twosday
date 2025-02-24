/* eslint-disable @next/next/no-img-element */
"use client";
import * as css from "./list.css";
import { useRouter } from "next/navigation";
import PagePagination from "@/components/common/pagination/PagePagination";
import { TPost } from "@/libraries/pg/posts/posts.dto";

interface ListProps {
  post: TPost[];
  currentPage: number;
  total: number;
  size: number;
  order?: "popular";
}

export default function List({ post, currentPage, total, size }: ListProps) {
  const router = useRouter();

  return (
    <>
      <div className={css.wrap}>
        <div className={css.header}>
          <div className={css.headerCell}>썸네일</div>
          <div className={css.headerCell}>타이틀</div>
          <div className={css.headerCell}>작성자</div>
          <div className={css.headerCell}>생성일</div>
          <div className={css.headerCell}>수정일</div>
          <div className={css.headerCell}>태그</div>
        </div>
        {post.map((rowData) => (
          <div
            key={rowData.id}
            className={css.row}
            onClick={() => {
              router.push(`/posts/${rowData.id}`);
            }}
          >
            <div className={css.thumbnailBox}>
              <img
                className={css.thumbnail}
                src={rowData.thumbnail || ""}
                alt={`${rowData.title}`}
              />
            </div>
            <div className={css.cell}>{rowData.title}</div>
            <div className={css.cell}>{rowData.author.nickname}</div>
            <div className={css.cell}>{rowData.createdAt}</div>
            <div className={css.cell}>{rowData.updatedAt}</div>
            <div className={css.cell}>{rowData.tags.map((tag) => tag.name).join(", ")}</div>
          </div>
        ))}
      </div>
      <PagePagination
        currentPage={currentPage}
        totalCnt={total}
        onChange={(page) => router.push(`/posts?order=popular&page=${page}`)}
        pgSize={size}
      />
    </>
  );
}
