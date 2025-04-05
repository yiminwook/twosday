"use client";
import { THEME_LOCAL_STORAGE_KEY } from "@/constances";
import { theme } from "@/styles/theme";
import { localStorageColorSchemeManager, MantineProvider as Provider } from "@mantine/core";

const manager = localStorageColorSchemeManager({ key: THEME_LOCAL_STORAGE_KEY });

interface MantineProviderProps {
  children: React.ReactNode;
}

export default function MantineProvider({ children }: MantineProviderProps) {
  return (
    <Provider theme={theme} colorSchemeManager={manager}>
      {children}
    </Provider>
  );
}
