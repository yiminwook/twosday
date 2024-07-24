"use client";
import { getWasUrl } from "@/app/_lib/getWasUrl";
import { loginBtn } from "./loginBtn.css";

export default function LoginBtn() {
  const onClick = () => {
    const redirect = encodeURIComponent(process.env.NEXT_PUBLIC_API_URL);
    const domain =
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "twosday.live" : "localhost";
    document.cookie = `redirect=${redirect};domain=${domain}`;
    window.location.href = getWasUrl() + "/login";
  };
  return (
    <button className={loginBtn} onClick={onClick}>
      로그인
    </button>
  );
}
