import { useEffect } from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { Editor as TEditor } from "@tiptap/react";
import Control from "./Control";

interface EditorProps {
  editor: TEditor | null;
  editable: boolean;
  session: Session;
}

export default function Editor({ editor, editable, session }: EditorProps) {
  useEffect(() => {
    if (!editor) return;
    editor.on("transaction", (e) => {
      console.log("transaction");
    });
  }, [editor]);

  if (!editor) {
    // 에디터가 초기화되지 않았을 때, null 반환
    return null;
  }

  return (
    <RichTextEditor editor={editor} variant="subtle">
      {editable && <Control editor={editor} session={session} />}
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
