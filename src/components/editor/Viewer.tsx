"use client";
import { useEditor } from "@tiptap/react";
import { RichTextEditor } from "@mantine/tiptap";
import { extensions } from "@/libraries/extentions";

interface ViewerProps {
  content: string;
}

export default function Viewer({ content }: ViewerProps) {
  const editRef = useEditor({
    content,
    extensions,
    editable: false,
    immediatelyRender: false,
  });

  return (
    <RichTextEditor editor={editRef}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
