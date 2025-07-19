"use client";
import { useSession } from "@/libraries/auth/use-session";
import dayjs from "@/libraries/dayjs";
import css from "./post-info.module.scss";
import Link from "next/link";
import { Button } from "@mantine/core";

type Props = {
  postId: string;
  title: string;
  authorId: number;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export default function PostInfo({
  postId,
  title,
  authorId,
  viewCount,
  createdAt,
  updatedAt,
}: Props) {
  const { data: session } = useSession();

  return (
    <div className={css.header}>
      <h2 className={css.title}>{title}</h2>
      <div className={css.info}>
        <div className={css.author}>
          <p>
            <span>작성자: </span>
            <span>{authorId}</span>
          </p>

          <p>
            <span>조회수: </span>
            <span>{viewCount}</span>
          </p>
        </div>

        <div>
          {session && (
            <div style={{ textAlign: "right" }}>
              <Button component={Link} href={`/posts/edit/${postId}`} variant="outline" size="sm">
                수정
              </Button>
            </div>
          )}
          <p>
            <span>작성일: </span>
            <time>{dayjs(createdAt).format("YYYY년 MM월 DD일")}</time>
          </p>

          <p>
            <span>수정일: </span>
            <time>{dayjs(updatedAt).format("YYYY년 MM월 DD일")}</time>
          </p>
        </div>
      </div>
    </div>
  );
}
