import { getServerSession } from "@/apis/getServerSession";
import { fixed, link, right, title, wrap, upload, inner } from "./header.css";
import Link from "next/link";
import Pencil from "@/assets/svg/pencil.svg?react";
import LoginBtn from "../LoginBtn";
import ThemeBtn from "../ThemeBtn";
import LogoutBtn from "../LogoutBtn";

export default async function Header() {
  const session = await getServerSession();

  return (
    <header className={wrap}>
      <div className={fixed}>
        <div className={inner}>
          <div>
            <Link className={title} href={"/"}>
              twosday
            </Link>
          </div>
          <ul className={right}>
            <li>
              <ThemeBtn />
            </li>
            <li className={upload}>
              <Link href="/post/edit" className={link}>
                <Pencil />
                <span>글쓰기</span>
              </Link>
            </li>

            <li>{!session ? <LoginBtn /> : <LogoutBtn />}</li>
          </ul>
        </div>
      </div>
    </header>
  );
}
