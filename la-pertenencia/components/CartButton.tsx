import { Button } from "@heroui/button";

import { useCartStore } from "../stores/useCartStore";

const CartButton = () => {
  const { totalItems, toggleCart } = useCartStore();

  return (
    <div className="relative">
      <Button
        aria-label={`Carrito de compras (${totalItems} items)`}
        className="text-lg"
        size="sm"
        variant="light"
        onClick={toggleCart}
      >
        🛒
      </Button>

      {/* Badge de cantidad */}
      {totalItems > 0 && (
        <div className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
          {totalItems > 99 ? "99+" : totalItems}
        </div>
      )}
    </div>
  );
};

export default CartButton;
