"use client";

import Kakao from "@/asset/svg/kakao.svg?react";
import Google from "@/asset/svg/google.svg?react";
import * as css from "../page.css";
import ContinueBtn from "./ContinueBtn";
import { getWasUrl } from "@/app/_lib/getWasUrl";

export default function AuthButtonGroup() {
  const onClick = (provider: "google" | "kakao") => {
    document.cookie =
      "redirect=" + encodeURIComponent(process.env.NEXT_PUBLIC_API_URL) + ";domain=twosday.live";

    window.location.href = `${getWasUrl()}/api/auth/${provider}`;
  };

  return (
    <div className={css.btnWrap}>
      <ContinueBtn
        icon={<Kakao />}
        text="카카오 계정으로 계속하기"
        type="kakao"
        onClick={() => onClick("kakao")}
      />
      <ContinueBtn
        icon={<Google />}
        text="구글 계정으로 계속하기"
        onClick={() => onClick("google")}
      />
      <ContinueBtn text="이메일로 계속하기" onClick={() => {}} />
    </div>
  );
}
