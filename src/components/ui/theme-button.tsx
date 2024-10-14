"use client";
import { useTheme } from "next-themes";
import Generics from "./generics";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <Generics.Button
      className="min-w-8 px-2 aspect-square dark:text-slate-100"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Trocar para tema claro ou escuro"
    >
      <span className="material-symbols-rounded translate-x-[1px] block dark:hidden">
        dark_mode
      </span>
      <span className="material-symbols-rounded translate-y-[1px] hidden dark:block">
        light_mode
      </span>
    </Generics.Button>
  );
}
