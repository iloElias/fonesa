import { cn } from "@/lib/utils";
import Image from "next/image";

interface ComponentHeaderClasses {
  wrapper?: string;
  label?: string;
  title?: string;
  subTitle?: string;
  flagUrl?: string | null;
}

interface ComponentHeaderProps {
  title: string;
  subTitle: string;
  flagUrl?: string | null;
  classNames?: ComponentHeaderClasses;
}

const ComponentHeader = ({
  title,
  subTitle,
  flagUrl,
  classNames,
}: ComponentHeaderProps) => {
  return (
    <div
      className={cn(
        "sticky top-0 flex flex-row font-[inter] justify-between items-center w-full",
        classNames?.wrapper
      )}
    >
      <div
        className={cn(
          "flex flex-1 flex-col items-start gap-2 max-w-full",
          flagUrl && "max-w-[calc(100%-90px)]",
          classNames?.label
        )}
      >
        <strong
          className={cn(
            "max-h-min max-w-full text-lg truncate",
            classNames?.title
          )}
          title={title}
        >
          {title}
        </strong>
        <p
          className={cn(
            "max-h-min max-w-full text-sm truncate",
            classNames?.title
          )}
          title={subTitle}
        >
          {subTitle}
        </p>
      </div>
      {flagUrl && (
        <Image
          src={flagUrl}
          alt="Flag"
          className={cn(
            "w-20 h-14 rounded-sm object-cover",
            classNames?.flagUrl
          )}
          height={56}
          width={140}
        />
      )}
    </div>
  );
};

export default ComponentHeader;
