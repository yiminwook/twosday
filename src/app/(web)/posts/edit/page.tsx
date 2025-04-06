"use client";
import { Authorized } from "@/libraries/auth/Authorized";
import dynamic from "next/dynamic";

const PostHome = dynamic(() => import("@/components/editor/PostHome"), { ssr: false });

export default function Page() {
  return (
    <Authorized>
      <PostHome />
    </Authorized>
  );
}
