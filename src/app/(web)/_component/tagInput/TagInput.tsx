"use client";
import { useMemo, useState } from "react";
import Removable from "./Removable";
import SavedList from "./SavedList";
import OutsideClickHandler from "react-outside-click-handler";
import * as css from "./tagInput.css";

interface TagInputProps {
  tags: string[];
  onClose?: (select: string[]) => void;
}
export default function TagInput({ tags, onClose }: TagInputProps) {
  const [value, setValue] = useState("");
  const [select, setSelect] = useState<string[]>([...tags]);
  const [saved, setSaved] = useState<string[]>(["tag1", "tag2", "tag3", "tag4", "tag5"]);

  const onKeyDn = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼제출 방지
      if (value === "") return;
      if (select.some((el) => el === value)) return; //중복방지
      setSelect((prev) => [...prev, value]);
      setValue(() => "");
    } else if (e.key === "Backspace" && value === "") {
      setSelect((prev) => {
        const next = [...prev];
        next.pop();
        return next;
      });
    }
    console.log("default ");
  };

  const onEdit = (name: string) => {
    console.log("edit", name);
  };

  const onRemove = (name: string) => {
    setSelect((prev) => prev.filter((tag) => tag !== name));
  };

  const onClickRemovable = (name: string) => {
    console.log("click", name);
    setSelect((prev) => {
      if (prev.includes(name)) return prev; // 중복 방지
      return [...prev, name];
    });
  };

  const filtered = saved.filter((name) => {
    if (value === "") return true;
    return name.includes(value);
  });

  return (
    <OutsideClickHandler onOutsideClick={() => onClose?.(select)}>
      <div className={css.wrap}>
        <div className={css.inputBox}>
          {select.map((name, index) => (
            <Removable key={`input_${name}`} name={name} onRemove={onRemove} index={index} />
          ))}
          <input
            type="text"
            className={css.input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDn}
          />
        </div>
        <SavedList saved={filtered} onEdit={onEdit} onClickRemovable={onClickRemovable} />
      </div>
    </OutsideClickHandler>
  );
}
