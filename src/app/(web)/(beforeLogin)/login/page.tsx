import { getServerSessionWithOptions } from "@/model/nextAuth";
import { redirect } from "next/navigation";
import LoginForm from "./_component/LoginForm";
import * as style from "./page.css";
import SocialBox from "../_component/SocialBox";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const refreshToken = cookies().get("refreshToken")?.value;

  console.log("refresh", refreshToken);
  if (refreshToken) {
    const session = jwt.verify(refreshToken, process.env.NEXTAUTH_SECRET);
    console.log(session);
    // if (session) return redirect("/");
  }

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
