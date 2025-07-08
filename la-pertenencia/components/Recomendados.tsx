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

  // Responsive wines per page: 1 en mobile, 2 en tablet, 3 en desktop
  // Para calcular correctamente las páginas, usaremos el breakpoint más pequeño (mobile = 1)
  const winesPerPageMobile = 1;
  const totalPages = Math.ceil(displayWines.length / winesPerPageMobile);

  const handleAddToCart = (wine: Wine, quantity: number) => {
    // TODO: Implementar lógica del carrito
    console.log(`Adding ${quantity} of ${wine.name} to cart`);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

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

      {/* Carousel Container */}
      <div className="w-full max-w-[1300px] px-4 sm:px-0 inline-flex flex-col justify-start items-center gap-2.5 overflow-hidden">
        {/* Mobile: 1 wine */}
        <div className="block sm:hidden">
          <div className="self-stretch pt-5 pb-2.5 inline-flex justify-center items-center">
            {displayWines.length > 0 && displayWines[currentPage] && (
              <WineCard
                index={currentPage}
                wine={displayWines[currentPage]}
                onAddToCart={handleAddToCart}
              />
            )}
          </div>
        </div>

        {/* Tablet: 2 wines */}
        <div className="hidden sm:block md:hidden lg:hidden px-4 sm:px-8">
          <div className="pt-5 pb-2.5">
            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {displayWines
                .slice(currentPage * 1, currentPage * 1 + 1)
                .map((wine, index) => (
                  <div key={wine.id} className="flex justify-center">
                    <WineCard
                      index={currentPage * 2 + index}
                      wine={wine}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Laptop: 3 wines */}
        <div className="hidden md:block lg:hidden px-4 md:px-0">
          <div className="pt-5 pb-2.5">
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {displayWines
                .slice(currentPage * 2, currentPage * 2 + 2)
                .map((wine, index) => (
                  <div key={wine.id} className="flex justify-center">
                    <WineCard
                      index={currentPage * 2 + index}
                      wine={wine}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Desktop: 3 wines */}
        <div className="hidden lg:block px-4 lg:px-0">
          <div className="pt-5 pb-2.5">
            <div className="grid grid-cols-3 gap-12 xl:gap-16">
              {displayWines
                .slice(currentPage * 3, currentPage * 3 + 3)
                .map((wine, index) => (
                  <div key={wine.id} className="flex justify-center">
                    <WineCard
                      index={currentPage * 3 + index}
                      wine={wine}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Indicadores de página (puntos) */}
      <div className="flex justify-center items-center gap-3.5 mt-4">
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

      <div className="w-full max-w-[1300px] pt-2.5 flex flex-col justify-center items-center gap-7 px-4 sm:px-0 mt-3">
        <div className="text-center text-neutral-900 text-sm font-normal font-['Lora'] leading-tight tracking-wide">
          Descubrimos etiquetas únicas que quizás todavía no hayas probado.
          <br />
          Nuestro deseo es simple: que cada vino te sorprenda, te emocione y te
          revele algo distinto. Todo comienza al abrir una botella.
        </div>
        <Button size="sm" variant="primary">
          catálogo completo
        </Button>
      </div>
    </Section>
  );
};

export default Recomendados;
