"use client";
import { clientApi } from "@/apis/fetcher";
import { AwaitAuthorized } from "@/libraries/auth/authorized";
import { useSession } from "@/libraries/auth/use-session";
import { TPost } from "@/libraries/pg/posts/posts.type";
import { useSuspenseQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const PatchHome = dynamic(() => import("@/components/editor/patch-home"), { ssr: false });

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AwaitAuthorized>
        <InjectedDataHome />
      </AwaitAuthorized>
    </Suspense>
  );
}

function InjectedDataHome() {
  const session = useSession().data!;
  const params = useParams<{ id: string }>();
  const postId = params.id;
  const [mounted, setMounted] = useState(false);

  // 수정할때는 클라이언트 사이드에서 데이터를 가져온다.
  const query = useSuspenseQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const json = await clientApi
        .get<{
          message: string;
          data: TPost;
        }>("posts/" + postId)
        .json();
      return json.data;
    },
  });

  useEffect(() => {
    if (mounted) return;
    setMounted(() => true);
  }, [mounted]);

  if (query.data.authorId !== session.id) {
    throw new Error("접근 권한이 없습니다.");
  }

  if (!mounted) return null;

  return (
    <PatchHome
      session={session}
      postId={postId}
      initialValue={query.data.content}
      initialTitle={query.data.title}
      initialTags={query.data.tags.map((t) => t.name)}
    />
  );
}
