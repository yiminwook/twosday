/* eslint-disable @next/next/no-img-element */
"use client";
import css from "./PostList.module.scss";
import { useRouter } from "next/navigation";
import PagePagination from "@/components/common/pagination/PagePagination";
import { TPublicPost } from "@/libraries/pg/posts/posts.type";
import dayjs from "@/libraries/dayjs";

interface ListProps {
  posts: TPublicPost[];
  currentPage: number;
  total: number;
  size: number;
  order?: "popular";
}

export default function List({ posts, currentPage, total, size, order }: ListProps) {
  const router = useRouter();

  return (
    <div className={css.wrap}>
      <div className={css.col}>
        {posts.map((post) => (
          <div
            key={post.postId}
            className={css.row}
            onClick={() => {
              router.push(`/posts/${post.postId}`);
            }}
          >
            <div className={css.thumbnailBox}>
              <img className={css.thumbnail} src={""} alt={`${post.title}`} />
            </div>
            <div>
              <div className={css.title}>{post.title}</div>
              <div className={css.nickname}>{post.nickname}</div>
              <div className={css.createdAt}>
                {dayjs(post.createdAt).format("YYYY년 MM월 DD일")}
              </div>
              <div className={css.updatedAt}>
                {dayjs(post.updatedAt).format("YYYY년 MM월 DD일")}
              </div>
              {/* <div className={css.cell}>{rowData.map((tag) => tag.name).join(", ")}</div> */}
            </div>
          </div>
        ))}
      </div>
      <div className={css.paginationBox}>
        <PagePagination
          currentPage={currentPage}
          totalCnt={total}
          onChange={(page) => router.push(`/posts?order=${order}&page=${page}`)}
          pgSize={size}
        />
      </div>
    </div>
  );
}
