import LoginForm from "./_component/LoginForm";
import SocialBox from "../_component/SocialBox";
import Link from "next/link";
import { getServerSession } from "@/app/_lib/getServerSession";
import * as css from "./page.css";
import ContinueBtn from "./_component/ContinueBtn";
import { getWasUrl } from "@/app/_lib/getWasUrl";
import Kakao from "@/asset/svg/kakao.svg?react"
import Apple from "@/asset/svg/apple.svg?react"
import Google from "@/asset/svg/google.svg?react"


export default async function Page() {
  const session = await getServerSession();
  console.log(session);

  const onBtnClick = () => {

  }


  return (
    <main className={css.main}>
      <div className={css.inner}>
        <h1 className={css.title}>회원가입/로그인</h1>
        {/* <LoginForm /> */}
        {/* <SocialBox /> */}
        {/* <Link href={"/signup"}>회원가입 페이지로 이동</Link> */}
        <div className={css.btnWrap}>
        <ContinueBtn icon={<Kakao />}text="카카오 계정으로 계속하기" type="kakao" />
        <ContinueBtn icon={<Apple />} text="애플 계정으로 계속하기" />
        <ContinueBtn icon={<Google />}  text="구글 계정으로 계속하기" />
          <ContinueBtn text="이메일로 계속하기" />
        </div>
      </div>
    </main>
  );
}
