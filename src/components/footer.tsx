import { cn } from "@/lib/utils";

export interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <>
      <footer
        className={cn(
          "transition-colors w-full text-center border-t-2 border-[#e0e0e0] dark:border-[#2e2e2e] bg-[#f2f2f2] dark:bg-[#191919]",
          className
        )}
      >
        <div className="w-full p-4 text-center text-surface text-[#212121] dark:text-[#fafafa]">
          Desenvolvido por Kennedy Arantes © 2024. Todos os direitos reservados
          | PGA 2
        </div>
      </footer>
    </>
  );
}
