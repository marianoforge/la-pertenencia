import React from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}) => {
  return (
    <div
      className={cn(
        "w-[1300px] flex flex-col justify-start items-center gap-2.5",
        className,
      )}
    >
      <div
        className={cn(
          "self-stretch text-center justify-start text-yellow-700 text-xl font-medium font-['Lora'] uppercase tracking-[10px]",
          titleClassName,
        )}
      >
        {title}
      </div>
      <div
        className={cn(
          "self-stretch text-center justify-start text-neutral-900 text-4xl font-medium font-['Lora'] tracking-[10px]",
          subtitleClassName,
        )}
      >
        {subtitle}
      </div>
    </div>
  );
};

export { SectionHeader };
export type { SectionHeaderProps };
