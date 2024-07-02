import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SocialBox from "../_component/SocialBox";
import SignupForm from "./_component/SignupForm";
import * as css from "./page.css";

export default async function Page() {
  const refreshToken = cookies().get("refreshToken")?.value;

  if (refreshToken) {
    const session = jwt.verify(refreshToken, process.env.NEXTAUTH_SECRET);
    console.log(session);
    if (session) return redirect("/");
  }

  return (
    <main className={css.main}>
      <div className={css.inner}>
        <h1 className={css.title}>회원가입</h1>
        <SignupForm />
        <SocialBox />
      </div>
    </main>
  );
}
