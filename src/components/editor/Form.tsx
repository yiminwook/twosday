import { Editor as EditorType } from "@tiptap/react";
import { ComboboxData, ComboboxItem, Input, Space, Stack, TagsInput } from "@mantine/core";
import Editor from "./Editor";

// const Editor = dynamic(() => import("@/components/editor/Editor"), {
//   ssr: false,
//   loading: () => <EditorPlaceholder />,
// });

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
  tags,
  editor,
  session,
}: FormProps) {
  const colourOptions: ComboboxData = [
    { value: "ocean", label: "Ocean" },
    { value: "blue", label: "Blue" },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" },
    { value: "yellow", label: "Yellow" },
    { value: "green", label: "Green" },
    { value: "forest", label: "Forest" },
    { value: "slate", label: "Slate" },
    { value: "silver", label: "Silver" },
  ];

  return (
    <Stack gap="md" component="form">
      <Input
        size="md"
        type="text"
        placeholder="제목을 입력해주세요"
        id="upload-tag"
        onChange={onChangeTitle}
        value={title}
      />
      <TagsInput
        size="md"
        onChange={(e) => console.log(e)}
        data={colourOptions}
        splitChars={[",", " ", "|"]}
        acceptValueOnBlur
        clearable
        filter={({ options, search }) => {
          const filtered = (options as ComboboxItem[]).filter((option) =>
            option.label.toLowerCase().trim().includes(search.toLowerCase().trim()),
          );
          // 알파벳 순서로 정렬
          filtered.sort((a, b) => a.label.localeCompare(b.label));
          return filtered;
        }}
      />
      <Editor editor={editor} />
    </Stack>
  );
}
