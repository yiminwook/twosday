import { useSetModalStore } from "@/app/_lib/modalStore";
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
    <div className={css.control}>
      <div className={css.buttonGroup}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={classNames(css.button, { active: editor.isActive("heading", { level: 1 }) })}
        >
          <RiH1 size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={classNames(css.button, { active: editor.isActive("heading", { level: 2 }) })}
        >
          <RiH2 size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={classNames(css.button, { active: editor.isActive("heading", { level: 3 }) })}
        >
          <RiH3 size={16} />
        </button>
      </div>
      <div className={css.buttonGroup}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={classNames(css.button, { active: editor.isActive("bold") })}
        >
          <VscBold size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={classNames(css.button, { active: editor.isActive("italic") })}
        >
          <CgFormatItalic size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={classNames(css.button, { active: editor.isActive("strike") })}
        >
          <BsTypeStrikethrough size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={classNames(css.button, { active: editor.isActive("underline") })}
        >
          <BiUnderline size={16} />
        </button>
        <button
          type="button"
          onClick={setLink}
          className={classNames(css.button, { active: editor.isActive("link") })}
        >
          <BiLink size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className={classNames(css.button, { active: !editor.isActive("link") })}
          disabled={!editor.isActive("link")}
        >
          <BiUnlink size={16} />
        </button>
      </div>

      <div className={css.buttonGroup}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={classNames(css.button, { active: editor.isActive("bulletList") })}
        >
          <GoListUnordered size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={classNames(css.button, { active: editor.isActive("orderedList") })}
        >
          <GoListOrdered size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().liftListItem("listItem").run()}
          className={classNames(css.button, { active: !editor.can().liftListItem("listItem") })}
          disabled={!editor.can().liftListItem("listItem")}
        >
          <LuListX size={16} />
        </button>
      </div>

      <div className={css.buttonGroup}>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={classNames(css.button, { active: editor.isActive({ textAlign: "left" }) })}
        >
          <TfiAlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={classNames(css.button, { active: editor.isActive({ textAlign: "center" }) })}
        >
          <TfiAlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={classNames(css.button, { active: editor.isActive({ textAlign: "right" }) })}
        >
          <TfiAlignRight size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={classNames(css.button, { active: editor.isActive({ textAlign: "justify" }) })}
        >
          <TfiAlignJustify size={16} />
        </button>
      </div>

      <div className={css.buttonGroup}>
        <button
          type="button"
          className={classNames(css.button, { active: editor.isActive("code") })}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <IoCodeSlashOutline size={16} />
        </button>

        <button type="button" className={classNames(css.button)} onClick={upload}>
          <LuImage size={16} />
        </button>

        <button type="button" className={classNames(css.button)} onClick={addYoutubeVideo}>
          <FaYoutube size={16} />
        </button>
      </div>
    </div>
  );
}
