"use client";
import parse from "html-react-parser";
import hljs from "highlight.js";
import { useEffect, useRef } from "react";
import * as css from "@/components/editor/editor.css";
import classNames from "classnames";

interface ViewerProps {
  content: string;
}

export default function Viewer({ content }: ViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewerRef.current) {
      hljs.highlightElement(viewerRef.current);
    }
  }, [content]);

  return (
    <div ref={viewerRef} className={classNames(css.lightTheme, css.editor)}>
      {parse(content)}
    </div>
  );
}
