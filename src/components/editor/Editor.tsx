import { useEffect } from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { Editor as TEditor } from "@tiptap/react";
import Control from "./Control";

interface EditorProps {
  editor: TEditor;
  editable: boolean;
  session: Session;
}

export default function Editor({ editor, editable, session }: EditorProps) {
  return (
    <RichTextEditor editor={editor} variant="subtle">
      {editable && <Control editor={editor} session={session} />}
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
