import React, { useState } from "react";

import { QuantitySelector } from "./QuantitySelector";
import { Combo } from "@/types/combo";
import { cn } from "@/lib/utils";

interface ComboCardProps {
  combo: Combo;
  onAddToCart?: (combo: Combo, quantity: number) => void;
  className?: string;
}

const ComboCard: React.FC<ComboCardProps> = ({
  combo,
  onAddToCart,
  className,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(combo, quantity);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("ARS", "$");
  };

  return (
    <div
      className={cn(
        // Base styles
        "relative bg-white rounded-[3px] overflow-hidden",
        // Mobile: Stack vertically, fluid width
        "flex flex-col gap-3 p-3 w-full h-[560px]",
        // Tablet: Horizontal layout with fixed height
        "sm:flex-row sm:gap-5 sm:pl-3.5 sm:pr-5 sm:py-5 sm:w-auto sm:h-[420px]",
        // Desktop: Full Figma design
        "lg:inline-flex lg:justify-center lg:items-center lg:h-auto",
        className
      )}
    >
      {/* Background Image - Covers entire card */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={combo.backgroundImage}
          alt="Combo background"
        />
      </div>

      {/* Wine Bottles - Single Image with All Three Wines */}
      <div className="flex justify-center items-end relative z-10 h-44 sm:flex-none sm:w-1/2 sm:h-auto lg:h-80">
        <img
          className="w-auto h-40 sm:w-80 sm:h-auto lg:w-84 lg:h-72 object-contain object-bottom"
          src={combo.image}
          alt={combo.name}
        />
      </div>

      {/* Info Panel */}
      <div className="p-3 sm:p-5 bg-white/70 inline-flex flex-col justify-center items-center gap-1 relative z-10 sm:flex-1 overflow-y-auto">
        {/* Title */}
        <div className="self-stretch pb-2.5 flex flex-col justify-start items-start gap-1">
          <div className="self-stretch text-center justify-start text-black text-sm sm:text-base font-semibold font-['Lora'] uppercase tracking-[2px] sm:tracking-[4px]">
            {combo.name}
          </div>
        </div>

        {/* Divider */}
        <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-yellow-700" />

        {/* Description */}
        <div className="self-stretch py-[5px] inline-flex justify-center items-center gap-2.5">
          <div className="flex-1 justify-start text-black text-sm sm:text-base font-normal font-['Lora'] leading-normal tracking-wide">
            {combo.description.map((line, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-yellow-700 font-bold">•</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-yellow-700" />

        {/* Price */}
        <div className="self-stretch py-[5px] inline-flex justify-center items-center gap-2.5">
          <div className="w-full sm:w-64 text-center justify-start text-black text-xl sm:text-2xl lg:text-3xl font-medium font-['Lora'] tracking-wider">
            {formatPrice(combo.price)}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="self-stretch py-2 inline-flex justify-center items-center gap-4">
          <div className="flex-1 h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-yellow-700" />
          <QuantitySelector value={quantity} onChange={setQuantity} />
          <div className="flex-1 h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-yellow-700" />
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="self-stretch px-6 sm:pl-12 sm:pr-10 py-2 bg-neutral-900 rounded-sm outline outline-[0.50px] outline-offset-[-0.50px] outline-amber-300 inline-flex justify-center items-center gap-2 sm:gap-4 hover:bg-neutral-800 transition-colors"
        >
          <div className="justify-start text-amber-300 text-sm sm:text-base font-medium font-['Lora'] uppercase tracking-[4px] sm:tracking-[8px]">
            agregar
          </div>
          <div className="w-6 h-6 sm:w-8 sm:h-8 relative rounded-sm flex items-center justify-center">
            {/* Cart Icon - Using project's existing icon */}
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.90847 16.498C7.58873 16.498 8.14019 15.9465 8.14019 15.2662C8.14019 14.586 7.58873 14.0345 6.90847 14.0345C6.22822 14.0345 5.67676 14.586 5.67676 15.2662C5.67676 15.9465 6.22822 16.498 6.90847 16.498Z"
                fill="#FCD34D"
              />
              <path
                d="M14.814 16.498C15.4942 16.498 16.0457 15.9465 16.0457 15.2662C16.0457 14.586 15.4942 14.0345 14.814 14.0345C14.1337 14.0345 13.5823 14.586 13.5823 15.2662C13.5823 15.9465 14.1337 16.498 14.814 16.498Z"
                fill="#FCD34D"
              />
              <path
                d="M17.994 3.76693H4.33429L3.82929 1.18031C3.8005 1.03911 3.7231 0.912478 3.61057 0.822455C3.49804 0.732431 3.35751 0.68472 3.21343 0.687625H0.75V1.91935H2.70843L5.061 12.3103C5.0898 12.4515 5.16719 12.5781 5.27972 12.6682C5.39225 12.7582 5.53278 12.8059 5.67686 12.803H16.7623V12.1562H6.05425L5.67686 10.5414H16.7623C16.9047 10.5449 17.0438 10.4989 17.1561 10.4113C17.2684 10.3238 17.3469 10.2 17.3782 10.061L18.6099 4.51828C18.6305 4.42691 18.63 4.33202 18.6085 4.24086C18.5869 4.14969 18.5448 4.06465 18.4854 3.9922C18.4261 3.91974 18.3509 3.8618 18.2658 3.82276C18.1806 3.78373 18.0877 3.76463 17.994 3.76693Z"
                fill="#FCD34D"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export { ComboCard };
export type { ComboCardProps };
