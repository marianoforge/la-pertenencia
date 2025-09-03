import { useState } from "react";
import Image from "next/image";

import { Wine } from "@/types/wine";
import { useCartStore } from "@/stores/useCartStore";

interface WineCardProps {
  wine: Wine;
  index?: number;
  onAddToCart?: (wine: Wine, quantity: number) => void;
}

const WineCard = ({ wine, index = 0, onAddToCart }: WineCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    // Add to cart store
    addItem(wine, quantity);

    // Reset quantity to 1 for next add
    setQuantity(1);

    // Call parent callback if provided
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

  // Usar placeholder si no hay imagen en la DB o es inválida
  const isValidImage =
    wine.image &&
    wine.image.trim() !== "" &&
    wine.image !== "/images/wine-placeholder.jpg" &&
    !wine.image.includes("placehold.co");

  const imageUrl = isValidImage ? wine.image : "/images/wine-placeholder.svg";

  return (
    <div className="w-[400px] h-[380px] bg-gradient-to-l from-gray-100 to-white/0 inline-flex justify-center items-center">
      <div className="w-[130px] h-[313px] relative">
        <Image
          alt={`${wine.marca} - ${wine.winery} ${wine.vintage}`}
          className="object-contain mt-16"
          height={313}
          priority={index === 0}
          src={imageUrl}
          width={130}
        />
      </div>
      <div className="w-56 inline-flex flex-col justify-center items-center gap-1">
        <div className="self-stretch pb-2.5 flex flex-col justify-start items-start gap-1">
          <div className="min-h-10 w-full self-stretch flex text-center items-center justify-center text-neutral-900 text-sm font-semibold font-['Lora'] uppercase tracking-[3.50px]">
            {wine.marca}
          </div>
          <div className="self-stretch text-center justify-start text-yellow-700 text-sm font-medium font-['Lora'] tracking-[3.50px]">
            {wine.tipo}
          </div>
        </div>
        <div className="self-stretch h-0 outline outline-[0.50px]  outline-[#A6A6A6]" />
        <div className="self-stretch py-[5px] inline-flex justify-center items-center gap-2.5">
          <div className="w-64 text-center justify-start text-neutral-900 text-3xl font-medium font-['Lora'] tracking-wider">
            $ {wine.price.toLocaleString()}
          </div>
        </div>
        <div className="self-stretch h-0 outline outline-[0.50px] outline-[#A6A6A6]" />
        <div className="self-stretch min-h-[50px] py-[5px] inline-flex justify-center items-center gap-2.5">
          <div className="text-center justify-start text-neutral-900 text-sm font-normal font-['Lora'] tracking-wide px-2 line-clamp-2">
            {wine.description}
          </div>
        </div>
        <div className="self-stretch pb-2 inline-flex justify-center items-center gap-4">
          <div className="flex-1 h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
          <div className="flex justify-center items-center gap-2.5">
            <button
              className="w-7 h-7 px-3 py-1.5 bg-neutral-900 rounded-[3px] outline outline-[0.50px] outline-offset-[-0.50px] outline-amber-300 flex justify-center items-center gap-16 cursor-pointer hover:bg-neutral-800 transition-colors disabled:opacity-50"
              data-property-1="Default"
              disabled={quantity <= 1}
              onClick={decreaseQuantity}
            >
              <div className="justify-start text-dorado-light text-base font-bold font-['Lora']">
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
              <div className="justify-start text-dorado-light text-base font-bold font-['Lora']">
                +
              </div>
            </button>
          </div>
          <div className="flex-1 h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
        </div>
        <button
          className="max-[480px]:w-full max-[380px]:px-4 pl-9 pr-7 py-1.5 bg-neutral-900 rounded-sm outline outline-[0.38px] outline-offset-[-0.38px] outline-amber-300 inline-flex justify-center items-center gap-3 cursor-pointer hover:bg-neutral-800 transition-colors disabled:opacity-50"
          data-property-1="Default"
          disabled={wine.stock === 0}
          onClick={handleAddToCart}
        >
          <div className="justify-start text-dorado-light text-base font-medium font-['Lora'] uppercase max-[380px]:tracking-[4px] tracking-[8px]">
            {wine.stock === 0 ? "agotado" : "agregar"}
          </div>
          <Image
            alt="Agregar al carrito"
            className="object-contain"
            height={20}
            src="/icons/Add carrito.svg"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(71%) sepia(83%) saturate(1392%) hue-rotate(4deg) brightness(103%) contrast(103%)",
            }}
            width={20}
          />
        </button>
      </div>
    </div>
  );
};

export default WineCard;
