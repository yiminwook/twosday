"use client";
import NoSSR from "@/components/common/NoSSR";
import { Authorized } from "@/libraries/auth/authorized";
import { useSuspenseSession } from "@/libraries/auth/use-session";
import css from "./page.module.scss";
import Link from "next/link";

export default function Page() {
  return (
    <NoSSR>
      <Authorized>
        <div className={css.wrap}>
          <h1 className={css.title}>마이페이지</h1>
          <Info />
          <Nav />
        </div>
      </Authorized>
    </NoSSR>
  );
}

function Info() {
  const { data: session } = useSuspenseSession();
  return <div>정보 {session?.email}</div>;
}

function Nav() {
  return (
    <div className={css.navBox}>
      <nav className={css.nav}>
        <Link href="/my/posts">
          <div className={css.navItem}>나의 포스트</div>
        </Link>
        <div className={css.navItem}>미정 (2)</div>
        <div className={css.navItem}>미정 (3)</div>
      </nav>
    </div>
  );
}
