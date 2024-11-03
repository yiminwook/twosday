import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { Extensions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { common, createLowlight } from "lowlight";
import ImageResize from "tiptap-extension-resize-image";
import { v1 as uuid } from "uuid";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";

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
  Underline,
  Superscript,
  SubScript,
  Highlight,
  Image,
  ImageResize,
  CodeBlockLowlight.configure({ lowlight }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Youtube,
  Link.configure({
    openOnClick: false, //편집기중은 비활성화
    autolink: true,
    linkOnPaste: false,
    validate: (href) => /^https?:\/\//.test(href),
    HTMLAttributes: { target: "_blank" },
  }),
];
