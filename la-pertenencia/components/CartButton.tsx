import { Button } from "@heroui/button";

import { useCartStore } from "../stores/useCartStore";

const CartButton = () => {
  const { totalItems, toggleCart } = useCartStore();

  return (
    <div className="relative">
      <Button
        aria-label={`Carrito de compras (${totalItems} items)`}
        className="text-blanco-puro hover:text-dorado-light transition-colors duration-200 min-w-0 px-3"
        size="sm"
        variant="light"
        onClick={toggleCart}
      >
        <svg
          className="text-current"
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </Button>

      {/* Badge de cantidad */}
      {totalItems > 0 && (
        <div className="absolute -top-1 -right-1 bg-dorado-light text-negro-puro text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium font-lora">
          {totalItems > 99 ? "99+" : totalItems}
        </div>
      )}
    </div>
  );
};

export default CartButton;
