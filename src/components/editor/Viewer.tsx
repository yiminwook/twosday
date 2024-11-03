"use client";
import parse from "html-react-parser";
import hljs from "highlight.js";
import { useEffect } from "react";
import * as css from "@/components/editor/editor.css";
import classNames from "classnames";

interface ViewerProps {
  content: string;
}

export default function Viewer({ content }: ViewerProps) {
  useEffect(() => {
    hljs.highlightAll();
  }, [content]);

  return <div className={classNames(css.lightTheme, css.editor)}>{parse(content)}</div>;
}
