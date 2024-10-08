
"use client";
import { Theme } from "@radix-ui/themes";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light">
      <Theme>
        <NextUIProvider>{children}</NextUIProvider>
      </Theme>
    </NextThemesProvider>
  );
}
