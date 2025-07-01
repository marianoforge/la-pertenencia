import { ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles from design spec
          "inline-flex items-center justify-center",
          "w-[285px] h-[52px]", // width: 285px, height: 52px
          "rounded-[2px]", // border-radius: 2px
          "border-[0.5px]", // border-width: 0.5px
          "px-12 py-4", // padding: 16px 48px
          "gap-[10px]", // gap: 10px
          "text-button", // Typography class we created
          "transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",

          // Variant styles
          variant === "default" && [
            "bg-dorado-light", // background: #FEC85B
            "border-negro-base", // border: 0.5px solid #111111
            "text-negro-base",
            "hover:bg-dorado-dark hover:border-dorado-dark hover:text-blanco-puro",
            "active:scale-95",
          ],
          variant === "outline" && [
            "bg-transparent",
            "border-dorado-light",
            "text-dorado-light",
            "hover:bg-dorado-light hover:text-negro-base",
          ],
          variant === "ghost" && [
            "bg-transparent",
            "border-transparent",
            "text-foreground",
            "hover:bg-secondary",
          ],

          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, type ButtonProps };
