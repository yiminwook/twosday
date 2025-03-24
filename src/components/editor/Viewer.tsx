"use client";
import { useEditor } from "@tiptap/react";
import { RichTextEditor } from "@mantine/tiptap";
import StarterKit from "@tiptap/starter-kit";

interface ViewerProps {
  content: string;
}

export default function Viewer({ content }: ViewerProps) {
  const editRef = useEditor({
    content,
    extensions: [StarterKit],
    editable: false,
    immediatelyRender: false,
  });

  return (
    <RichTextEditor editor={editRef}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
