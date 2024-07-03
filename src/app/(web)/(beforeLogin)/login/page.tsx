import LoginForm from "./_component/LoginForm";
import * as style from "./page.css";
import SocialBox from "../_component/SocialBox";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Link from "next/link";
import { getServerSession } from "@/app/_lib/getServerSession";

export default async function Page() {
  const session = await getServerSession();
  console.log(session);
  return (
    <main className={style.main}>
      <div className={style.inner}>
        <h1 className={style.title}>로그인</h1>
        <LoginForm />
        <SocialBox />
        <Link href={"/signup"}>회원가입 페이지로 이동</Link>
      </div>
    </main>
  );
}
