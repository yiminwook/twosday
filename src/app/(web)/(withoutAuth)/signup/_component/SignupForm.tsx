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
  const [isLoading, setIsLoading] = useState(false);

  const modalStore = useSetModalStore();
  const store = useApp();
  const action = useStore(store, (store) => store.actions);

  const mutateEmailRegister = useMutation({
    mutationKey: ["/api/auth/register"],
    mutationFn: emailSignupFn,
    onMutate: () => setIsLoading(() => true),
    onSuccess: (data) => {
      router.push(`/signup/register?token=${data.token}`);
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
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mutateEmailRegister.isPending) return;
    mutateEmailRegister.mutate({ email });
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
      <div className={css.inputWrap}></div>
      <div className={css.btnBox}>
        <button className={css.loginBtn} type="submit" disabled={isLoading}>
          {isLoading ? <DotsLoading /> : "다음"}
        </button>
      </div>
    </form>
  );
}
