"use client";
import { NavLinks, NavLinksMobile } from "@components/nav-links";
import Header from "@components/header";
import Generics from "@components/ui/generics";
import { Spinner } from "@nextui-org/react";
import Footer from "@components/footer";
import dynamic from "next/dynamic";
import { Gear, GearGroup } from "@/components/ui/fonesa-icons";

const ThemeButton = dynamic(() => import("@components/ui/theme-button"), {
  ssr: false,
  loading: () => (
    <Generics.Button
      className="min-w-8 px-2 aspect-square dark:text-slate-100"
      aria-label="Trocar para tema claro ou escuro"
      color="default"
      disabled
    >
      <Spinner size="md" color="primary" />
    </Generics.Button>
  ),
});

const HeaderLast = () => (
  <>
    <ThemeButton />
    <NavLinksMobile />
  </>
);

export default function Index() {
  return (
    <div className="relative flex flex-col transition-background overflow-hidden duration-[50ms] bg-[#f2f2f2] dark:bg-[#191919] max-w-[100svw] min-h-dvh">
      <Header last={<HeaderLast />} changeColors>
        <NavLinks changeColors />
      </Header>
      <div className="flex flex-1 justify-center items-center gap-4 row sm:p-0 sm:pt-0 h-dvh w-full">
        <div className="z-10 container mx-auto mb-20 flex flex-1 flex-col justify-center items-center gap-2 p-[60px] px-0 h-full w-full sm:rounded-lg">
          <GearGroup className="w-[198px] h-[164px]" />
          <h2 className="transition-colors font-semibold text-xl">Não encontrado</h2>
          <p className="transition-colors">Parece que esta pagina não existe</p>
        </div>
        <Gear className="absolute order-first -bottom-56 -right-56 text-[#e0e0e0] dark:text-[#2f2f2f] w-[622px] h-[622px]" />
      </div>
      <Footer className="absolute bottom-0" />
    </div>
  );
}
