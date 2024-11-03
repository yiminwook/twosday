"use client";
import * as css from "./themeBtn.css";
import LightMode from "@/assets/svg/LightModeIcon.svg?react";
import DarkMode from "@/assets/svg/DarkModeIcon.svg?react";
import { useApp, useSetApp } from "@/stores/app";
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
