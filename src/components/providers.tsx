"use client";
import { NextUIProvider } from "@nextui-org/react";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Theme>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <NextUIProvider>{children}</NextUIProvider>
      </NextThemesProvider>
    </Theme>
  );
}
