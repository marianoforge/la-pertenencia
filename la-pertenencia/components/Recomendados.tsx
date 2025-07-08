import { useState, useEffect } from "react";

import WineCard from "./wines/WineCard";
import { Section, SectionHeader, Button } from "./ui";

import { useWines } from "@/hooks/useWines";
import { Wine } from "@/types/wine";

const Recomendados = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [winesPerPage, setWinesPerPage] = useState(1);
  const { data: wines, isLoading, error } = useWines();

  // Filtrar solo vinos destacados para la sección de recomendados
  const featuredWines = wines?.filter((wine) => wine.featured) || [];

  // Si no hay vinos destacados, usar todos los vinos
  const displayWines = featuredWines.length > 0 ? featuredWines : wines || [];

  // Hook para detectar el tamaño de pantalla y calcular vinos por página
  useEffect(() => {
    const updateWinesPerPage = () => {
      if (window.innerWidth >= 1280) {
        // 1280px+: 3 vinos por página (2 páginas)
        setWinesPerPage(3);
      } else if (window.innerWidth >= 900) {
        // 900-1279px: 2 vinos por página (3 páginas)
        setWinesPerPage(2);
      } else if (window.innerWidth >= 600) {
        // 600-899px: 1 vino por página (6 páginas)
        setWinesPerPage(1);
      } else {
        // 300-599px: 1 vino por página (6 páginas)
        setWinesPerPage(1);
      }
    };

    updateWinesPerPage();
    window.addEventListener("resize", updateWinesPerPage);

    return () => window.removeEventListener("resize", updateWinesPerPage);
  }, []);

  // Calcular el total de páginas basado en el tamaño de pantalla actual
  const totalPages = Math.ceil(displayWines.length / winesPerPage);

  // Resetear página actual si excede el total de páginas
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [totalPages, currentPage]);

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
    <Section id="recomendados" variant="default">
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

        {/* Tablet: 1 wine */}
        <div className="hidden sm:block md:hidden lg:hidden px-4 sm:px-8">
          <div className="pt-5 pb-2.5">
            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {displayWines
                .slice(currentPage * 1, currentPage * 1 + 1)
                .map((wine, index) => (
                  <div key={wine.id} className="flex justify-center">
                    <WineCard
                      index={currentPage * 1 + index}
                      wine={wine}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Laptop: 2 wines */}
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

      {/* Indicadores de página (puntos) - Solo mostrar si hay más de 1 página */}
      {totalPages > 1 && (
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
      )}

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
