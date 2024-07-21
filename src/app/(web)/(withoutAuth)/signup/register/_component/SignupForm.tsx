"use client";
import ResetButton from "@/app/_component/btn/ResetBtn";
import DotsLoading from "@/app/_component/loading/DotsLoading";
import ErrorModal from "@/app/_component/modal/ErrorModal";
import { useSetModalStore } from "@/app/_lib/modalStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as css from "./signupForm.css";
import { getWasUrl } from "@/app/_lib/getWasUrl";

interface SignupFormProps {
  session: Session;
}

export default function SignupForm({ session }: SignupFormProps) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const modalStore = useSetModalStore();

  const requestEmailCode = useMutation({
    mutationKey: ["/api/auth/signup"],
    mutationFn: async ({ email }: { email: string }) => {
      const res = await fetch(`${getWasUrl()}/api/auth/signup`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const body: { message: string } = await res.json();
      if (!res.ok) {
        throw new Error(body.message);
      }
      return body;
    },
    onSuccess: (data) => toast.success(data.message),
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    switch (id) {
      case "loginEmailCodeInput":
        setCode(() => value);
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
    // registUser.mutate();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.inputWrap}>
        <label className={css.label} htmlFor="loginEmailCodeInput">
          인증번호
        </label>
        <div className={css.inputBox}>
          <input
            className={css.input}
            id="loginEmailCodeInput"
            type="text"
            value={code}
            onChange={handleInput}
          />
        </div>
        <div>
          <button
            type="button"
            style={{ height: 40 }}
            // onClick={() => requestEmailCode.mutate()}
            disabled={requestEmailCode.isPending}
          >
            {requestEmailCode.isPending ? <DotsLoading /> : "요청하기"}
          </button>
        </div>
      </div>
      <div>{session.accountType}</div>
      <div className={css.inputWrap}>
        <label className={css.label} htmlFor="loginEmailInput">
          이메일
        </label>
        <div className={css.inputBox}>
          <input
            className={css.input}
            id="loginEmailInput"
            type="text"
            value={session.email}
            disabled={true}
          />
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
          </div>
        </div>
      </div>
      <div className={css.btnBox}>
        <button className={css.loginBtn} type="submit" disabled={isLoading}>
          {isLoading ? <DotsLoading /> : "등록"}
        </button>
      </div>
    </form>
  );
}
