import { RefObject } from "react";
import ReactQuill from "react-quill";

export const imageHandler = async (ref: RefObject<ReactQuill>, cb?: (error: Error) => void) => {
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

      const url =
        process.env.NEXT_PUBLIC_WAS_PROTOCOL +
        "://" +
        process.env.NEXT_PUBLIC_WAS_HOST +
        "/api/image/sign";

      console.log("url", url);
      const wasRes = await fetch(url, {
        method: "POST",
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoiZ3JzMDQxM0BnbWFpbC5jb20iLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNzE5OTI0NDEzLCJleHAiOjE3MTk5MjgwMTN9.HQXqPpJNik0j0lQXsOcxXXJ6iPyDJ1OIwKdUt_qINf8",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName: file.name, projectName: "twosday" }),
        cache: "no-cache",
      });

      if (!wasRes.ok) throw new Error("업로드중 오류가 발생했습니다.");

      const body: { url: string } = await wasRes.json();

      const awsRes = await fetch(body.url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!awsRes.ok) throw new Error("업로드중 오류가 발생했습니다.");

      const pathname = new URL(body.url).pathname;

      editor.insertEmbed(
        range.index,
        "image",
        process.env.NEXT_PUBLIC_AWS_CLOUD_FRONT_URL + pathname,
      ); //이미지 삽입

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
