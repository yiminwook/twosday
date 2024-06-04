import { RefObject } from "react";
import ReactQuill from "react-quill";

export const imageHandler = (ref: RefObject<ReactQuill>) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  input.onchange = async () => {
    const file = input.files ? input.files[0] : null;
    if (!file) return;
    const name = file.name;
    const url = URL.createObjectURL(file);

    const editor = ref.current?.getEditor();
    const range = editor?.getSelection() ?? false;
    if (!range) return;

    // TODO: API
    console.log("imageHandler", name);

    URL.revokeObjectURL(url); // 메모리 누수 방지
    editor?.insertEmbed(range.index, "image", "API PATH");
    editor?.setSelection({
      index: range.index + 1,
      length: range.length + 1,
    });
  };
};
