import LoginForm from "./_component/LoginForm";
import SocialBox from "../_component/SocialBox";
import Link from "next/link";
import { getServerSession } from "@/app/_lib/getServerSession";
import * as css from "./page.css";

export default async function Page() {
  const session = await getServerSession();
  console.log(session);
  return (
    <main className={css.main}>
      <div className={css.inner}>
        <h1 className={css.title}>로그인</h1>
        <LoginForm />
        <SocialBox />
        <Link href={"/signup"}>회원가입 페이지로 이동</Link>
      </div>
    </main>
  );
}
