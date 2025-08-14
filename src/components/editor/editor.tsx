import { useEffect } from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { Editor as TEditor } from "@tiptap/react";
import Control from "./control";

interface EditorProps {
  editor: TEditor;
  editable: boolean;
  session: Session;
}

export default function Editor({ editor, editable, session }: EditorProps) {
  useEffect(() => {
    if (!editor) return;
    editor.setEditable(editable); // 토글 시 편집 가능/불가만 전환
  }, [editor, editable]);

  return (
    <RichTextEditor editor={editor} variant="subtle">
      {editable && <Control editor={editor} session={session} />}
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
