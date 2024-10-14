import { cn } from "@/lib/utils";

export const ComponentWrapper = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "relative flex flex-col flex-1 justify-between items-center w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};