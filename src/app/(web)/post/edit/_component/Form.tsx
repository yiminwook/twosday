import Removable from "@web/_component/tagInput/Removable";
import EditorPlaceholder from "../../_component/EditorPlaceholder";
import dynamic from "next/dynamic";
import * as css from "./form.css";
import { Editor as EditorType } from "@tiptap/react";
import Select from "react-select";

const Editor = dynamic(() => import("../../_component/Editor"), {
  ssr: false,
  loading: () => <EditorPlaceholder />,
});

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

interface FormProps {
  title: string;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openTagsModal: () => void;
  tags: string[];
  value: string;
  onChange: (value: string) => void;
  editor: EditorType | null;
  session: Session;
}

export default function Form({
  title,
  value,
  onChangeTitle,
  onChange,
  openTagsModal,
  tags,
  editor,
  session,
}: FormProps) {
  const colourOptions: readonly ColourOption[] = [
    { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
    { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
    { value: "purple", label: "Purple", color: "#5243AA" },
    { value: "red", label: "Red", color: "#FF5630", isFixed: true },
    { value: "orange", label: "Orange", color: "#FF8B00" },
    { value: "yellow", label: "Yellow", color: "#FFC400" },
    { value: "green", label: "Green", color: "#36B37E" },
    { value: "forest", label: "Forest", color: "#00875A" },
    { value: "slate", label: "Slate", color: "#253858" },
    { value: "silver", label: "Silver", color: "#666666" },
  ];

  return (
    <form className={css.form}>
      <div className={css.inputBox}>
        <input
          className={css.input}
          type="text"
          value={title}
          onChange={onChangeTitle}
          placeholder="제목을 입력해주세요"
          id="upload-title"
        />
      </div>
      <Select
        defaultValue={[colourOptions[2], colourOptions[3]]}
        isMulti
        options={colourOptions}
        styles={{
          container: (styles) => ({ ...styles, marginBottom: 10, position: "relative", zIndex: 2 }),
          control: (styles) => ({
            ...styles,
            boxShadow: "none",
            borderColor: "#cdcdcd",
            height: "100%",
            borderRadius: 0,
            ":hover": {
              borderColor: "#cdcdcd", // hover시 border 안바뀌게
              boxShadow: "none",
            },
          }),
          menuList: (styles) => ({ ...styles, "::-webkit-scrollbar": { width: 3 } }),
        }}
        onChange={(selected) => console.log(selected)}
        onInputChange={(inputValue) => console.log(inputValue)}
      />
      <Editor editor={editor} />
    </form>
  );
}
