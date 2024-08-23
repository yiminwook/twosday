"use client";
import { useSetModalStore } from "@/app/_lib/modalStore";
import "@/style/cropper.css";
import "@/style/highlight.css";
import EditorPlaceholder from "@web/post/edit/_component/EditorPlaceholder";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/app/(web)/test/Editor"), {
  ssr: false,
  loading: () => <EditorPlaceholder />,
});

export default function Page() {
  const modalStore = useSetModalStore();

  return (
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: 10,
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Editor />
    </div>
  );
}
