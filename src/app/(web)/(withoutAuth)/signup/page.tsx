import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SocialBox from "../_component/SocialBox";
import SignupForm from "./_component/SignupForm";
import * as css from "./page.css";
import { getServerSession } from "@/app/_lib/getServerSession";

export default async function Page() {
  return (
    <main className={css.main}>
      <div className={css.inner}>
        <h1 className={css.title}>이메일 회원가입</h1>
        <SignupForm />
      </div>
    </main>
  );
}
