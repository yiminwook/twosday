"use client";
import css from "./header-button.module.scss";
import { Moon, Sun } from "lucide-react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { User } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/libraries/auth/use-session";

function ThemeButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon size="lg" variant="subtle" onClick={toggleColorScheme} className={css.wrap}>
      {colorScheme === "light" ? <Sun size={20} /> : <Moon size={20} />}
    </ActionIcon>
  );
}

function UserButton() {
  const session = useSession();

  if (!session.data) return null;

  return (
    <ActionIcon component={Link} href="/my" size="lg" variant="subtle">
      <User size={20} />
    </ActionIcon>
  );
}

export default function HeaderButton() {
  return (
    <ul className={css.wrap}>
      <li>
        <UserButton />
      </li>

      <li>
        <ThemeButton />
      </li>
    </ul>
  );
}
