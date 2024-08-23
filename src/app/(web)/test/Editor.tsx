import Youtube from "@tiptap/extension-youtube";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import ImageResize from "tiptap-extension-resize-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import Control from "./Control";
import * as css from "./editor.css";
import classNames from "classnames";

// .extend({
//   addNodeView() {
//     return ReactNodeViewRenderer(CodeBlock);
//   },
// })

const lowlight = createLowlight(common);

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // codeBlock: false,
        code: false,
      }),
      Youtube,
      Image,
      ImageResize,
      CodeBlockLowlight.configure({ lowlight }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    immediatelyRender: false, // Prevents the editor from rendering immediately
    content: `
      <p>Hello! This is a <code>tiptap</code> editor.</p>
      `,
  });

  useEffect(() => {
    if (!editor) return;
    editor.on("transaction", (e) => {
      console.log("transaction", editor.getHTML());
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
