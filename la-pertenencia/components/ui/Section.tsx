import React from "react";

import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "gray" | "full-width";
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  variant = "default",
  className,
  ...props
}) => {
  const baseStyles = "flex flex-col items-center gap-2.5 overflow-hidden";

  const variants = {
    default:
      "max-w-[1300px] mx-auto sm:px-8 md:px-16 lg:px-4  py-12 sm:py-16 md:py-20 lg:py-24 bg-white",
    gray: " sm:px-8 md:px-16 lg:px-8 xl:px-28 py-12 sm:py-16 md:py-20 lg:py-24 bg-neutral-100",
    "full-width": "py-12 sm:py-16 md:py-20 lg:py-24 bg-white",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </div>
  );
};

export { Section };
export type { SectionProps };
