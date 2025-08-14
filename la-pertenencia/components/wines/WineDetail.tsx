import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Wine } from "@/types/wine";
import { useCartStore } from "@/stores/useCartStore";

interface WineDetailProps {
  wine: Wine;
  onAddToCart?: (wine: Wine, quantity: number) => void;
}

const WineDetail = ({ wine, onAddToCart }: WineDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { addItem } = useCartStore();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // TODO: Implementar lógica de búsqueda desde página de detalle si es necesario
  };

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

  // Calculate discount percentage (mockup for now)
  const originalPrice = Math.round(wine.price * 1.25); // Simulated original price
  const discountPercentage = Math.round(
    ((originalPrice - wine.price) / originalPrice) * 100,
  );

  return (
    <>
      {/* Breadcrumb and Search Bar */}
      <div className="w-full mx-auto md:px-2 lg:px-2 bg-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-[5px] rounded-sm overflow-hidden">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="text-black text-sm md:text-base font-normal font-['Lora'] tracking-wide max-[480px]:hidden"
          >
            <ol className="flex items-center space-x-2">
              <li>
                <Link
                  className="hover:text-amber-600 transition-colors"
                  href="/"
                >
                  Inicio
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link
                  className="hover:text-amber-600 transition-colors"
                  href="/vinos"
                >
                  Vinos
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li aria-current="page" className="text-gray-600">
                {wine.winery} {wine.marca}
              </li>
            </ol>
          </nav>

          {/* Search Input */}
          <div className="w-full sm:w-72 pl-3 pr-2.5 py-2.5 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-between items-center">
            <input
              className="flex-1 outline-none text-black text-sm md:text-base font-normal font-['Lora'] tracking-wide bg-transparent"
              placeholder="Buscar vinos..."
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="w-5 h-5 relative overflow-hidden flex-shrink-0">
              <div className="w-[0.70px] h-[0.56px] left-[10.06px] top-[19.29px] absolute" />
              <div className="w-4 h-4 left-[1.67px] top-[1.67px] absolute">
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.33"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1300px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 md:px-6 lg:px-8 lg:pl-0 py-8">
          {/* Left Column - Wine Image */}
          <div className="w-full lg:w-1/2 xl:w-3/5">
            <div
              className="relative rounded-lg p-8 md:p-12 flex items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/images/wine-bg.png')",
              }}
            >
              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <div
                  className="absolute top-4 right-4 w-16 h-16 flex items-center justify-center text-black text-base font-bold font-['Lora'] z-10"
                  style={{
                    backgroundImage: "url('/images/star-discount.svg')",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  -{discountPercentage}%
                </div>
              )}

              <Image
                priority
                alt={`${wine.marca} - ${wine.winery} ${wine.vintage}`}
                className="max-w-full max-h-full object-contain relative z-10"
                height={400}
                src={imageUrl}
                width={300}
              />
            </div>
          </div>

          {/* Right Column - Wine Information */}
          <div className="w-full lg:w-1/2 xl:w-3/5 flex flex-col gap-6">
            <div className="self-stretch inline-flex flex-col justify-start items-start gap-5">
              <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch justify-start text-neutral-900 text-xl font-semibold font-['Lora'] uppercase tracking-[8px]">
                  {wine.winery} {wine.marca}
                </div>
                <div className="self-stretch justify-start text-yellow-700 text-xl font-medium font-['Lora'] tracking-[5px]">
                  {wine.tipo}
                </div>
              </div>
              <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
              <div className="pb-[5px] flex flex-col justify-start items-start gap-[5px]">
                <div className="h-12 pb-[5px] inline-flex justify-start items-center gap-5">
                  <div className="text-center justify-start text-neutral-900 text-3xl font-medium font-['Lora'] tracking-wider">
                    $ {wine.price.toLocaleString()}
                  </div>
                  <div className="w-6 h-0 origin-center rotate-90 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400 self-center" />
                  <div className="text-center justify-start text-neutral-400 text-xl font-medium font-['Lora'] line-through tracking-wide self-center">
                    $ {Math.round(wine.price * 1.2).toLocaleString()}
                  </div>
                </div>
                <div className="px-4 py-2.5 outline outline-1 outline-offset-[-1px] outline-lime-700 inline-flex justify-start items-center gap-5 mt-1">
                  <div className="text-center justify-start text-lime-700 text-base font-normal font-['Lora'] leading-normal tracking-wide">
                    10% descuento extra por transferencia bancaria
                  </div>
                </div>
              </div>
              <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
              <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                <div className="text-center justify-start text-neutral-900 text-base font-semibold font-['Lora'] tracking-wide">
                  Stock Disponible:
                </div>
                <div className="text-center justify-start text-neutral-900 text-base font-normal font-['Lora'] tracking-wide">
                  {wine.stock} unidades
                </div>
              </div>
              <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
            </div>
            <div className="self-stretch flex-1 flex flex-col justify-end items-start gap-2.5">
              <div className="w-64 py-2 inline-flex justify-center items-center gap-4">
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
                className="max-[480px]:w-full w-64 max-[380px]:px-4 pl-12 pr-10 py-2 bg-neutral-900 rounded-sm outline outline-[0.50px] outline-offset-[-0.50px] outline-amber-300 inline-flex justify-center items-center gap-4 cursor-pointer hover:bg-neutral-800 transition-colors disabled:opacity-50"
                data-property-1="Default"
                disabled={wine.stock === 0}
                onClick={handleAddToCart}
              >
                <div className="justify-start text-amber-300 text-base font-medium font-['Lora'] uppercase max-[380px]:tracking-[4px] tracking-[8px]">
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
        </div>

        <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
        <div className="self-stretch py-5 inline-flex flex-col justify-start items-start gap-5">
          <div className="self-stretch pb-2.5 flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch pb-[5px] inline-flex justify-center items-center gap-2.5">
              <div className="w-[1300px] justify-start text-yellow-700 text-xl font-medium font-['Lora'] uppercase tracking-[5px]">
                descripción
              </div>
            </div>
            <div className="self-stretch justify-start text-neutral-900 text-base font-normal font-['Lora'] tracking-wide">
              {wine.description}
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch pb-[5px] inline-flex justify-center items-center gap-2.5">
              <div className="w-[1300px] justify-start text-yellow-700 text-xl font-medium font-['Lora'] uppercase tracking-[5px]">
                características
              </div>
            </div>
            <div className="self-stretch pb-[5px] inline-flex justify-start items-start gap-2.5">
              <div className="justify-start text-neutral-900 text-base font-semibold font-['Lora'] tracking-wide">
                Bodega:
              </div>
              <div className="text-center justify-start text-neutral-900 text-base font-normal font-['Lora'] tracking-wide">
                {wine.winery}
              </div>
            </div>
            <div className="self-stretch pb-[5px] inline-flex justify-start items-start gap-2.5">
              <div className="justify-start text-neutral-900 text-base font-semibold font-['Lora'] tracking-wide">
                Marca:
              </div>
              <div className="text-center justify-start text-neutral-900 text-base font-normal font-['Lora'] tracking-wide">
                {wine.marca}
              </div>
            </div>
            <div className="self-stretch pb-[5px] inline-flex justify-start items-start gap-2.5">
              <div className="justify-start text-neutral-900 text-base font-semibold font-['Lora'] tracking-wide">
                Tipo:
              </div>
              <div className="text-center justify-start text-neutral-900 text-base font-normal font-['Lora'] tracking-wide">
                {wine.tipo}
              </div>
            </div>
            <div className="self-stretch pb-[5px] inline-flex justify-start items-start gap-2.5">
              <div className="justify-start text-neutral-900 text-base font-semibold font-['Lora'] tracking-wide">
                Varietal:
              </div>
              <div className="text-center justify-start text-neutral-900 text-base font-normal font-['Lora'] tracking-wide">
                {wine.varietal}
              </div>
            </div>
            <div className="self-stretch pb-[5px] inline-flex justify-start items-start gap-2.5">
              <div className="justify-start text-neutral-900 text-base font-semibold font-['Lora'] tracking-wide">
                Región:
              </div>
              <div className="text-center justify-start text-neutral-900 text-base font-normal font-['Lora'] tracking-wide">
                {wine.region}
              </div>
            </div>
            <div className="self-stretch pb-[5px] inline-flex justify-start items-start gap-2.5">
              <div className="justify-start text-neutral-900 text-base font-semibold font-['Lora'] tracking-wide">
                Maridaje:
              </div>
              <div className="flex-1 justify-start text-neutral-900 text-base font-normal font-['Lora'] tracking-wide">
                {wine.maridaje}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WineDetail;
