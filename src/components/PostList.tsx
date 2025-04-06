/* eslint-disable @next/next/no-img-element */
"use client";
import css from "./PostList.module.scss";
import { useRouter } from "next/navigation";
import { TPublicPost } from "@/libraries/pg/posts/posts.type";
import dayjs from "@/libraries/dayjs";
import { Pagination } from "@mantine/core";
import Image from "next/image";
import PlaceholderImage from "@/assets/images/neon-512x512.png";

interface Props {
  posts: TPublicPost[];
  currentPage: number;
  total: number;
  order?: "popular";
}

export default function PostList({ posts, currentPage, total, order }: Props) {
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
              <Image
                width={120}
                height={80}
                className={css.image}
                src={PlaceholderImage}
                alt="placeholder_image"
              />
              {/* <img className={css.thumbnail} src={""} alt={`${post.title}`} /> */}
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
        <Pagination
          value={currentPage}
          total={total}
          size="sm"
          onChange={(page) => router.push(`/posts?order=${order}&page=${page}`)}
        />
      </div>
    </div>
  );
}
