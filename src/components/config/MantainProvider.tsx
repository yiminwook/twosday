"use client";
import { theme } from "@/styles/theme";
import { MantineProvider as Provider } from "@mantine/core";

interface MantineProviderProps {
  children: React.ReactNode;
}

export default function MantineProvider({ children }: MantineProviderProps) {
  return <Provider theme={theme}>{children}</Provider>;
}
