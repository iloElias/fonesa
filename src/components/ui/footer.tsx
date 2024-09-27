import Fonesa from "@components/ui/fonesa";

export interface FooterProps {
  logo?: React.ReactNode;
  children?: React.ReactNode;
  last?: React.ReactNode;
}

export default function Footer({ logo, children, last }: FooterProps) {
  return (
    <footer className="fixed bottom-0 z-10 w-full p-4 flex row align-middle justify-between">
      <div className="w-full flex justify-start align-middle">
        <Fonesa.Icon className="h-6" />
        {logo ? logo : <Fonesa.Logo className="h-6" />}
      </div>
      <div className="w-full flex justify-center align-middle gap-4">
        {children ? children : null}
      </div>
      <div className="w-full flex justify-end align-middle">
        {last ? last : null}
      </div>
    </footer>
  );
}
