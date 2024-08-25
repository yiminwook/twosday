import { Editor as EditorType, EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import Control from "./Control";
import * as css from "./editor.css";
import classNames from "classnames";

interface EditorProps {
  editor: EditorType | null;
}

export default function Editor({ editor }: EditorProps) {
  useEffect(() => {
    if (!editor) return;
    editor.on("transaction", (e) => {
      console.log("transaction");
    });
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={classNames(css.lightTheme, css.editor)}>
      <Control editor={editor} />
      <EditorContent className={css.body} editor={editor} />
    </div>
  );
}
