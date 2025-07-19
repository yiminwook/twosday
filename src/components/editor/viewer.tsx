"use client";
import { useEditor } from "@tiptap/react";
import { RichTextEditor } from "@mantine/tiptap";
import { extensions } from "@/libraries/extentions";
import { useEffect, useState } from "react";

interface ViewerProps {
  content: string;
}

export default function Viewer({ content }: ViewerProps) {
  const [show, setShow] = useState(false);
  const editRef = useEditor({
    content,
    extensions,
    editable: false,
    immediatelyRender: false,
  });

  useEffect(() => {
    setShow(true);
  }, [show]);

  if (!show) return null;

  return (
    <RichTextEditor editor={editRef}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
