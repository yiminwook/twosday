"use client";
import NoSSR from "@/components/common/NoSSR";
import { Authorized } from "@/libraries/auth/authorized";
import { useSuspenseSession } from "@/libraries/auth/use-session";
import { useSuspenseQuery } from "@tanstack/react-query";
import { clientApi } from "@/apis/fetcher";
import { Suspense } from "react";
import { TGetPostResponse } from "@/libraries/pg/posts/posts.type";
import PostHome from "@/components/post/post-home";
import { useParams } from "next/navigation";

export default function Page() {
  return (
    <NoSSR>
      <Authorized>
        <Suspense fallback={<div>fetching client side</div>}>
          <AuthorPost />
        </Suspense>
      </Authorized>
    </NoSSR>
  );
}

function AuthorPost() {
  const { id: postId } = useParams<{ id: string }>();
  const { data: session } = useSuspenseSession();

  const { data: post } = useSuspenseQuery({
    queryKey: ["author-post", postId, session],
    queryFn: async () => {
      const response = await clientApi
        .get<TGetPostResponse>(`posts/${postId}/author`, {
          headers: {
            Authorization: `Bearer ${session!.accessToken}`,
          },
        })
        .json();

      return response.data;
    },
  });

  return <PostHome post={post} />;
}
