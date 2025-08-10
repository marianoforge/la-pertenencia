import { useState, useEffect } from "react";
import Link from "next/link";

import WineCard from "./wines/WineCard";
import { Section, SectionHeader, Button } from "./ui";

import { useWines } from "@/hooks/useWines";
import { Wine } from "@/types/wine";
import { useResponsiveLayout } from "@/hooks/useWindowSize";

const Recomendados = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: wines = [], isLoading, error } = useWines({ featured: true });
  const { getItemsPerPage } = useResponsiveLayout();

  // Filtrar solo vinos destacados para la sección de recomendados
  const featuredWines = wines.filter((wine) => wine.featured);

  // Si no hay vinos destacados, usar todos los vinos
  const displayWines = featuredWines.length > 0 ? featuredWines : wines || [];

  // Calcular vinos por página basado en el tamaño de pantalla
  const winesPerPage = getItemsPerPage(1, 1, 2, 3);

  // Calcular el total de páginas basado en el tamaño de pantalla actual
  const totalPages = Math.ceil(displayWines.length / winesPerPage);

  // Resetear página actual si excede el total de páginas
  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [totalPages, currentPage]);

  const handleAddToCart = (wine: Wine, quantity: number) => {
    // Los componentes WineCard ya manejan esto internamente,
    // pero mantenemos esta función por si acaso
    console.log(
      "Vino agregado al carrito desde Recomendados:",
      wine.marca,
      "Cantidad:",
      quantity,
    );
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
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
    <Section className="!px-0" id="recomendados" variant="default">
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
        <div className=" w-full hidden lg:block px-4 lg:px-0">
          <div className="pt-5 pb-2.5">
            <div className="grid grid-cols-3 gap-12 xl:gap-2">
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

      {/* Controles de navegación - Solo mostrar si hay más de 1 página */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 mt-4">
          {/* Navegación con flechas y números */}
          <div className="flex justify-center items-center gap-4">
            <button
              aria-label="Previous page"
              className="p-2 text-neutral-900 hover:text-neutral-600 transition-colors disabled:text-neutral-400 disabled:cursor-not-allowed"
              disabled={currentPage === 0}
              onClick={goToPreviousPage}
            >
              <svg
                fill="none"
                height="20"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>

            <div className="text-neutral-900 text-sm font-medium font-['Lora'] min-w-[40px] text-center">
              {currentPage + 1} / {totalPages}
            </div>

            <button
              aria-label="Next page"
              className="p-2 text-neutral-900 hover:text-neutral-600 transition-colors disabled:text-neutral-400 disabled:cursor-not-allowed"
              disabled={currentPage === totalPages - 1}
              onClick={goToNextPage}
            >
              <svg
                fill="none"
                height="20"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-[1300px] pt-2.5 flex flex-col justify-center items-center gap-7 px-4 sm:px-0 mt-2">
        <div className="text-center text-neutral-900 text-lg font-normal font-['Lora'] italic leading-tight tracking-wide">
          Descubrimos etiquetas únicas que quizás todavía no hayas probado.
          <br />
          Nuestro deseo es simple: que cada vino te sorprenda, te emocione y te
          revele algo distinto. Todo comienza al abrir una botella.
        </div>
        <Link href="/vinos">
          <Button size="sm" variant="primary">
            catálogo completo
          </Button>
        </Link>
      </div>
    </Section>
  );
};

export default Recomendados;
