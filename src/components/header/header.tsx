"use client";
import Link from "next/link";
import css from "./header.module.scss";
import { ActionIcon } from "@mantine/core";
import dynamic from "next/dynamic";
import Image from "next/image";
import Logo from "/public/assets/images/logo-92x50.png";
import { useAppStore } from "@/stores/app";
import { PanelLeftOpen, User } from "lucide-react";
import { useSession } from "@/libraries/auth/use-session";
import NoSSR from "../common/NoSSR";

const HeaderButtons = dynamic(() => import("../header-button"), {
  ssr: false,
});

export default function Header() {
  const session = useSession();
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

          <div className={css.right}>
            <HeaderButtons />
          </div>
        </div>
      </div>
    </header>
  );
}
