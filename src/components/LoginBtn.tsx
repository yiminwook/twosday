"use client";
import Link from "next/link";
import { loginBtn } from "./loginBtn.css";

export default function LoginBtn() {
  return (
    <Link href="/signin" className={loginBtn}>
      로그인
    </Link>
  );
}
