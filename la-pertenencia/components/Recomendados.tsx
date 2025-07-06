import { useState } from "react";

import WineCard from "./wines/WineCard";
import { Section, SectionHeader, Button } from "./ui";

import { useWines } from "@/hooks/useWines";
import { Wine } from "@/types/wine";

const Recomendados = () => {
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
      <Section variant="default">
        <div className="text-center">Cargando vinos...</div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section variant="default">
        <div className="text-center text-red-600">
          Error al cargar los vinos
        </div>
      </Section>
    );
  }

  return (
    <Section variant="default">
      <SectionHeader
        subtitle="Elegidos con el Corazón"
        title="vinos recomendados"
      />

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
        <Button variant="primary">catálogo completo</Button>
      </div>
    </Section>
  );
};

export default Recomendados;
