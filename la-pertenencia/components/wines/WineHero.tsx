import { useState } from "react";
import Image from "next/image";

import { Wine } from "@/types/wine";
import { useCartStore } from "@/stores/useCartStore";

interface WineHeroProps {
  featuredWine?: Wine;
  onAddToCart?: (wine: Wine, quantity: number) => void;
}

const WineHero = ({ featuredWine, onAddToCart }: WineHeroProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  // Usar vino por defecto si no se proporciona uno
  const defaultWine: Wine = {
    id: "hero-wine",
    marca: "La Pertenencia",
    bodega: "Bodega La Pertenencia",
    tipo: "Tinto",
    varietal: "Malbec",
    maridaje:
      "Armoniza con todo tipo de carnes en diferentes cocciones, bondiola braseada, diversos tipos de risottos.",
    description:
      "Un Malbec que equilibra fruta, elegancia y un legado único...",
    price: 15300,
    cost: 7500,
    iva: 21,
    stock: 25,
    region: "Mendoza",
    vintage: 2021,
    alcohol: 14.5,
    image: "/images/botellaHeroVinos.png",
    featured: true,
    winery: "La Pertenencia",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  };

  const wine = featuredWine || defaultWine;

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

  const formatPrice = (price: number) => {
    return price.toLocaleString("es-AR");
  };

  return (
    <div className="w-[1300px] h-[400px] relative bg-neutral-900 flex flex-col mx-auto overflow-hidden mt-6 rounded-lg">
      <div className="relative">
        <div data-aos="fade-up" data-aos-delay="100">
          <Image
            alt="Back Hero Inside"
            className="absolute w-[620px] h-[361px] bg-neutral-900 rounded-sm top-5 left-8 z-10"
            height={361}
            src="/images/back2HeroVinos.png"
            width={620}
          />
        </div>
        <div data-aos="zoom-in" data-aos-delay="300">
          <Image
            alt="Botella Vinos"
            className="absolute rounded-sm top-8 left-20 z-10"
            height={340}
            src="/images/botellaHeroVinos.png"
            width={165}
          />
        </div>

        {/* Wine Information Card */}
        {/* <div className="absolute top-8 left-[280px] z-20 px-7 py-5 inline-flex flex-col justify-center items-center gap-1 bg-opacity-95 rounded-lg">
          <div className="self-stretch pb-2.5 flex flex-col justify-start items-start gap-1">
            <div className="self-stretch text-center justify-start text-black text-base font-semibold font-['Lora'] uppercase tracking-[4px]">
              {wine.marca}
            </div>
            <div className="self-stretch text-center justify-start text-yellow-700 text-base font-medium font-['Lora'] tracking-[4px]">
              {wine.tipo}
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-yellow-700" />
          <div className="self-stretch py-[5px] inline-flex justify-center items-center gap-2.5">
            <div className="w-64 text-center justify-start text-black text-3xl font-medium font-['Lora'] tracking-wider">
              $ {formatPrice(wine.price)}
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-yellow-700" />
          <div className="self-stretch py-[5px] inline-flex justify-center items-center gap-2.5">
            <div className="w-64 text-center justify-start text-black text-base font-normal font-['Lora'] leading-normal tracking-wide line-clamp-2">
              {wine.description}
            </div>
          </div>
          <div className="self-stretch pt-4 pb-2 inline-flex justify-center items-center gap-4">
            <div className="flex-1 h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-yellow-700" />
            <div className="flex justify-center items-center gap-2.5">
              <button
                className="w-7 h-7 px-3 py-1.5 bg-neutral-900 rounded-[3px] outline outline-[0.50px] outline-offset-[-0.50px] outline-amber-300 flex justify-center items-center gap-16 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800"
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
                className="w-7 h-7 px-3 py-1.5 bg-neutral-900 rounded-[3px] outline outline-[0.50px] outline-offset-[-0.50px] outline-amber-300 flex justify-center items-center gap-16 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800"
                disabled={quantity >= wine.stock}
                onClick={increaseQuantity}
              >
                <div className="justify-start text-amber-300 text-base font-bold font-['Lora']">
                  +
                </div>
              </button>
            </div>
            <div className="flex-1 h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-yellow-700" />
          </div>
          <button
            className="w-64 pl-12 pr-10 py-2 bg-neutral-900 rounded-sm outline outline-[0.50px] outline-offset-[-0.50px] outline-amber-300 inline-flex justify-center items-center gap-4 hover:bg-neutral-800 transition-colors"
            onClick={handleAddToCart}
          >
            <div className="justify-start text-amber-300 text-base font-medium font-['Lora'] uppercase tracking-[8px]">
              agregar
            </div>
            <div className="w-8 h-8 relative rounded-sm">
              <div className="w-[2.48px] h-[2.48px] left-[11.96px] top-[20.94px] absolute bg-amber-300" />
              <div className="w-[2.48px] h-[2.48px] left-[19.92px] top-[20.94px] absolute bg-amber-300" />
              <div className="w-4 h-3 left-[7px] top-[7.50px] absolute bg-amber-300" />
            </div>
          </button>
        </div> */}
        <div 
          data-aos="fade-left"
          data-aos-delay="500"
          className="absolute top-16 left-[280px] z-20 self-stretch px-7 py-5 inline-flex flex-col justify-center items-center gap-1"
        >
          <div className="self-stretch pb-2.5 flex flex-col justify-start items-start gap-4">
            <div className="self-stretch text-center justify-start text-black text-xl font-semibold font-['Lora'] uppercase tracking-[5px]">
              la pertenencia
            </div>
            <div className="self-stretch text-center justify-start text-yellow-700 text-base font-medium font-['Lora'] tracking-[4px]">
              Malbec
            </div>
          </div>
          <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-yellow-700" />
          <div className="self-stretch bg-amber-300 inline-flex justify-center items-center gap-2.5 ">
            <button className="w-64 h-8 text-center justify-center items-center text-black font-medium font-['Lora'] tracking-wide">
              PROXIMAMENTE
            </button>
          </div>
          <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-yellow-700" />
          <div className="self-stretch py-[5px] inline-flex justify-center items-center gap-2.5 mt-4">
            <div className="w-64 text-center justify-start text-black text-base font-normal font-['Lora'] italic leading-normal tracking-wide">
              Un Malbec que equilibra fruta, elegancia y un legado único...
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end items-end">
        <Image
          alt="Back Hero"
          height={646}
          src="/images/backHeroVinos.png"
          width={1149}
        />
      </div>
    </div>
  );
};

export default WineHero;
