"use client";
import { useRouter } from "next/navigation";
import css from "../layout.module.scss";
import LoginForm from "@/components/signin/login-form";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <h1 className={css.title}>이메일 로그인</h1>
      <LoginForm />
      <button className={css.backBtn} onClick={router.back}>
        뒤로 돌아가기
      </button>
    </>
  );
}
