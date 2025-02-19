"use client";
import { useRouter } from "next/navigation";
import * as layout from "../layout.css";
import LoginForm from "@/components/signin/LoginForm";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <h1 className={layout.title}>이메일 로그인</h1>
      <LoginForm />
      <button className={layout.backBtn} onClick={router.back}>
        뒤로 돌아가기
      </button>
    </>
  );
}
