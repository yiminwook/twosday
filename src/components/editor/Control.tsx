import { useSetModalStore } from "@/stores/modalStore";
import { Editor } from "@tiptap/react";
import { readFile } from "./readFile";
import CropModal, { CroppedData } from "./CropModal";
import { LuImage } from "react-icons/lu";
import { RichTextEditor } from "@mantine/tiptap";
import { clientApi } from "@/apis/fetcher";
import { ACCEPTED_IMAGE_MIME_TYPES, IMAGE_URL } from "@/constances";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import Youtube from "@/assets/svg/youtube.svg?react";

interface ControlProps {
  editor: Editor;
  session: Session;
}

export default function Control({ editor, session }: ControlProps) {
  const modalStore = useSetModalStore();

  const addYoutubeVideo = () => {
    const src = prompt("유투브 링크를 입력해주세요");

    if (!src) return;
    editor.commands.setYoutubeVideo({ src, width: 640, height: 360 });
  };

  const upload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ACCEPTED_IMAGE_MIME_TYPES.join(",");

    input.addEventListener("change", () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];

        if (!file) return;

        // Cropper
        // const url = await readFile(file);
        // const result: CroppedData | undefined = await modalStore.push(CropModal, {
        //   props: { file, imageUrl: url },
        // });
        // if (!result) return;

        toast.promise(
          async () => {
            const formData = new FormData();
            formData.append("image", file);

            const res = await clientApi<{ key: string; message: string }>("images", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
              body: formData,
            });

            const json = await res.json();

            editor
              .chain()
              .focus()
              .setImage({ src: IMAGE_URL + "/" + json.key })
              .run();
          },
          {
            loading: "업로드중입니다...",
            success: () => "업로드 완료",
            error: (error) => "업로드 실패, " + error?.message,
          },
        );
      }

      input.remove();
    });
    input.click();
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImageLink = () => {
    const src = window.prompt("Image URL");

    if (!src) return;
    editor.chain().focus().setImage({ src }).run();
  };

  return (
    <RichTextEditor.Toolbar>
      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Bold />
        <RichTextEditor.Italic />
        <RichTextEditor.Underline />
        <RichTextEditor.Strikethrough />
        <RichTextEditor.Highlight />
        <RichTextEditor.ColorPicker
          colors={[
            "#25262b",
            "#868e96",
            "#fa5252",
            "#e64980",
            "#be4bdb",
            "#7950f2",
            "#4c6ef5",
            "#228be6",
            "#15aabf",
            "#12b886",
            "#40c057",
            "#82c91e",
            "#fab005",
            "#fd7e14",
          ]}
        />
        <RichTextEditor.UnsetColor />
        <RichTextEditor.ClearFormatting />
        <RichTextEditor.Highlight />
        <RichTextEditor.CodeBlock />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.H1 />
        <RichTextEditor.H2 />
        <RichTextEditor.H3 />
        <RichTextEditor.H4 />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Blockquote />
        <RichTextEditor.Hr />
        <RichTextEditor.BulletList />
        <RichTextEditor.OrderedList />
        <RichTextEditor.Subscript />
        <RichTextEditor.Superscript />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Link />
        <RichTextEditor.Unlink />

        <RichTextEditor.Control onClick={upload}>
          <Upload size={16} />
        </RichTextEditor.Control>
        <RichTextEditor.Control onClick={addYoutubeVideo}>
          <Youtube width={14} height={14} />
        </RichTextEditor.Control>
        <RichTextEditor.Control onClick={addImageLink}>
          <LuImage size={16} />
        </RichTextEditor.Control>
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.AlignLeft />
        <RichTextEditor.AlignCenter />
        <RichTextEditor.AlignJustify />
        <RichTextEditor.AlignRight />
      </RichTextEditor.ControlsGroup>

      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Undo />
        <RichTextEditor.Redo />
      </RichTextEditor.ControlsGroup>
    </RichTextEditor.Toolbar>
  );
}
