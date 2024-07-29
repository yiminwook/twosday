import Removable from "@web/_component/tagInput/Removable";
import EditorPlaceholder from "./EditorPlaceholder";
import dynamic from "next/dynamic";
import * as css from "./form.css";
import ReactQuill from "react-quill";
import { RefObject } from "react";

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
  loading: () => <EditorPlaceholder />,
});

interface FormProps {
  title: string;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openTagsModal: () => void;
  tags: string[];
  value: string;
  onChange: (value: string) => void;
  quillRef: RefObject<ReactQuill>;
  session: Session;
}

export default function Form({
  title,
  value,
  onChangeTitle,
  onChange,
  openTagsModal,
  tags,
  quillRef,
  session,
}: FormProps) {
  return (
    <form className={css.form}>
      <div className={css.inputBox}>
        <input
          className={css.input}
          type="text"
          value={title}
          onChange={onChangeTitle}
          placeholder="제목을 입력해주세요"
        />
      </div>
      <div className={css.tagsInput} onClick={openTagsModal}>
        {tags.map((tag, index) => (
          <Removable key={`saved_${tag}`} name={tag} index={index} />
        ))}
        {tags.length === 0 && <span>태그를 추가해주세요</span>}
      </div>
      <Editor value={value} onChange={onChange} editorRef={quillRef} session={session} />
    </form>
  );
}
