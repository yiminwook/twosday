import { fixed, link, right, title, wrap, upload, inner } from "./header.css";
import Link from "next/link";
import Pencil from "@/assets/svg/pencil.svg?react";
import LoginBtn from "../LoginBtn";
import ThemeBtn from "../ThemeBtn";
import LogoutBtn from "../LogoutBtn";

export default async function Header() {
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
              <Link href="/posts/edit" className={link}>
                <Pencil />
                <span>글쓰기</span>
              </Link>
            </li>

            <li>{true ? <LoginBtn /> : <LogoutBtn />}</li>
          </ul>
        </div>
      </div>
    </header>
  );
}
