"use client";

import { defaultBtn } from "@/app/_component/btn/btn.css";

export default function SocialBox() {
  const serverUrl = process.env.NEXT_PUBLIC_WAS_PROTOCOL + "://" + process.env.NEXT_PUBLIC_WAS_HOST;
  return (
    <div>
      <p>소셜 로그인</p>
      <button
        className={defaultBtn}
        onClick={() => {
          window.location.href = `${serverUrl}/api/auth/google`;
        }}
      >
        구글
      </button>
      <button
        className={defaultBtn}
        onClick={() => {
          window.location.href = `${serverUrl}/api/auth/kakao`;
        }}
      >
        카카오
      </button>
    </div>
  );
}
