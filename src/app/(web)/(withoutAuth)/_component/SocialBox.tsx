"use client";

import { defaultBtn } from "@/app/_component/btn/btn.css";
import { getWasUrl } from "@/app/_lib/getWasUrl";

export default function SocialBox() {
  const onClick = (provider: "google" | "kakao") => {
    document.cookie =
      "redirect=" + encodeURIComponent(process.env.NEXT_PUBLIC_API_URL) + ";domain=twosday.live";

    window.location.href = `${getWasUrl()}/api/auth/${provider}`;
  };

  return (
    <div>
      <p>소셜 로그인</p>
      <button className={defaultBtn} onClick={() => onClick("google")}>
        구글
      </button>
      <button className={defaultBtn} onClick={() => onClick("kakao")}>
        카카오
      </button>
    </div>
  );
}
