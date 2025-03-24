import { Editor as EditorType } from "@tiptap/react";
import {
  ActionIcon,
  Button,
  ComboboxData,
  ComboboxItem,
  ComboboxLikeRenderOptionInput,
  Group,
  Input,
  Space,
  Stack,
  TagsInput,
  TagsInputProps,
  Text,
} from "@mantine/core";
import Editor from "./Editor";
import { TTag } from "@/types";
import { useCallback, useMemo } from "react";
import css from "./Edit.module.scss";
import { X } from "lucide-react";

// const Editor = dynamic(() => import("@/components/editor/Editor"), {
//   ssr: false,
//   loading: () => <EditorPlaceholder />,
// });

interface FormProps {
  title: string;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tags: TTag[];
  selectedTags: string[];
  onChangeSelect: (value: string[]) => void;
  isLoadingTags: boolean;
  removeTag: (tagId: number) => void;
  editor: EditorType | null;
  session: Session;
}

export default function Form({
  title,
  onChangeTitle,
  onChangeSelect,
  removeTag,
  tags,
  selectedTags,
  editor,
  session,
}: FormProps) {
  const comboboxTags = useMemo<ComboboxData>(() => {
    return tags.map((tag) => ({
      value: tag.id.toString(),
      label: tag.name,
    }));
  }, [tags]);

  const renderTagsInputOption = useCallback(
    (
      input: ComboboxLikeRenderOptionInput<{
        value: string;
        label: string;
      }>,
    ) => (
      <div className={css.tagsInputItem}>
        <span>{input.option.label}</span>
        <ActionIcon
          variant="subtle"
          size="md"
          onClick={(e) => {
            e.stopPropagation();
            removeTag(Number(input.option.value));
          }}
        >
          <X size={14} />
        </ActionIcon>
      </div>
    ),
    [removeTag],
  );

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
        onChange={onChangeSelect}
        value={selectedTags}
        data={comboboxTags}
        renderOption={renderTagsInputOption as any}
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
      <Editor editor={editor} session={session} />
    </Stack>
  );
}
