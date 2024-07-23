import { getSessionByToken } from "@/app/_lib/getTokenPayload";
import { notFound } from "next/navigation";
import * as css from "./page.css";

import SignupForm from "./_component/SignupForm";
import RegisterForm from "./_component/RegisterForm";
import { getWasUrl } from "@/app/_lib/getWasUrl";

interface PageProps {
  searchParams: {
    token?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  console.log("searchParams", searchParams);
  const response = await fetch(`${getWasUrl()}/api/auth/verification/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${searchParams.token}`,
    },
  });

  const body: {
    data: {
      id: number;
      email: string;
      avatar: string | null;
      nickname: string;
      accountType: string;
      level: number;
      status: string;
      createdAt: string;
      updatedAt: string;
      accessToken: string;
    };
    message: string;
  } = await response.json();
  if (!body.data.accessToken) return notFound();

  return (
    <main className={css.main}>
      <div className={css.inner}>
        <h1 className={css.title}>이메일 회원가입</h1>
        {/* <RegisterForm session={session} /> */}
      </div>
    </main>
  );
}
