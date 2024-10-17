import { cn } from "@/lib/utils";
import Fonesa from "@components/ui/fonesa";

export interface HeaderProps {
  logo?: React.ReactNode;
  children?: React.ReactNode;
  last?: React.ReactNode;
  changeColors?: boolean;
}

export default function Header({
  logo,
  children,
  last,
  changeColors = false,
}: HeaderProps) {
  return (
    <header
      className="absolute top-0 left-0 flex justify-center w-full z-50 " /* bg-[#fefefe]/60 dark:bg-[#3c3c3c]/60 border-0 border-b-2 border-[#e0e0e0] dark:border-[#2e2e2e] */
    >
      <div className="transition-colors duration-[50ms] container mx-auto flex justify-between items-center p-3 m-2 my-0">
        <div className={cn("w-full flex justify-start items-center gap-2", changeColors ? "text-[#212121] dark:text-[#fafafa]" : "text-[#fafafa]")}>
          <Fonesa.Icon className="text-current h-6" />
          {logo ? logo : <Fonesa.Logo className="text-current h-6 w-fit block" />}
        </div>
        <div className="w-full sm:flex hidden sm:justify-center justify-end items-center gap-4 sm:gap-6 text-[#e0e0e0]">
          {children ? children : null}
        </div>
        <div className="w-full flex flex-row justify-end items-center gap-4">
          {last ? last : null}
        </div>
      </div>
    </header>
  );
}
