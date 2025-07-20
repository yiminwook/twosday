import ErrorModal from "@/components/common/modal/error-modal";
import { useSetModalStore } from "@/stores/modal-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { signInFn } from "@/apis/auth";
import { useRouter } from "next/navigation";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { useForm } from "react-hook-form";
import css from "./signin-form.module.scss";

type TSignInForm = {
  email: string;
  password: string;
};

export default function SigninForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const modalStore = useSetModalStore();
  const queryClient = useQueryClient();

  const form = useForm<TSignInForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutateEmailLogin = useMutation({
    mutationFn: signInFn,
    onMutate: () => setIsLoading(() => true),
    onSuccess: async () => {
      await queryClient.resetQueries({ queryKey: ["session"] });
      router.replace("/");
    },
    onError: async (error) => {
      await modalStore.push(ErrorModal, { props: { error } });
      setIsLoading(() => false);
    },
  });

  const handleSubmit = (data: TSignInForm) => {
    if (mutateEmailLogin.isPending) return;
    mutateEmailLogin.mutate(data);
  };

  return (
    <form className={css.form} onSubmit={form.handleSubmit(handleSubmit)}>
      <div className={css.top}>
        <div className={css.inputWrap}>
          <TextInput
            {...form.register("email")}
            label="이메일"
            type="text"
            name="email"
            aria-label="이메일"
            autoComplete="email"
            onReset={() => form.resetField("email")}
            inputMode="email"
            required
            error={form.formState.errors.email?.message}
          />
        </div>

        <div className={css.inputWrap}>
          <PasswordInput
            {...form.register("password")}
            label="비밀번호"
            type="password"
            name="password"
            aria-label="비밀번호"
            autoComplete="current-password"
            onReset={() => form.resetField("password")}
            required
            error={form.formState.errors.password?.message}
          />
        </div>

        <Button w="100%" type="submit" loading={isLoading}>
          로그인
        </Button>
      </div>
      <div className={css.bottom}>
        <div className={css.signUp}>
          <p className={css.division}>또는</p>

          <Button w="100%" variant="outline" component={Link} href="/signup">
            이메일로 회원가입
          </Button>
        </div>
      </div>
    </form>
  );
}
