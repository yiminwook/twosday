"use client";
import ResetButton from "@/app/_component/btn/ResetBtn";
import DotsLoading from "@/app/_component/loading/DotsLoading";
import ErrorModal from "@/app/_component/modal/ErrorModal";
import { useApp } from "@/app/_lib/app";
import { useSetModalStore } from "@/app/_lib/modalStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "zustand";
import * as css from "./signupForm.css";
import { checkPassword } from "@/app/_lib/regexp";
import { getWasUrl } from "@/app/_lib/getWasUrl";

interface RegisterFormProps {
  session: Session;
}

export default function RegisterForm({ session }: RegisterFormProps) {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [validationPw, setValidationPw] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const modalStore = useSetModalStore();
  const store = useApp();
  const action = useStore(store, (store) => store.actions);

  const emailSignupFn = useMutation({
    mutationKey: ["/api/auth/register"],
    mutationFn: async ({
      session,
      nickname,
      password,
    }: {
      session: Session;
      nickname: string;
      password: string;
    }) => {
      const trimmedNickname = nickname.trim();
      const trimmedPassword = password.trim();

      if (!trimmedNickname) {
        throw new Error("닉네임을 입력해주세요.");
      }

      if (checkPassword(trimmedPassword)) {
        throw new Error("비밀번호를 확인하세요.");
      }

      document.cookie = "redirect=" + encodeURIComponent(process.env.NEXT_PUBLIC_API_URL);

      const res = await fetch(`${getWasUrl()}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.email,
          nickname: trimmedNickname,
          password: trimmedPassword,
        }),
        credentials: "include",
      });

      const body: { token: string; message: string } = await res.json();

      if (!res.ok) {
        throw new Error(body.message);
      }

      return body;
    },
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    switch (id) {
      case "nicknameInput":
        setNickname(() => value);
        break;
      case "passwordInput":
        setPassword(() => value);
        setValidationPw(() => value === passwordConfirm);
        break;
      case "passwordConfirmInput":
        setPasswordConfirm(() => value);
        setValidationPw(() => value === password);
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailSignupFn.isPending) return;
    emailSignupFn.mutate({ session, nickname, password });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.inputWrap}>
        <label className={css.label} htmlFor="emailInput">
          이메일
        </label>
        <div className={css.inputBox}>
          <input className={css.input} id="emailInput" type="text" value={session.email} />
        </div>
      </div>
      <div className={css.inputWrap}>
        <label className={css.label} htmlFor="nicknameInput">
          닉네임
        </label>
        <div className={css.inputBox}>
          <input
            className={css.input}
            id="nicknameInput"
            type="text"
            value={nickname}
            onChange={handleInput}
          />
          <ResetButton isShow={nickname !== ""} onClick={() => setNickname("")} />
        </div>
      </div>
      <div className={css.inputWrap}>
        <label className={css.label} htmlFor="passwordInput">
          비밀번호
        </label>
        <div className={css.inputBox}>
          <input
            className={css.input}
            id="passwordInput"
            type="password"
            value={password}
            onChange={handleInput}
            placeholder="비밀번호를 입력해주세요."
          />
          <ResetButton isShow={password !== ""} onClick={() => setPassword("")} />
        </div>
        <div className={css.inputBox}>
          <input
            className={css.input}
            id="passwordConfirmInput"
            type="password"
            value={passwordConfirm}
            onChange={handleInput}
            placeholder="비밀번호를 한번 더 입력해주세요."
          />
          <ResetButton isShow={passwordConfirm !== ""} onClick={() => setPasswordConfirm("")} />
        </div>
        <div className={css.pwInfo}>
          <div className={css.pwCondition}>
            영문, 숫자, 특수문자를 조합해 8자 이상으로 입력해주세요.
          </div>
          <div className={css.pwCorrect}>
            {!validationPw && "비밀번호가 서로 일치하지 않습니다."}
          </div>
        </div>
      </div>
      <div className={css.btnBox} tabIndex={0}>
        <button className={css.loginBtn} type="submit" disabled={isLoading}>
          {isLoading ? <DotsLoading /> : "인증번호 요청"}
        </button>
      </div>
    </form>
  );
}
