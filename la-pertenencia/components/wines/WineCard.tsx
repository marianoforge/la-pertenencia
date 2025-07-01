import { useState } from "react";

import { Wine } from "@/types/wine";

interface WineCardProps {
  wine: Wine;
  index?: number;
  onAddToCart?: (wine: Wine, quantity: number) => void;
}

const WineCard = ({ wine, index = 0, onAddToCart }: WineCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(wine, quantity);
    }
  };

  const increaseQuantity = () => {
    if (quantity < wine.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Configurar imagen según índice (matching Figma)
  const getImageConfig = (index: number) => {
    if (index === 0) {
      return {
        containerClass: "w-24 h-72 relative",
        imageClass: "w-24 h-72 left-0 top-0 absolute object-cover",
        placeholder: "https://placehold.co/90x304",
      };
    } else {
      const leftOffset = index === 1 ? "left-[-17px]" : "left-[-17.10px]";
      const topOffset = index === 1 ? "top-[-2px]" : "top-[-5px]";

      return {
        containerClass: "w-24 h-72 relative",
        imageClass: `w-32 h-80 ${leftOffset} ${topOffset} absolute object-cover`,
        placeholder:
          index === 1
            ? "https://placehold.co/124x310"
            : "https://placehold.co/125x313",
      };
    }
  };

  const imageConfig = getImageConfig(index);

  // Usar placeholder si no hay imagen en la DB o es inválida
  const isValidImage =
    wine.image &&
    wine.image.trim() !== "" &&
    wine.image !== "/images/wine-placeholder.jpg" &&
    !wine.image.includes("placehold.co");

  const imageUrl = isValidImage ? wine.image : imageConfig.placeholder;

  return (
    <div className="w-[1300px] h-96 relative">
      <div className="pr-7 py-10 left-0 top-[40px] absolute bg-gradient-to-r from-white/0 to-gray-200 inline-flex justify-center items-center gap-5">
        <div className="w-24 h-72 relative">
          <img
            alt={wine.name}
            className="w-24 h-72 left-0 top-0 absolute object-cover"
            src={imageUrl}
          />
        </div>
        <div className="max-w-[240px] h-72 inline-flex flex-col justify-center items-center gap-1">
          <div className="self-stretch pb-2.5 flex flex-col justify-start items-start gap-1">
            <div className="self-stretch text-center justify-start text-neutral-900 text-base font-semibold font-['Lora'] uppercase tracking-[4px]">
              {wine.name}
            </div>
            <div className="self-stretch text-center justify-start text-yellow-700 text-base font-medium font-['Lora'] tracking-[4px]">
              {wine.category}
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
          <div className="self-stretch py-[5px] inline-flex justify-center items-center gap-2.5">
            <div className="w-64 text-center justify-start text-neutral-900 text-3xl font-medium font-['Lora'] tracking-wider">
              $ {wine.price.toLocaleString()}
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
          <div className="self-stretch py-[5px] inline-flex justify-center items-center gap-2.5">
            <div className="w-64 text-center justify-start text-neutral-900 text-base font-normal font-['Lora'] tracking-wide line-clamp-2">
              {wine.description}
            </div>
          </div>
          <div className="self-stretch pt-4 pb-2 inline-flex justify-center items-center gap-4">
            <div className="flex-1 h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
            <div className="flex justify-center items-center gap-2.5">
              <button
                className="w-7 h-7 px-3 py-1.5 bg-neutral-900 rounded-[3px] outline outline-[0.50px] outline-offset-[-0.50px] outline-amber-300 flex justify-center items-center gap-16 cursor-pointer hover:bg-neutral-800 transition-colors disabled:opacity-50"
                data-property-1="Default"
                disabled={quantity <= 1}
                onClick={decreaseQuantity}
              >
                <div className="justify-start text-amber-300 text-base font-bold font-['Lora']">
                  -
                </div>
              </button>
              <div className="w-9 h-9 px-3 py-1.5 bg-white rounded-[3px] outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-16">
                <div className="justify-start text-neutral-900 text-base font-normal font-['Lora'] tracking-wide">
                  {quantity}
                </div>
              </div>
              <button
                className="w-7 h-7 px-3 py-1.5 bg-neutral-900 rounded-[3px] outline outline-[0.50px] outline-offset-[-0.50px] outline-amber-300 flex justify-center items-center gap-16 cursor-pointer hover:bg-neutral-800 transition-colors disabled:opacity-50"
                data-property-1="Default"
                disabled={quantity >= wine.stock}
                onClick={increaseQuantity}
              >
                <div className="justify-start text-amber-300 text-base font-bold font-['Lora']">
                  +
                </div>
              </button>
            </div>
            <div className="flex-1 h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
          </div>
          <button
            className="w-64 pl-12 pr-10 py-2 bg-neutral-900 rounded-sm outline outline-[0.50px] outline-offset-[-0.50px] outline-amber-300 inline-flex justify-center items-center gap-4 cursor-pointer hover:bg-neutral-800 transition-colors disabled:opacity-50"
            data-property-1="Default"
            disabled={wine.stock === 0}
            onClick={handleAddToCart}
          >
            <div className="justify-start text-amber-300 text-base font-medium font-['Lora'] uppercase tracking-[8px]">
              {wine.stock === 0 ? "agotado" : "agregar"}
            </div>
            <div className="w-8 h-8 relative rounded-sm">
              <div className="w-[2.48px] h-[2.48px] left-[11.96px] top-[20.94px] absolute bg-amber-300" />
              <div className="w-[2.48px] h-[2.48px] left-[19.92px] top-[20.94px] absolute bg-amber-300" />
              <div className="w-4 h-3 left-[7px] top-[7.50px] absolute bg-amber-300" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WineCard;
