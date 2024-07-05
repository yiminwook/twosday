import { getSessionByToken } from "@/app/_lib/getTokenPayload";
import { notFound } from "next/navigation";
import * as css from "./page.css";
import SignupForm from "./_component/SignupForm";

interface PageProps {
  searchParams: {
    token?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  if (!searchParams.token) return notFound();
  const session = await getSessionByToken(searchParams.token);

  return (
    <main className={css.main}>
      <div className={css.inner}>
        <h1 className={css.title}>회원가입 2</h1>
        <SignupForm session={session} />
      </div>
    </main>
  );
}
