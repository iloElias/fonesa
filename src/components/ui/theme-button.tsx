"use client";
import { useTheme } from "next-themes";
import Generics from "./generics";
import { MoonFill, SunFill } from "./fonesa-icons";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <Generics.Button
      className="min-w-8 px-2 aspect-square dark:text-slate-100 flex justify-center items-center text-xl"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Trocar para tema claro ou escuro"
    >
      {theme === "light" ? <SunFill /> : <MoonFill />}
    </Generics.Button>
  );
}
