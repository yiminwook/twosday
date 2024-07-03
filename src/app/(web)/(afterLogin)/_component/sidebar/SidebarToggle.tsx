"use client";

import { useSetApp } from "@/app/_lib/app";
import Image from "next/image";
import CatImg from "@/asset/cat.png";
import { toggleBtn } from "./sidebarToggle.css";

export default function SidebarToggle() {
  const actions = useSetApp();

  return (
    <>
      <button className={toggleBtn} onClick={() => actions.toggleSidebar()}>
        <Image src={CatImg} alt="sidebar toggle" width={26} height={26} />
      </button>
    </>
  );
}
