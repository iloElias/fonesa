import { cn } from "@/lib/utils";

function Div ({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex p-4 rounded-md aspect-square w-8 bg-[#fafafa] border border-[#e0e0e0]', className)}>
      {children}
    </div>
  );
}

function Button ({ className, children, onClick }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn('rounded-md aspect-square w-8 bg-[#fafafa] border border-[#e0e0e0]', className)} onClick={onClick}>
      {children}
    </button>
  );
}

function ButtonGroup ({ className, children, variant = 'horizontal' }: { className?: string, children: React.ReactNode, variant?: 'horizontal' | 'vertical' }) {
  return (
    <div className={cn(variant === 'horizontal' ? 'flex space-x-2' : 'flex flex-col space-y-2', className)}>
      {children}
    </div>
  );
}

const Generics = {Div, Button, ButtonGroup};
export default Generics;
