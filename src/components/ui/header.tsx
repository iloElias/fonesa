import Fonesa from "@components/ui/fonesa";

export interface HeaderProps {
  logo?: React.ReactNode;
  children?: React.ReactNode;
  last?: React.ReactNode;
}

export default function Header({ logo, children, last }: HeaderProps) {
  return (
    <header className="fixed top-0 z-10 w-full p-4 flex row items-center justify-between">
      <div className="w-full flex justify-start items-center text-slate-950 dark:text-slate-50">
        <Fonesa.Icon className="text-current w-8 h-8" />
        {logo ? logo : <Fonesa.Logo className="text-current h-6 hidden sm:block" />}
      </div>
      <div className="w-full flex sm:justify-center justify-end items-center gap-4 text-slate-950 dark:text-slate-50">
        {children ? children : null}
      </div>
      <div className="w-full sm:block justify-end items-center hidden">
        {last ? last : null}
      </div>
    </header>
  );
}
