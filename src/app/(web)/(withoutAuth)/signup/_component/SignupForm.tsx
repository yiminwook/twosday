"use client";
import ResetButton from "@/app/_component/btn/ResetBtn";
import DotsLoading from "@/app/_component/loading/DotsLoading";
import ErrorModal from "@/app/_component/modal/ErrorModal";
import { useApp } from "@/app/_lib/app";
import { useSetModalStore } from "@/app/_lib/modalStore";
import { useMutation } from "@tanstack/react-query";
import { emailSignupFn } from "@web/(withoutAuth)/_lib/signup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "zustand";
import * as css from "./signupForm.css";

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [validationPw, setValidationPw] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const modalStore = useSetModalStore();
  const store = useApp();
  const action = useStore(store, (store) => store.actions);

  const mutateEmailRegister = useMutation({
    mutationKey: ["/api/auth/register"],
    mutationFn: emailSignupFn,
    onMutate: () => setIsLoading(() => true),
    onSuccess: (data) => {
      router.push("/");
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
      case "emailInput":
        setEmail(() => value);
        break;
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

    if (mutateEmailRegister.isPending) return;
    mutateEmailRegister.mutate({ email, nickname, password });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.inputWrap}>
        <label className={css.label} htmlFor="emailInput">
          아이디
        </label>
        <div className={css.inputBox}>
          <input
            className={css.input}
            id="emailInput"
            type="text"
            value={email}
            onChange={handleInput}
          />
          <ResetButton isShow={email !== ""} onClick={() => setEmail("")} />
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

      <div className={css.btnBox}>
        <button className={css.loginBtn} type="submit" disabled={validationPw || isLoading}>
          {isLoading ? <DotsLoading /> : "가입하기"}
        </button>
      </div>
    </form>
  );
}
