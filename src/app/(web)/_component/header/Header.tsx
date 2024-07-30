import { getServerSession } from "@/app/_lib/getServerSession";
import { redirect } from "next/navigation";
import { fixed, link, right, title, wrap } from "./header.css";
import Link from "next/link";
import Pencil from "@/asset/svg/pencil.svg?react";
import LoginBtn from "../LoginBtn";

export default async function Header() {
  const session = await getServerSession();

  return (
    <header className={wrap}>
      <div className={fixed}>
        <div>
          <h1 className={title}>twosday</h1>
        </div>
        <ul className={right}>
          <li>
            <Link href="/upload" className={link}>
              <Pencil />
              <span>글쓰기</span>
            </Link>
          </li>
          <li>
            <LoginBtn />
          </li>
        </ul>
      </div>
    </header>
  );
}
