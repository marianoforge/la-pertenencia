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
    default: "max-w-[1300px] mx-auto bg-white",
    gray: "bg-neutral-100",
    "full-width": "bg-white",
  };

  const getFluidStyles = (variant: string) => {
    switch (variant) {
      case "default":
        return {
          paddingLeft: "clamp(1rem, 4vw, 4rem)",
          paddingRight: "clamp(1rem, 4vw, 4rem)",
          paddingTop: "clamp(3rem, 6vw, 6rem)",
          paddingBottom: "clamp(3rem, 6vw, 6rem)",
        };
      case "gray":
        return {
          paddingLeft: "clamp(2rem, 6vw, 7rem)",
          paddingRight: "clamp(2rem, 6vw, 7rem)",
          paddingTop: "clamp(3rem, 6vw, 6rem)",
          paddingBottom: "clamp(3rem, 6vw, 6rem)",
        };
      case "full-width":
        return {
          paddingTop: "clamp(3rem, 6vw, 6rem)",
          paddingBottom: "clamp(3rem, 6vw, 6rem)",
        };
      default:
        return {};
    }
  };

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      style={getFluidStyles(variant)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Section };
export type { SectionProps };
