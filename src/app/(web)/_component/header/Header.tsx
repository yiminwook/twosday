import { getServerSession } from "@/app/_lib/getServerSession";
import { fixed, link, right, title, wrap, upload, inner } from "./header.css";
import Link from "next/link";
import Pencil from "@/asset/svg/pencil.svg?react";
import LoginBtn from "../LoginBtn";
import ThemeBtn from "../ThemeBtn";

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
            <li>
              <LoginBtn />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
