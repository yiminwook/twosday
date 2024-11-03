"use client";
import { getWasUrl } from "@/utils/getWasUrl";
import { loginBtn } from "./loginBtn.css";

export default function LoginBtn() {
  const onClick = () => {
    if (!process.env.NEXT_PUBLIC_VERCEL_URL) {
      window.location.href = "/login";
      return;
    }
    const redirect = encodeURIComponent(window.location.href);
    window.location.href = getWasUrl() + "/login?redirect=" + redirect;
  };
  return (
    <button className={loginBtn} onClick={onClick}>
      로그인
    </button>
  );
}
