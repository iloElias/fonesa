import { cn } from "@/lib/utils";
import {
  Button as NextButton,
  ButtonProps,
  ButtonGroup as NextButtonGroup,
  ButtonGroupProps,
} from "@nextui-org/button";
import {
  Radio as NextRadio,
  RadioProps as NextRadioProps,
} from "@nextui-org/react";
import { ReactElement } from "react";

const Div = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "transition-colors overflow-auto duration-[50ms] bg-[#fafafa] dark:bg-[#212121] border-2 border-[#e0e0e0] dark:border-[#2e2e2e] rounded-2xl",
        "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface DivisorProps {
  className?: string;
  direction?: "horizontal" | "vertical";
}

const Divisor = ({
  className,
  direction = "horizontal",
  ...props
}: DivisorProps) => {
  return (
    <span
      className={cn(
        direction === "horizontal" ? "w-full h-[2px]" : "w-[2px] h-full",
        "transition-colors duration-[50ms] border-b-2 border-b-[#e0e0e0] dark:border-b-[#2e2e2e] rounded-none shadow-none",
        className
      )}
      {...props}
    />
  );
};

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <NextButton
      className={cn(
        "flex flex-row justify-center items-center min-w-8 px-2 aspect-square",
        className
      )}
      color="primary"
      variant="solid"
      {...props}
    >
      {children}
    </NextButton>
  );
};

const ButtonGroup = ({ className, children, ...props }: ButtonGroupProps) => {
  return (
    <NextButtonGroup className={cn(className)} {...props}>
      {children}
    </NextButtonGroup>
  );
};

interface RadioProps extends NextRadioProps {
  startContent?: () => ReactElement;
}

export const Radio = ({ children, startContent, ...props }: RadioProps) => {
  return (
    <NextRadio
      classNames={{
        base: cn(
          "inline-flex transition-colors duration-[50ms] m-0 mx-0 items-center justify-between flex-row-reverse cursor-pointer rounded-xl gap-2 p-2 pl-0 max-h-[56px] max-w-full min-w-full background-transparent",
          "data-[selected=true]:bg-[#026fed]/10 hover:bg-[#026fed]/5 border-none border-[#e1e1e1] dark:border-[#2e2e2e] data-[selected=true]:border-[#026fed]"
        ),
        labelWrapper: cn("ml-0"),
        // labelWrapper: cn(""),
      }}
      {...props}
    >
      <div className="flex flex-row font-[inter] gap-2 items-center group-data-[selected=true]:text-[#5b7dfb]">
        {startContent && <div className="max-w-12 p-2 text-xl">{startContent()}</div>}
        {children}
      </div>
    </NextRadio>
  );
};

const Generics = { Div, Button, ButtonGroup, Divisor, Radio };
export default Generics;
