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
    varietal: "Malbec y Cabernet Franc",
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
    <>
      {/* Desktop/Tablet Version */}
      <div className="max-[480px]:hidden w-[1300px] h-[400px] relative bg-neutral-900 flex flex-col mx-auto overflow-hidden mt-6 rounded-lg">
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
              className="absolute rounded-sm top-10 left-14 z-10"
              height={300}
              src="/images/botellaHeroVinos.png"
              width={220}
            />
          </div>

          <div
            className="absolute top-16 left-[280px] z-20 self-stretch px-7 py-2 inline-flex flex-col justify-center items-center gap-1"
            data-aos="fade-left"
            data-aos-delay="500"
          >
            <div className="self-stretch pb-2.5 flex flex-col justify-start items-start gap-4">
              <div className="self-stretch text-center justify-start text-black text-xl font-semibold font-['Lora'] uppercase tracking-[5px]">
                la pertenencia
              </div>
              <div className="self-stretch text-center justify-start text-yellow-700 text-base font-medium font-['Lora'] tracking-[4px]">
                Malbec y Cabernet Franc
              </div>
            </div>
            <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-yellow-700" />

            <div className="self-stretch py-[5px] inline-flex justify-center items-center gap-2.5 mt-4">
              <div className="w-64 text-center justify-start text-black text-base font-normal font-['Lora'] italic leading-normal tracking-wide">
                Vinos creados para quienes disfrutan cada copa como una
                experiencia única, con la esencia y pasión que nos representa.
                ¡Prepárate para descubrirlos!{" "}
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

      {/* Mobile Version */}
      <div className="min-[481px]:hidden w-full max-w-[1300px] h-96 relative bg-neutral-900 rounded-lg overflow-hidden mx-auto mt-6">
        <img
          alt="Vinos - Background Mobile"
          className="w-full h-full object-cover object-[75%_center] absolute inset-0"
          src="/images/bg-hero-mobile-vinos.png"
        />
      </div>
    </>
  );
};

export default WineHero;
