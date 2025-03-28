"use client";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
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
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

// .extend({
//   addNodeView() {
//     return ReactNodeViewRenderer(CodeBlock);
//   },
// })

export const extensions: Extensions = [
  StarterKit.configure({
    codeBlock: false,
    // code: false,
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
  ImageResize,
  CodeBlockLowlight.configure({ lowlight: createLowlight(common) }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Youtube,
  Link.configure({
    // openOnClick: false, //편집기중은 비활성화
    autolink: true,
    linkOnPaste: false,
    validate: (href) => /^https?:\/\//.test(href),
    HTMLAttributes: { target: "_blank" },
  }),
  TextStyle, // 컬러변경을 위해 필요
  Color,
];
