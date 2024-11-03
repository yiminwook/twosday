import { Extensions } from "@tiptap/react";
import { common, createLowlight } from "lowlight";
import Youtube from "@tiptap/extension-youtube";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import ImageResize from "tiptap-extension-resize-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import StarterKit from "@tiptap/starter-kit";
import { v1 as uuid } from "uuid";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

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
    heading: {
      HTMLAttributes: {
        id: uuid(),
      },
    },
  }),
  Youtube,
  Image,
  ImageResize,
  Underline,
  CodeBlockLowlight.configure({ lowlight }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Link.configure({
    openOnClick: false, //편집기중은 비활성화
    autolink: true,
    linkOnPaste: false,
    validate: (href) => /^https?:\/\//.test(href),
    HTMLAttributes: { target: "_blank" },
  }),
];
