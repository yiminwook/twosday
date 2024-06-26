import { WAS_URL } from "@/app/_const/url";
import { RefObject } from "react";
import ReactQuill from "react-quill";

export const imageHandler = async (ref: RefObject<ReactQuill>) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/jpg, image/png"); //image/*
  input.click();
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;

    const editor = ref.current?.getEditor();
    const range = editor?.getSelection(); //커서 위치
    if (!editor || !range) return;

    // TODO: API
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(WAS_URL + "/api/aws/upload", {
      method: "POST",
      cache: "no-cache",
      body: formData,
    });

    const body: { path: string } = await res.json();

    editor.insertEmbed(range.index, "image", "/img/" + body.path); //이미지 삽입
    editor.setSelection({
      //커서 이동
      index: range.index + 1,
      length: range.length + 1,
    });
  };
};
