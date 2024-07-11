"use client";

import { ContinueBtnWrap } from "./loginForm.css";
import classNames from "classnames";

interface ContinueBtnProps {
  icon?: string | React.ReactElement;
  text: string;
  type?: string;
  onClick: () => void;
}

export default function ContinueBtn({ icon, text, type, onClick }: ContinueBtnProps) {
  return (
    <button
      type="button"
      className={classNames(ContinueBtnWrap, type === "kakao" ? "kakao" : "")}
      onClick={onClick}
    >
      <span>{icon}</span>
      <p>{text}</p>
    </button>
  );
}
