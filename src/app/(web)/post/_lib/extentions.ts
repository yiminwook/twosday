import { Extensions } from "@tiptap/react";
import { common, createLowlight } from "lowlight";
import Youtube from "@tiptap/extension-youtube";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import ImageResize from "tiptap-extension-resize-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import StarterKit from "@tiptap/starter-kit";

// .extend({
//   addNodeView() {
//     return ReactNodeViewRenderer(CodeBlock);
//   },
// })

const lowlight = createLowlight(common);

export const extensions: Extensions = [
  StarterKit.configure({
    // codeBlock: false,
    code: false,
  }),
  Youtube,
  Image,
  ImageResize,
  CodeBlockLowlight.configure({ lowlight }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
];
