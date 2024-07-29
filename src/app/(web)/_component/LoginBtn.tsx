"use client";
import { getWasUrl } from "@/app/_lib/getWasUrl";
import { loginBtn } from "./loginBtn.css";

export default function LoginBtn() {
  const onClick = () => {
    const redirect = encodeURIComponent(window.location.href);
    window.location.href = getWasUrl() + "/login?redirect=" + redirect;
  };
  return (
    <button className={loginBtn} onClick={onClick}>
      로그인
    </button>
  );
}
