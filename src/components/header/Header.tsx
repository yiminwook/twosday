"use client";
import Link from "next/link";
import css from "./Header.module.scss";
import { ActionIcon } from "@mantine/core";
import dynamic from "next/dynamic";
import Image from "next/image";
import Logo from "@/assets/images/logo-92x50.png";
import { useAppStore } from "@/stores/app";
import { PanelLeftOpen } from "lucide-react";

const ThemeButton = dynamic(() => import("../ThemeButton"), { ssr: false });

export default function Header() {
  const setShowMobileSidebar = useAppStore((state) => state.actions.setShowMobileSidebar);
  const openMobileView = () => setShowMobileSidebar(true);

  return (
    <header className={css.wrap}>
      <div className={css.position}>
        <div className={css.inner}>
          <div>
            <ActionIcon className="mobileOnly" variant="transparent" onClick={openMobileView}>
              <PanelLeftOpen size={20} />
            </ActionIcon>
            <Link className={css.title} href="/">
              Twosday
            </Link>
          </div>
          <ul className={css.right}>
            <li>
              <ThemeButton />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
