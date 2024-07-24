"use client";

import { notFound } from "next/navigation";
import * as css from "./page.css";
import { getWasUrl } from "@/app/_lib/getWasUrl";
import { useQueryGetVerification } from "../_lib/signup";
import { useRouter } from "next/navigation";
import RegisterForm from "./_component/RegisterForm";
interface PageProps {
  searchParams: {
    token?: string;
  };
}

export default function Page({ searchParams }: PageProps) {
  const router = useRouter();
  const token = searchParams.token;

  const { data, error } = useQueryGetVerification(token);

  if (data?.data === null) return router.push("/not-found");
  if (error) throw error;
  if (data?.data === undefined) return <div>로딩중...</div>;

  return (
    <main className={css.main}>
      <div className={css.inner}>
        <h1 className={css.title}>회원가입</h1>
        <RegisterForm data={data.data} />
      </div>
    </main>
  );
}
