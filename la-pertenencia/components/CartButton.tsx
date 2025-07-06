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
        <img
          alt="Carrito"
          className="w-6 h-6 object-contain"
          src="/icons/Add carrito.svg"
        />
      </button>

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
