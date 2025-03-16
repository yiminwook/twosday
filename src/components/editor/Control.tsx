import { useSetModalStore } from "@/stores/modalStore";
import * as css from "./editor.css";
import { Editor } from "@tiptap/react";
import { readFile } from "./readFile";
import CropModal, { CroppedData } from "./CropModal";
import { LuImage } from "react-icons/lu";
import { FaYoutube } from "react-icons/fa";
import { RichTextEditor } from "@mantine/tiptap";
import { clientApi } from "@/apis/fetcher";
import { IMAGE_URL } from "@/constances";
import { toast } from "sonner";

interface ControlProps {
  editor: Editor;
  session: Session;
}

export default function Control({ editor, session }: ControlProps) {
  const modalStore = useSetModalStore();

  const addYoutubeVideo = () => {
    const src = prompt("Enter YouTube URL");

    if (!src) return;
    editor.commands.setYoutubeVideo({ src, width: 640, height: 360 });
  };

  const upload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", async () => {
      try {
        if (input.files && input.files.length > 0) {
          const file = input.files[0];
          const url = await readFile(file);

          const result: CroppedData | undefined = await modalStore.push(CropModal, {
            props: { file, imageUrl: url },
          });

          if (!result) return;

          const formData = new FormData();
          formData.append("image", result.file);

          const wasRes = await clientApi("images", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
            body: formData,
          });

          const json: { key: string; message: string } = await wasRes.json();

          editor
            .chain()
            .focus()
            .setImage({ src: IMAGE_URL + "/" + json.key })
            .run();
        }
        input.remove();
      } catch (error) {
        toast.error("이미지 업로드에 실패했습니다.");
      }
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

  return (
    <RichTextEditor.Toolbar>
      <RichTextEditor.ControlsGroup>
        <RichTextEditor.Bold />
        <RichTextEditor.Italic />
        <RichTextEditor.Underline />
        <RichTextEditor.Strikethrough />
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
          <LuImage size={16} />
        </RichTextEditor.Control>
        <RichTextEditor.Control onClick={addYoutubeVideo}>
          <FaYoutube size={16} />
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
