import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { useState } from "react";

import { Wine } from "../types/wine";
import { useCartStore } from "../stores/useCartStore";

interface WineCardProps {
  wine: Wine;
}

const WineCard = ({ wine }: WineCardProps) => {
  const { addItem, getItemQuantity } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cartQuantity = getItemQuantity(wine.id);

  const calculateFinalPrice = () => {
    return wine.price + (wine.price * wine.iva) / 100;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tintos":
        return "bg-red-100 text-red-800";
      case "Blancos":
        return "bg-yellow-100 text-yellow-800";
      case "Rosados":
        return "bg-pink-100 text-pink-800";
      case "Espumantes":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddToCart = async () => {
    if (wine.stock === 0) return;

    setIsAdding(true);
    try {
      addItem(wine, 1);
      // Pequeña pausa para feedback visual
      await new Promise((resolve) => setTimeout(resolve, 300));
    } finally {
      setIsAdding(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="w-full max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300">
      <CardBody className="p-0">
        {/* Imagen del vino */}
        <div className="relative">
          {!imageError && wine.image ? (
            <img
              alt={wine.name}
              className="w-full h-64 object-cover"
              src={wine.image}
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-purple-900 to-purple-600 flex items-center justify-center">
              <span className="text-6xl opacity-50">🍷</span>
            </div>
          )}

          {/* Badge de destacado */}
          {wine.featured && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
              ⭐ Destacado
            </div>
          )}

          {/* Badge de categoría */}
          <div
            className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(wine.category)}`}
          >
            {wine.category}
          </div>

          {/* Badge de cantidad en carrito */}
          {cartQuantity > 0 && (
            <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              En carrito: {cartQuantity}
            </div>
          )}
        </div>

        {/* Información del vino */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {wine.name}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {wine.winery} • {wine.vintage}
          </p>

          <p
            className="text-sm text-gray-700 dark:text-gray-400 mb-3 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {wine.description}
          </p>

          {/* Información adicional */}
          <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
            <span>{wine.region}</span>
            <span>{wine.alcohol}% Vol.</span>
          </div>

          {/* Stock indicator */}
          <div className="flex items-center mb-3">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${
                wine.stock > 10
                  ? "bg-green-500"
                  : wine.stock > 0
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            />
            <span className="text-xs text-gray-600">
              {wine.stock > 10
                ? "En stock"
                : wine.stock > 0
                  ? `Últimas ${wine.stock} unidades`
                  : "Sin stock"}
            </span>
          </div>
        </div>
      </CardBody>

      <CardFooter className="flex-col items-stretch p-4 pt-0">
        {/* Precios */}
        <div className="mb-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-bold text-purple-600">
                ${calculateFinalPrice().toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 ml-1">(IVA inc.)</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Precio sin IVA</div>
              <div className="text-sm font-medium">
                ${wine.price.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <Button
            className="flex-1"
            color="primary"
            disabled={wine.stock === 0 || isAdding}
            isLoading={isAdding}
            variant={cartQuantity > 0 ? "bordered" : "solid"}
            onClick={handleAddToCart}
          >
            {isAdding
              ? "Agregando..."
              : wine.stock === 0
                ? "Sin Stock"
                : cartQuantity > 0
                  ? `Agregar otra (${cartQuantity})`
                  : "Agregar al Carrito"}
          </Button>
          <Button className="px-3" color="primary" size="md" variant="bordered">
            ❤️
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WineCard;
