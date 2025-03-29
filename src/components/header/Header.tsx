"use client";
import Link from "next/link";
import { useSession } from "@/libraries/auth/useSession";
import { useMutation } from "@tanstack/react-query";
import css from "./Header.module.scss";
import { clientApi } from "@/apis/fetcher";
import { Button } from "@mantine/core";
import dynamic from "next/dynamic";
import Image from "next/image";
import Logo from "@/assets/images/logo-92x50.png";

const ThemeButton = dynamic(() => import("../ThemeButton"), { ssr: false });

export default function Header() {
  const query = useSession();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await clientApi.post("auth/signout", {
        credentials: "include",
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  const onClickLogout = () => {
    if (mutation.isPending) return;
    mutation.mutate();
  };

  return (
    <header className={css.wrap}>
      <div className={css.position}>
        <div className={css.inner}>
          <div>
            <Link className={css.title} href="/">
              <Image src={Logo} alt="twosday-logo" height={36} />
            </Link>
          </div>
          <ul className={css.right}>
            <li>
              <ThemeButton />
            </li>
            {!query.isPending && !!query.data && (
              <li>
                <Button size="sm" variant="subtle" onClick={onClickLogout}>
                  로그아웃
                </Button>
              </li>
            )}
            {!query.isPending && !query.data && (
              <li>
                <Button size="sm" variant="subtle" component={Link} href="/signin">
                  로그인
                </Button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
