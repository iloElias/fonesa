export interface FooterProps {
  logo?: React.ReactNode;
  children?: React.ReactNode;
  last?: React.ReactNode;
}

export default function Footer() {
  return (
    <>
      <footer className="w-full text-center border-t-2 border-[#e0e0e0] dark:border-[#2e2e2e]">
        <div className="w-full p-4 text-center text-surface text-[#212121] dark:text-[#fafafa]">
          Desenvolvido por Kennedy Arantes © 2024. Todos os direitos reservados
          | Fonesa
        </div>
      </footer>
    </>
  );
}
