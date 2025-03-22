"use client";
import Link from "next/link";
import Pencil from "@/assets/svg/pencil.svg?react";
import LoginBtn from "../LoginBtn";
import ThemeBtn from "../ThemeBtn";
import LogoutBtn from "../LogoutBtn";
import { useSession } from "@/libraries/auth/useSession";
import { useMutation } from "@tanstack/react-query";
import css from "./Header.module.scss";
import { clientApi } from "@/apis/fetcher";

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
              twosday
            </Link>
          </div>
          <ul className={css.right}>
            <li>
              <ThemeBtn />
            </li>
            <li className={css.upload}>
              <Link href="/posts/edit" className={css.link}>
                <Pencil />
                <span>글쓰기</span>
              </Link>
            </li>
            {!query.isPending && !!query.data && (
              <li>
                <LogoutBtn onClick={onClickLogout} />
              </li>
            )}
            {!query.isPending && !query.data && (
              <li>
                <LoginBtn />
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
