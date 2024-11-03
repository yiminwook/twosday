import { useSetModalStore } from "@/stores/modalStore";
import * as css from "./editor.css";
import { Editor } from "@tiptap/react";
import { readFile } from "./readFile";
import CropModal, { CroppedData } from "./CropModal";
import classNames from "classnames";
import { VscBold } from "react-icons/vsc";
import { IoCodeSlashOutline } from "react-icons/io5";
import { LuImage } from "react-icons/lu";
import { FaYoutube } from "react-icons/fa";
import { TfiAlignLeft, TfiAlignRight, TfiAlignCenter, TfiAlignJustify } from "react-icons/tfi";
import { BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs";
import { CgFormatItalic } from "react-icons/cg";
import { BsTypeStrikethrough } from "react-icons/bs";
import { BiUnderline, BiLink, BiUnlink } from "react-icons/bi";
import { GoListOrdered, GoListUnordered } from "react-icons/go";
import { LuListX } from "react-icons/lu";
import { RiH1, RiH2, RiH3 } from "react-icons/ri";
import { RichTextEditor } from "@mantine/tiptap";

interface ControlProps {
  editor: Editor;
}

export default function Control({ editor }: ControlProps) {
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
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const url = await readFile(file);
        console.log("url", url);
        const result: CroppedData | undefined = await modalStore.push(CropModal, {
          props: { file, imageUrl: url },
        });
        if (!result) return;
        console.log("result", result);
        editor.chain().focus().setImage({ src: result.data.url }).run();
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
        <RichTextEditor.Control></RichTextEditor.Control>
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
