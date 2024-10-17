import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { HomeFill, PersonsFill, PhoneFill } from "./ui/fonesa-icons";

interface NavLinksProps {
  changeColors?: boolean;
}

export const NavLinks = ({ changeColors = false }: NavLinksProps) => {
  const router = useRouter();

  const linkClasses = (href: string) =>
    `group relative flex flex-row transition-colors transition-background duration-[50ms] items-center gap-2 ${
      router.pathname === href
        ? `text-[#fafafa] after:absolute after:-bottom-3 after:h-[3px] after:w-full ${changeColors ? "after:bg-[#212121] dark:after:bg-[#fafafa]" : "after:bg-[#fafafa]"} after:rounded-t-md`
        : ""
    } ${changeColors ? 'text-[#212121] dark:text-[#fafafa]' : ''}`;

  return (
    <>
      <Link href="/" className={cn(linkClasses("/"))}>
        <HomeFill className="text-xl" />
        <strong className="group-hover:underline min-w-max">Home</strong>
      </Link>
      <span className={cn("transition-colors w-px h-6 hidden sm:block", changeColors ? "bg-[#e0e0e0] dark:bg-[#2e2e2e]": "bg-[#2e2e2e]")} />
      <Link href="/about" className={cn(linkClasses("/about"))}>
        <PersonsFill className="text-xl" />
        <strong className="group-hover:underline min-w-max">Sobre nós</strong>
      </Link>
      <span className={cn("transition-colors w-px h-6 hidden sm:block", changeColors ? "bg-[#e0e0e0] dark:bg-[#2e2e2e]": "bg-[#2e2e2e]")} />
      <Link href="/contact" className={cn(linkClasses("/contact"))}>
        <PhoneFill className="text-xl" />
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
