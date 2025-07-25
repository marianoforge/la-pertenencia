import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { Wine } from "@/types/wine";
import { useCartStore } from "@/stores/useCartStore";

interface WineGridCardProps {
  wine: Wine;
  onAddToCart?: (wine: Wine, quantity: number) => void;
}

const WineGridCard = ({ wine, onAddToCart }: WineGridCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click navigation
    
    // Add to cart store
    addItem(wine, quantity);

    // Reset quantity to 1 for next add
    setQuantity(1);

    // Call parent callback if provided
    if (onAddToCart) {
      onAddToCart(wine, quantity);
    }
  };

  const handleCardClick = () => {
    router.push(`/vinos/${wine.id}`);
  };

  const increaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click navigation
    if (quantity < wine.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click navigation
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
    <div 
      className="w-full max-w-[280px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      {/* Wine Image */}
      <div className="w-full h-48 md:h-56 lg:h-64 bg-gradient-to-l from-white to-zinc-100/50 flex items-center justify-center relative">
        <Image
          alt={`${wine.marca} - ${wine.winery} ${wine.vintage}`}
          className="max-w-full max-h-full object-contain"
          height={200}
          priority={false}
          src={imageUrl}
          width={200}
        />
      </div>

      {/* Wine Details */}
      <div className="p-3 md:p-4">
        {/* Wine Name */}
        <div className="text-center mb-2">
          <h3 className="text-xs md:text-sm font-semibold font-['Lora'] uppercase tracking-[2px] md:tracking-[3.50px] text-neutral-900 min-h-[36px] md:min-h-[48px] flex items-center justify-center leading-tight">
            {wine.marca}
          </h3>
        </div>

        {/* Wine Category */}
        <div className="text-center mb-3 md:mb-4">
          <p className="text-xs md:text-sm font-medium font-['Lora'] tracking-[2px] md:tracking-[3.50px] text-yellow-700">
            {wine.tipo}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-0 border-b border-neutral-400 mb-3 md:mb-4" />

        {/* Price */}
        <div className="text-center mb-3 md:mb-4">
          <span className="text-xl md:text-2xl lg:text-3xl font-medium font-['Lora'] tracking-wider text-neutral-900">
            $ {wine.price.toLocaleString()}
          </span>
        </div>

        {/* Divider */}
        <div className="w-full h-0 border-b border-neutral-400 mb-4 md:mb-4" />

        {/* Description */}
        <div className="min-h-16 max-h-16 text-center mb-4 md:mb-6">
          <p className="text-xs md:text-sm font-normal font-['Lora'] tracking-wide text-neutral-900 line-clamp-3 leading-relaxed">
            {wine.description}
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="flex justify-center items-center gap-2 md:gap-4 mb-3 md:mb-4">
          <div className="flex-1 h-0 border-b border-neutral-400" />
          <div className="flex justify-center items-center gap-1.5 md:gap-2.5">
            <button
              className="w-6 h-6 md:w-7 md:h-7 bg-neutral-900 rounded-[3px] border border-amber-300 flex justify-center items-center cursor-pointer hover:bg-neutral-800 transition-colors disabled:opacity-50"
              disabled={quantity <= 1}
              onClick={decreaseQuantity}
            >
              <span className="text-amber-300 text-sm md:text-base font-bold font-['Lora']">
                -
              </span>
            </button>
            <div className="w-8 h-8 md:w-9 md:h-9 bg-white rounded-[3px] border border-neutral-400 flex justify-center items-center">
              <span className="text-neutral-900 text-sm md:text-base font-normal font-['Lora'] tracking-wide">
                {quantity}
              </span>
            </div>
            <button
              className="w-6 h-6 md:w-7 md:h-7 bg-neutral-900 rounded-[3px] border border-amber-300 flex justify-center items-center cursor-pointer hover:bg-neutral-800 transition-colors disabled:opacity-50"
              disabled={quantity >= wine.stock}
              onClick={increaseQuantity}
            >
              <span className="text-amber-300 text-sm md:text-base font-bold font-['Lora']">
                +
              </span>
            </button>
          </div>
          <div className="flex-1 h-0 border-b border-neutral-400" />
        </div>

        {/* Add to Cart Button */}
        <button
          className="w-full px-3 md:px-4 py-2 bg-neutral-900 rounded-sm border border-amber-300 flex justify-center items-center gap-2 md:gap-3 cursor-pointer hover:bg-neutral-800 transition-colors disabled:opacity-50"
          disabled={wine.stock === 0}
          onClick={handleAddToCart}
        >
          <span className="text-amber-300 text-xs md:text-base font-medium font-['Lora'] uppercase tracking-[4px] md:tracking-[8px]">
            {wine.stock === 0 ? "agotado" : "agregar"}
          </span>
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

export default WineGridCard;
