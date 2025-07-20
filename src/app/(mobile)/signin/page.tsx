"use client";
import { useRouter } from "next/navigation";
import SigninForm from "@/components/signin/signin-form";
import { Button } from "@mantine/core";
import css from "./page.module.scss";
import { AwaitUnAuthorized } from "@/libraries/auth/un-authorized";
import { Suspense } from "react";
import NoSSR from "@/components/common/NoSSR";

export default function Page() {
  const router = useRouter();

  return (
    <NoSSR>
      <Suspense fallback={null}>
        <AwaitUnAuthorized>
          <h1 className={css.title}>이메일 로그인</h1>
          <SigninForm />
          <Button className={css.backButton} variant="light" onClick={router.back}>
            뒤로 돌아가기
          </Button>
        </AwaitUnAuthorized>
      </Suspense>
    </NoSSR>
  );
}
