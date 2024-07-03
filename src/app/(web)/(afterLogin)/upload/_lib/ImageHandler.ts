import { Session } from "@/app/_lib/getServerSession";
import { RefObject } from "react";
import ReactQuill from "react-quill";

export const imageHandler = async (
  ref: RefObject<ReactQuill>,
  session: Session,
  cb?: (error: Error) => void,
) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/jpg, image/png"); //image/*
  input.click();
  input.onchange = async () => {
    try {
      const file = input.files?.[0];
      if (!file) return;

      const editor = ref.current?.getEditor();
      const range = editor?.getSelection(); //커서 위치
      if (!editor || !range) return;

      // TODO: API
      // const formData = new FormData();
      // formData.append("image", file);

      // const res = await fetch("/was/aws/upload", {
      //   method: "POST",
      //   cache: "no-cache",
      //   body: formData,
      // });

      const wasRes = await fetch("/was/image/sign", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName: file.name, projectName: "twosday" }),
        cache: "no-cache",
      });

      if (!wasRes.ok) throw new Error("업로드중 오류가 발생했습니다.");

      const body: { url: string } = await wasRes.json();

      const awsRes = await fetch(body.url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!awsRes.ok) throw new Error("업로드중 오류가 발생했습니다.");

      const pathname = new URL(body.url).pathname;

      editor.insertEmbed(range.index, "image", "/img" + pathname); //이미지 삽입

      editor.setSelection({
        //커서 이동
        index: range.index + 1,
        length: range.length + 1,
      });
    } catch (error) {
      if (error instanceof Error) {
        cb?.(error);
      }
    } finally {
      input.remove();
    }
  };
};
