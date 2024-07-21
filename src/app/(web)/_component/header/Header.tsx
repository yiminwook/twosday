import { getServerSession } from "@/app/_lib/getServerSession";
import { redirect } from "next/navigation";
import SidebarToggle from "../sidebar/SidebarToggle";
import { fixed, link, right, title, wrap } from "./header.css";
import { FaPencilAlt } from "react-icons/fa";
import Link from "next/link";
import Pencil from "@/asset/svg/pencil.svg?react";

export default async function Header() {
  const session = await getServerSession();

  return (
    <header className={wrap}>
      <div className={fixed}>
        <div>
          <SidebarToggle />
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
            <Link href="/login" className={link}>
              <span>로그인</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
