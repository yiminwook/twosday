import Link from "next/link";
import * as css from "./navigation.css";
import Pencil from "@/assets/svg/pencil.svg?react";

export default function Navigation() {
  return (
    <div className={css.wrap}>
      <div className={css.inner}>
        <ul className={css.list}>
          <li>list1</li>
          <li>
            <Link href="/post/edit" className={css.link}>
              <Pencil className={css.pencil} />
            </Link>
          </li>
          <li>list3</li>
        </ul>
      </div>
    </div>
  );
}
