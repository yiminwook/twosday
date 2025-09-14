"use client";
import NoSSR from "@/components/common/NoSSR";
import { Authorized } from "@/libraries/auth/authorized";
import { useSuspenseSession } from "@/libraries/auth/use-session";
import css from "./page.module.scss";
import { useSuspenseQuery } from "@tanstack/react-query";
import { clientApi } from "@/apis/fetcher";
import { Suspense } from "react";
import { TGetPostsResponse } from "@/libraries/pg/posts/posts.type";
import dayjs from "@/libraries/dayjs";
import Link from "next/link";

export default function Page() {
  return (
    <NoSSR>
      <Authorized>
        <div className={css.wrap}>
          <h1 className={css.title}>나의 포스트</h1>
          <Suspense fallback={<div>fetching client side</div>}>
            <AuthorPosts />
          </Suspense>
        </div>
      </Authorized>
    </NoSSR>
  );
}

function AuthorPosts() {
  const { data: session } = useSuspenseSession();

  const { data: posts } = useSuspenseQuery({
    queryKey: ["author-posts", session],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("order", "popular");
      params.set("size", "10");
      params.set("page", "1");

      const response = await clientApi
        .get<TGetPostsResponse>(`posts/author?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${session!.accessToken}`,
          },
        })
        .json();

      return response.data;
    },
  });

  return (
    <div className={css.postListBox}>
      <div className={css.navBox}>
        <div>전체 포스트: {posts.total}</div>
        <div>
          <button>최신순</button>
          <button>인기순</button>
        </div>
      </div>

      <div className={css.postList}>
        {posts.list.map((post) => (
          <div key={post.postId} className={css.post}>
            <div className={css.postHeader}>
              <div className={css.postHeaderLeft}>
                <img className={css.postAvatar} src={post.avatar ?? ""} alt={post.nickname} />
                <div>{post.nickname}</div>
              </div>

              <div className={css.postHeaderRight}>
                <div>{post.category?.name}</div>
                <div>{dayjs(post.createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>
                <div>{dayjs(post.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</div>
                <div>{post.isPublic}</div>
              </div>
            </div>

            <div>
              <Link href={`/my/posts/${post.postId}`}>
                <div className={css.postTitle}>{post.title}</div>
              </Link>
              <div>{post.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
