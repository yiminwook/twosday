import Kakao from "@/assets/svg/kakao.svg?react";
import Google from "@/assets/svg/google.svg?react";
import * as css from "./authBtnGrp.css";
import AuthBtn from "./AuthBtn";

export default function AuthBtnGrp() {
  const onClick = (provider: "google" | "kakao") => {
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className={css.wrap}>
      <AuthBtn
        icon={<Kakao width={24} height={24} />}
        text="카카오 계정으로 계속하기"
        type="kakao"
        onClick={() => onClick("kakao")}
      />
      <AuthBtn
        icon={<Google width={24} height={24} />}
        text="구글 계정으로 계속하기"
        onClick={() => onClick("google")}
      />
    </div>
  );
}
