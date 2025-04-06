import DotsLoading from "@/components/common/loading/DotsLoading";
import ErrorModal from "@/components/common/modal/ErrorModal";
import { useSetModalStore } from "@/stores/modalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import css from "./LoginForm.module.scss";
import { signInFn } from "@/apis/auth";
import { useRouter } from "next/navigation";
import { Button, TextInput } from "@mantine/core";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const modalStore = useSetModalStore();
  const queryClient = useQueryClient();

  const mutateEmailLogin = useMutation({
    mutationFn: signInFn,
    onMutate: () => setIsLoading(() => true),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      router.replace("/");
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
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mutateEmailLogin.isPending) return;
    mutateEmailLogin.mutate({ email, password });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.top}>
        <div className={css.inputWrap}>
          <label className={css.label} htmlFor="loginEmailInput">
            이메일
          </label>
          <div className={css.inputBox}>
            <TextInput
              className={css.input}
              id="loginEmailInput"
              type="text"
              value={email}
              onChange={handleInput}
              onReset={() => setEmail("")}
            />
          </div>
        </div>
        <div className={css.inputWrap}>
          <label className={css.label} htmlFor="loginPasswordInput">
            비밀번호
          </label>
          <div className={css.inputBox}>
            <TextInput
              className={css.input}
              id="loginPasswordInput"
              type="password"
              value={password}
              onChange={handleInput}
              onReset={() => setPassword("")}
            />
          </div>
        </div>
        <div className={css.btnBox}>
          <button className={css.loginBtn} type="submit" disabled={isLoading}>
            {isLoading ? <DotsLoading /> : "로그인"}
          </button>
        </div>
      </div>
      <div className={css.bottom}>
        <div className={css.signUp}>
          <p className={css.division}>또는</p>
          <div className={css.btnBox}>
            <Button className={css.singUpBtn} type="button" onClick={() => router.push("/signup")}>
              이메일로 회원가입
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
