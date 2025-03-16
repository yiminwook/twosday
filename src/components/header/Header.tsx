"use client";
import { fixed, link, right, title, wrap, upload, inner } from "./header.css";
import Link from "next/link";
import Pencil from "@/assets/svg/pencil.svg?react";
import LoginBtn from "../LoginBtn";
import ThemeBtn from "../ThemeBtn";
import LogoutBtn from "../LogoutBtn";
import { useSession } from "@/libraries/auth/useSession";
import { useMutation } from "@tanstack/react-query";

export default function Header() {
  const query = useSession();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/v1/auth/signout", {
        method: "POST",
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
    <header className={wrap}>
      <div className={fixed}>
        <div className={inner}>
          <div>
            <Link className={title} href="/">
              twosday
            </Link>
          </div>
          <ul className={right}>
            <li>
              <ThemeBtn />
            </li>
            <li className={upload}>
              <Link href="/posts/edit" className={link}>
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
