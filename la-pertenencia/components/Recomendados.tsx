import { useState } from "react";

import WineCard from "./wines/WineCard";

import { useWines } from "@/hooks/useWines";
import { Wine } from "@/types/wine";

type Props = {};

const Recomendados = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: wines, isLoading, error } = useWines();

  // Filtrar solo vinos destacados para la sección de recomendados
  const featuredWines = wines?.filter((wine) => wine.featured) || [];

  // Si no hay vinos destacados, usar todos los vinos
  const displayWines = featuredWines.length > 0 ? featuredWines : wines || [];

  const winesPerPage = 3;
  const totalPages = Math.ceil(displayWines.length / winesPerPage);

  // Obtener vinos para la página actual
  const currentWines = displayWines.slice(
    currentPage * winesPerPage,
    (currentPage + 1) * winesPerPage,
  );

  const handleAddToCart = (wine: Wine, quantity: number) => {
    // TODO: Implementar lógica del carrito
    console.log(`Adding ${quantity} of ${wine.name} to cart`);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const positions = ["left-0", "left-[450px]", "left-[900px]"];

  if (isLoading) {
    return (
      <div className="w-full bg-white self-stretch py-24 inline-flex flex-col justify-start items-center gap-2.5 overflow-hidden">
        <div className="text-center">Cargando vinos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white self-stretch py-24 inline-flex flex-col justify-start items-center gap-2.5 overflow-hidden">
        <div className="text-center text-red-600">
          Error al cargar los vinos
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white self-stretch py-24 inline-flex flex-col justify-start items-center gap-2.5 overflow-hidden">
      <div className="w-[1300px] flex flex-col justify-start items-center gap-2.5">
        <div className="self-stretch text-center justify-start text-yellow-700 text-xl font-medium font-['Lora'] uppercase tracking-[10px]">
          vinos recomendados
        </div>
        <div className="self-stretch text-center justify-start text-neutral-900 text-4xl font-medium font-['Lora'] tracking-[10px]">
          Elegidos con el Corazón
        </div>
      </div>

      <div className="w-[1300px] h-96 relative">
        {currentWines.map((wine, index) => (
          <div
            key={wine.id}
            className={`${positions[index]} top-[40px] absolute`}
          >
            <WineCard index={index} wine={wine} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>

      {/* Indicadores de página (puntos) */}
      <div className="flex justify-center items-center gap-6 mt-20">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            aria-label={`Go to page ${index + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentPage ? "bg-neutral-900" : "bg-neutral-400"
            }`}
            onClick={() => goToPage(index)}
          />
        ))}
      </div>

      <div className="w-[1300px] pt-7 flex flex-col justify-center items-center gap-10">
        <div className="self-stretch text-center justify-start text-neutral-900 text-xl font-normal font-['Lora'] leading-loose tracking-wide">
          Descubrimos etiquetas únicas que quizás todavía no hayas probado.
          <br />
          Nuestro deseo es simple: que cada vino te sorprenda, te emocione y te
          revele algo distinto. Todo comienza al abrir una botella.
        </div>
        <button
          className="px-12 py-4 bg-amber-300 rounded-sm outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-900 inline-flex justify-center items-center gap-2.5 hover:bg-amber-400 transition-colors"
          data-property-1="Default"
        >
          <div className="justify-start text-neutral-900 text-base font-medium font-['Lora'] uppercase tracking-[8px]">
            catálogo completo
          </div>
        </button>
      </div>
    </div>
  );
};

export default Recomendados;
