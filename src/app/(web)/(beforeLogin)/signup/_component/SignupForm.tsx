"use client";
import ResetButton from "@/app/_component/btn/ResetBtn";
import DotsLoading from "@/app/_component/loading/DotsLoading";
import ErrorModal from "@/app/_component/modal/ErrorModal";
import { useApp } from "@/app/_lib/app";
import { useSetModalStore } from "@/app/_lib/modalStore";
import { useMutation } from "@tanstack/react-query";
import emailSignupFn from "@web/(beforeLogin)/_lib/signup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "zustand";
import * as css from "./signupForm.css";

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const modalStore = useSetModalStore();
  const store = useApp();
  const action = useStore(store, (store) => store.actions);

  const mutateEmailLogin = useMutation({
    mutationKey: ["/api/auth/email"],
    mutationFn: emailSignupFn,
    onMutate: () => setIsLoading(() => true),
    onSuccess: () => {
      // 로그인이 성공해도 화면이 전환될때까지 로딩처리
      router.replace("/login");
    },
    onError: async (error) => {
      await modalStore.push(ErrorModal, { props: { error } });
      setIsLoading(() => false);
    },
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    switch (id) {
      case "loginEmailInput":
        setEmail(() => value);
        break;
      case "loginPasswordInput":
        setPassword(() => value);
        break;
      case "loginNicknameInput":
        setNickname(() => value);
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mutateEmailLogin.isPending) return;
    mutateEmailLogin.mutate({ email, password, nickname: nickname });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.inputWrap}>
        <label className={css.label} htmlFor="loginEmailInput">
          아이디
        </label>
        <div className={css.inputBox}>
          <input
            className={css.input}
            id="loginEmailInput"
            type="text"
            value={email}
            onChange={handleInput}
          />
          <ResetButton isShow={email !== ""} onClick={() => setEmail("")} />
        </div>
      </div>
      <div className={css.inputWrap}>
        <label className={css.label} htmlFor="loginPasswordInput">
          비밀번호
        </label>
        <div className={css.inputBox}>
          <input
            className={css.input}
            id="loginPasswordInput"
            type="password"
            value={password}
            onChange={handleInput}
          />
          <ResetButton isShow={password !== ""} onClick={() => setPassword("")} />
        </div>
        <div className={css.inputWrap}>
          <label className={css.label} htmlFor="loginNicknameInput">
            닉네임
          </label>
          <div className={css.inputBox}>
            <input
              className={css.input}
              id="loginNicknameInput"
              value={nickname}
              onChange={handleInput}
            />
            <ResetButton isShow={nickname !== ""} onClick={() => setNickname("")} />
          </div>
        </div>
      </div>
      <div className={css.btnBox}>
        <button className={css.loginBtn} type="submit" disabled={isLoading}>
          {isLoading ? <DotsLoading /> : "회원가입"}
        </button>
      </div>
    </form>
  );
}
