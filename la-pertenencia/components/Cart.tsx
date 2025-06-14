import { Button } from "@heroui/button";
import { useState } from "react";

import { useCartStore } from "../stores/useCartStore";

const Cart = () => {
  const {
    items,
    isOpen,
    totalItems,
    totalAmount,
    toggleCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simular proceso de checkout
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("¡Pedido realizado con éxito! Te contactaremos pronto.");
    clearCart();
    toggleCart();
    setIsCheckingOut(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <button
        aria-label="Cerrar carrito"
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={toggleCart}
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">
            Carrito ({totalItems} {totalItems === 1 ? "item" : "items"})
          </h2>
          <Button
            className="text-gray-500 hover:text-gray-700"
            size="sm"
            variant="light"
            onClick={toggleCart}
          >
            ✕
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-medium mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Agrega algunos vinos para comenzar
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.wine.id}
                  className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  {/* Wine Image */}
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-900 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl opacity-70">🍷</span>
                  </div>

                  {/* Wine Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm mb-1 truncate">
                      {item.wine.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {item.wine.winery} • {item.wine.vintage}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mb-2">
                      <Button
                        className="w-6 h-6 min-w-6 p-0 text-xs"
                        disabled={item.quantity <= 1}
                        size="sm"
                        variant="bordered"
                        onClick={() =>
                          updateQuantity(item.wine.id, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        className="w-6 h-6 min-w-6 p-0 text-xs"
                        disabled={item.quantity >= item.wine.stock}
                        size="sm"
                        variant="bordered"
                        onClick={() =>
                          updateQuantity(item.wine.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        $
                        {(
                          item.priceAtTimeOfAdd * item.quantity
                        ).toLocaleString()}
                      </span>
                      <Button
                        className="text-xs p-1 h-auto min-w-0"
                        color="danger"
                        size="sm"
                        variant="light"
                        onClick={() => removeItem(item.wine.id)}
                      >
                        🗑️
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total:</span>
              <span className="text-purple-600">
                ${totalAmount.toLocaleString()}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                className="w-full"
                color="primary"
                disabled={isCheckingOut}
                isLoading={isCheckingOut}
                size="lg"
                onClick={handleCheckout}
              >
                {isCheckingOut ? "Procesando..." : "Finalizar Compra"}
              </Button>

              <Button
                className="w-full"
                color="danger"
                disabled={isCheckingOut}
                variant="bordered"
                onClick={clearCart}
              >
                Vaciar Carrito
              </Button>
            </div>

            {/* Info */}
            <p className="text-xs text-center text-gray-600 dark:text-gray-400">
              Los precios incluyen IVA. Te contactaremos para coordinar la
              entrega.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
