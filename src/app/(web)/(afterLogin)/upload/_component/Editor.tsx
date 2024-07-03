/** @ts-ignore */
import ImageResize from "quill-image-resize";
import { useSetModalStore } from "@/app/_lib/modalStore";
import hljs from "highlight.js";
import { RefObject, useMemo } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import { imageHandler } from "../_lib/ImageHandler";
import ErrorModal from "@/app/_component/modal/ErrorModal";
import { Session } from "@/app/_lib/getServerSession";

const Font = ReactQuill.Quill.import("formats/font");
const Bold = ReactQuill.Quill.import("formats/bold");
const AlignClass = ReactQuill.Quill.import("attributors/style/align");

hljs.configure({
  languages: ["javascript", "ruby", "python", "java", "cpp", "kotlin", "sql"],
});

Bold.tagName = "B";
Font.whitelist = ["", "arial", "comic-sans"];

ReactQuill.Quill.register(Font, true);
ReactQuill.Quill.register(Bold, true);
ReactQuill.Quill.register(AlignClass, true);
ReactQuill.Quill.register("modules/imageResize", ImageResize);

interface EditorProps {
  session: Session;
  value: string;
  onChange: ReactQuillProps["onChange"];
  editorRef: RefObject<ReactQuill>;
}

export default function Editor({ session, onChange, value, editorRef }: EditorProps) {
  const modalStore = useSetModalStore();
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: Font.whitelist }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ align: null }, { align: "center" }, { align: "right" }, { align: "justify" }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["link", "image", "code-block"],
          ["clean"],
        ],
        handlers: {
          image: () => {
            imageHandler(editorRef, session, (error) => {
              modalStore.push(ErrorModal, { props: { error } });
            });
          },
        },
      },
      imageResize: {},
      syntax: {
        highlight: (text: string) => hljs.highlightAuto(text).value,
      },
    }),
    [editorRef, modalStore],
  );

  return (
    <ReactQuill
      ref={editorRef}
      modules={modules}
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder="내용을 입력하세요."
    />
  );
}
