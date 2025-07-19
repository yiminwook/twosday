"use client";
import { Authorized } from "@/libraries/auth/authorized";
import dynamic from "next/dynamic";

const PostHome = dynamic(() => import("@/components/editor/post-home"), { ssr: false });

export default function Page() {
  return (
    <Authorized>
      <PostHome />
    </Authorized>
  );
}
