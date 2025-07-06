import React from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  variant?: "default" | "gray" | "full-width";
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  variant = "default",
  className,
}) => {
  const baseStyles =
    "w-full inline-flex flex-col justify-start items-center gap-2.5 overflow-hidden";

  const variants = {
    default:
      "sm:px-8 md:px-16 lg:px-20 xl:px-28 py-12 sm:py-16 md:py-20 lg:py-24 bg-white",
    gray: " sm:px-8 md:px-16 lg:px-20 xl:px-28 py-12 sm:py-16 md:py-20 lg:py-24 bg-neutral-100",
    "full-width": "py-12 sm:py-16 md:py-20 lg:py-24 bg-white",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)}>
      {children}
    </div>
  );
};

export { Section };
export type { SectionProps };
