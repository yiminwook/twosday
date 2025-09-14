"use client";
import NoSSR from "@/components/common/NoSSR";
import { AwaitAuthorized } from "@/libraries/auth/authorized";
import { useSuspenseSession } from "@/libraries/auth/use-session";
import { Suspense } from "react";
import PostHome from "@/components/post/post-home";
import { useParams } from "next/navigation";
import { useAuthorPostSuspenseQuery } from "@/hooks/use-post";

export default function Page() {
  return (
    <NoSSR>
      <Suspense fallback={<div>fetching client side</div>}>
        <AwaitAuthorized>
          <AuthorPost />
        </AwaitAuthorized>
      </Suspense>
    </NoSSR>
  );
}

function AuthorPost() {
  const { id: postId } = useParams<{ id: string }>();
  const { data: session } = useSuspenseSession();

  if (!session) throw new Error("Session Not Provided!");
  if (Number.isNaN(Number(postId))) throw new Error("Invalid Post ID!");

  const query = useAuthorPostSuspenseQuery({ session, postId: Number(postId) });

  if (query.data.authorId !== session.id) {
    throw new Error("접근 권한이 없습니다.");
  }

  return <PostHome post={query.data} />;
}
