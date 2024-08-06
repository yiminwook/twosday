"use client";

import * as css from "./themeBtn.css";
import LightMode from "@/asset/svg/LightModeIcon.svg?react";
import DarkMode from "@/asset/svg/DarkModeIcon.svg?react";
import { useApp, useSetApp } from "@/app/_lib/app";
import { useStore } from "zustand";

export default function ThemeBtn() {
  const store = useApp();
  const theme = useStore(store, (store) => store.theme);
  const actions = useSetApp();

  return (
    <div onClick={() => actions.setTheme()} className={css.wrap}>
      {theme === "light" ? <LightMode /> : <DarkMode />}
    </div>
  );
}
