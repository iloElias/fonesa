import Fonesa from "@components/ui/fonesa";

export interface HeaderProps {
  logo?: React.ReactNode;
  children?: React.ReactNode;
  last?: React.ReactNode;
}

export default function Header({ logo, children, last }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 flex justify-center w-full bg-[#fefefe]/60 dark:bg-[#3c3c3c]/60 border-0 border-b-2 border-[#e0e0e0] dark:border-[#2e2e2e] backdrop-blur-sm z-50">
      <div className="transition-colors duration-[50ms] container mx-auto flex justify-between items-center p-3 m-2 my-0">
        <div className="w-full flex justify-start items-center text-slate-950 dark:text-slate-50">
          <Fonesa.Icon className="text-current w-8 h-8" />
          {logo ? (
            logo
          ) : (
            <Fonesa.Logo className="text-current h-6 block" />
          )}
        </div>
        <div className="w-full sm:flex hidden sm:justify-center justify-end items-center gap-4 text-slate-950 dark:text-slate-50">
          {children ? children : null}
        </div>
        <div className="w-full flex flex-row justify-end items-center gap-4">
          {last ? last : null}
        </div>
      </div>
    </header>
  );
}
