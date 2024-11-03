"use client";
import { theme } from "@/styles/theme";
import { getWasUrl } from "@/utils/getWasUrl";
import { Button, Center, em, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";

export default function Client() {
  const ref = useRef<HTMLFormElement>(null);
  const [emailInputError, setEmailInputError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");

  const mutation = useMutation({
    mutationFn: async (arg: { email: string; password: string }) => {
      const token = btoa(arg.email + ":" + arg.password);
      const req = await fetch(getWasUrl() + "/api/auth/email-test", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Basic ${token}` },
      });
      const body: { data: { token: string }; message: string[] } = await req.json();
      return body.data.token;
    },
    onSuccess: (token) => {
      const threeDays = 1000 * 60 * 60 * 24 * 3;
      document.cookie = `refresh_token=${token}; Max-age=${threeDays}; path=/;`;
      window.location.href = "/";
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currnet = ref.current;
    if (!currnet || mutation.isPending) return;

    const email = ref.current["email-input"].value.trim();
    const password = ref.current["password-input"].value.trim();

    if (!email) {
      setEmailInputError("이메일을 입력해주세요");
      return;
    }

    if (!password) {
      setPasswordInputError("비밀번호를 입력해주세요");
      return;
    }

    mutation.mutate({ email, password });
  };

  const resetEmailInputError = () => setEmailInputError("");
  const resetPasswordInputError = () => setPasswordInputError("");

  return (
    <Center
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Title order={2} my="lg" style={{ fontSize: 24 }}>
        테스트 로그인
      </Title>
      <form
        ref={ref}
        onSubmit={onSubmit}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: theme.breakpoints?.xs,
        }}
      >
        <Stack p="lg" my="lg" gap="lg">
          <TextInput
            name="email-input"
            type="email"
            label="이메일"
            size="lg"
            error={emailInputError}
            onChange={resetEmailInputError}
          />
          <PasswordInput
            name="password-input"
            type="password"
            label="비밀번호"
            size="lg"
            error={passwordInputError}
            onChange={resetPasswordInputError}
          />
          <Button mt={30} size="lg" type="submit" disabled={mutation.isPending}>
            로그인
          </Button>
        </Stack>
      </form>
    </Center>
  );
}
