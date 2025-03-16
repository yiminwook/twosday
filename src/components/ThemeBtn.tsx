"use client";
import * as css from "./themeBtn.css";
import LightMode from "@/assets/svg/LightModeIcon.svg?react";
import DarkMode from "@/assets/svg/DarkModeIcon.svg?react";
import { useMantineColorScheme } from "@mantine/core";

export default function ThemeBtn() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <div onClick={toggleColorScheme} className={css.wrap}>
      {colorScheme === "light" ? <LightMode /> : <DarkMode />}
    </div>
  );
}
