import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

// import Generics from "../ui/generics";
// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export const NavLinks = () => {
  const router = useRouter();

  const linkClasses = (href: string) =>
    `group relative flex flex-row transition-colors duration-[50ms] items-center gap-2 ${
      router.pathname === href ? "text-[#fafafa] after:absolute after:-bottom-3 after:h-[3px] after:w-full after:bg-[#fafafa] after:rounded-t-md" : ""
    }`;

  return (
    <>
      <Link href="/" className={cn(linkClasses("/"))}>
        <span className="material-symbols-rounded">home</span>
        <strong className="group-hover:underline min-w-max">Home</strong>
      </Link>
      <span className="w-px h-6 bg-[#2e2e2e] hidden sm:block" />
      <Link href="/about" className={cn(linkClasses("/about"))}>
        <span className="material-symbols-rounded">group</span>
        <strong className="group-hover:underline min-w-max">Sobre nós</strong>
      </Link>
      <span className="w-px h-6 bg-[#2e2e2e] hidden sm:block" />
      <Link href="/contact" className={cn(linkClasses("/contact"))}>
        <span className="material-symbols-rounded">call</span>
        <strong className="group-hover:underline min-w-max">Contato</strong>
      </Link>
    </>
  );
};

export const NavLinksMobile = () => {
  return (
    <div className="sm:hidden block">
      {/* <Menu>
        <Generics.Button>
          <MenuButton className="flex flex-row justify-center items-center min-w-8 px-2 aspect-square outline-none focus:outline-none">
            <span className="material-symbols-rounded">menu</span>
          </MenuButton>
        </Generics.Button>
        <MenuItems
          anchor="bottom end"
          className="outline-none focus:outline-none translate-y-2 translate-x-1"
        >
          <Generics.Div className="flex flex-col gap-1 p-1 min-w-24">
            <MenuItem>
              <Link
                href="/"
                className="group flex flex-row transition-colors text-[#020617] dark:text-white duration-[50ms] hover:bg-slate-200 hover:dark:bg-slate-700 rounded p-1 items-center gap-2"
              >
                <span className="material-symbols-rounded">home</span>
                <strong className="group-hover:underline min-w-max">
                  Home
                </strong>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="/"
                className="group flex flex-row transition-colors text-[#020617] dark:text-white duration-[50ms] hover:bg-slate-200 hover:dark:bg-slate-700 rounded p-1 items-center gap-2"
              >
                <span className="material-symbols-rounded">group</span>
                <strong className="group-hover:underline min-w-max">
                  Sobre nós
                </strong>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="/"
                className="group flex flex-row transition-colors text-[#020617] dark:text-white duration-[50ms] hover:bg-slate-200 hover:dark:bg-slate-700 rounded p-1 items-center gap-2"
              >
                <span className="material-symbols-rounded">call</span>
                <strong className="group-hover:underline min-w-max">
                  Contato
                </strong>
              </Link>
            </MenuItem>
          </Generics.Div>
        </MenuItems>
      </Menu> */}
    </div>
  );
};
