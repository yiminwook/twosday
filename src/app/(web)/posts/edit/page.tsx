"use client";
import { AwaitAuthorized } from "@/libraries/auth/Authorized";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const PostHome = dynamic(() => import("@/components/editor/PostHome"), { ssr: false });

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AwaitAuthorized>
        <PostHome />
      </AwaitAuthorized>
    </Suspense>
  );
}
