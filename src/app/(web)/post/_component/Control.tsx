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

  return (
    <div className={css.control}>
      <div className={css.buttonGroup}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={classNames(css.button, { active: editor.isActive("bold") })}
        >
          <VscBold size={16} />
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
