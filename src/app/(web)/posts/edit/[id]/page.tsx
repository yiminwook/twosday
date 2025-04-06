"use client";
import { clientApi } from "@/apis/fetcher";
import { AwaitAuthorized } from "@/libraries/auth/Authorized";
import { useSession } from "@/libraries/auth/useSession";
import { TPublicPost } from "@/libraries/pg/posts/posts.type";
import { useSuspenseQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Suspense } from "react";

const PatchHome = dynamic(() => import("@/components/editor/PatchHome"), { ssr: false });

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

  const query = useSuspenseQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const json = await clientApi
        .get<{
          message: string;
          data: TPublicPost;
        }>("posts/" + postId)
        .json();
      return json.data;
    },
  });

  if (query.data.authorId === session.id) {
    throw new Error("접근 권한이 없습니다.");
  }

  return (
    <PatchHome
      session={session}
      initialValue={query.data.content}
      initialTitle={query.data.title}
      initialTags={query.data.tags.map((t) => t.name)}
    />
  );
}
