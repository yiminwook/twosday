"use client";
import css from "./ThemeButton.module.scss";
import { Moon, Sun } from "lucide-react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";

export default function ThemeButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon size="lg" variant="subtle" onClick={toggleColorScheme} className={css.wrap}>
      {colorScheme === "light" ? <Sun size={20} /> : <Moon size={20} />}
    </ActionIcon>
  );
}
