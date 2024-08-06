import Link from "next/link";
import * as css from "./navigation.css";
import Pencil from "@/asset/svg/pencil.svg?react";

export default function Navigation() {
  return (
    <div className={css.wrap}>
      <ul className={css.list}>
        <li>list1</li>
        <li>
          <Link href="/upload" className={css.link}>
            <Pencil className={css.pencil} />
          </Link>
        </li>
        <li>list3</li>
      </ul>
    </div>
  );
}
