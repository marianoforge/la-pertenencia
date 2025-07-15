import Image from "next/image";

import { useCartStore } from "../stores/useCartStore";

const CartButton = () => {
  const { totalItems, toggleCart } = useCartStore();

  return (
    <div className="relative">
      <button
        aria-label={`Carrito de compras (${totalItems} items)`}
        className="w-6 h-6 hover:opacity-75 transition-opacity"
        onClick={toggleCart}
      >
        <Image
          alt="Carrito de compras"
          className="object-contain"
          height={24}
          src="/icons/Add carrito.svg"
          width={24}
        />
      </button>

      {/* Badge de cantidad */}
      {totalItems > 0 && (
        <div className="absolute -top-1 -right-1 bg-amber-300 text-neutral-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium font-lora">
          {totalItems > 99 ? "99+" : totalItems}
        </div>
      )}
    </div>
  );
};

export default CartButton;
