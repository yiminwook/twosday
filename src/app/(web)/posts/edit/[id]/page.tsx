"use client";
import NoSSR from "@/components/common/NoSSR";
import { useAuthorPostSuspenseQuery } from "@/hooks/use-post";
import { AwaitAuthorized } from "@/libraries/auth/authorized";
import { useSuspenseSession } from "@/libraries/auth/use-session";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Suspense } from "react";

const PatchHome = dynamic(() => import("@/components/editor/patch-home"), { ssr: false });

export default function Page() {
  return (
    <NoSSR>
      <Suspense fallback={<div>Loading...</div>}>
        <AwaitAuthorized>
          <InjectedDataHome />
        </AwaitAuthorized>
      </Suspense>
    </NoSSR>
  );
}

function InjectedDataHome() {
  const { id: postId } = useParams<{ id: string }>();
  const { data: session } = useSuspenseSession();

  if (!session) throw new Error("Session Not Provided!");
  if (Number.isNaN(Number(postId))) throw new Error("Invalid Post ID!");

  // 수정할때는 클라이언트 사이드에서 데이터를 가져온다.
  const query = useAuthorPostSuspenseQuery({ session, postId: Number(postId) });

  if (query.data.authorId !== session.id) {
    throw new Error("접근 권한이 없습니다.");
  }

  return (
    <PatchHome
      session={session}
      postId={Number(postId)}
      initialValue={query.data.content}
      initialTitle={query.data.title}
      initialTags={query.data.tags.map((t) => t.name)}
    />
  );
}
