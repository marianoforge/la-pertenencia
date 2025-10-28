import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Section, SectionHeader, ComboCard, Button } from "../ui";

import { Wine } from "@/types/wine";
import { Combo } from "@/types/combo";
import { useFeaturedCombos } from "@/hooks/useCombos";
import { useCartStore } from "@/stores/useCartStore";
import { useWindowSize } from "@/hooks/useWindowSize";

interface CombosProps {
  title?: string;
  subtitle?: string;
}

const Recomendados = ({
  title = "recomendados",
  subtitle = "Elegidos con el Corazón",
}: CombosProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { addItem } = useCartStore();
  const router = useRouter();
  const { width } = useWindowSize();

  // Verificar si estamos en la página de vinos
  const isVinosPage = router.pathname.includes("/vinos");

  // Obtener combos destacados desde la base de datos
  const { data: featuredCombos = [], isLoading, error } = useFeaturedCombos();

  // Usar combos destacados, si no hay ninguno usar todos los combos disponibles
  const displayCombos = featuredCombos;

  // Calcular combos por página basado en el tamaño de pantalla
  // Mobile (< 1024px): 1 combo, Desktop (>= 1024px): 2 combos
  const combosPerPage = width < 1024 ? 1 : 2;

  // Calcular el total de páginas basado en los combos
  const totalPages = Math.ceil(displayCombos.length / combosPerPage);

  // Resetear página actual si excede el total de páginas
  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [totalPages, currentPage]);

  // Resetear página cuando cambia el tamaño de pantalla
  useEffect(() => {
    setCurrentPage(0);
  }, [combosPerPage]);

  // Handle combo add to cart - agregar como una unidad
  const handleAddComboToCart = (combo: Combo, quantity: number) => {
    // Crear un objeto Wine que represente el combo completo
    const comboAsWine: Wine = {
      id: combo.id,
      marca: combo.name,
      bodega: "Combo",
      tipo: "Combo", // Tipo especial para combos
      varietal: `Combo de ${combo.wines.length} vinos`,
      price: combo.price,
      cost: 0,
      iva: 0,
      stock: 10,
      region: "Argentina",
      vintage: new Date().getFullYear(),
      alcohol: 14,
      image: combo.image,
      featured: combo.featured,
      winery: "La Pertenencia",
      description: `Combo incluye: ${combo.wines.map((wine) => wine.marca).join(", ")}`,
      maridaje: `Combo de ${combo.wines.length} vinos seleccionados`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Agregar el combo como una sola unidad al carrito
    addItem(comboAsWine, quantity);
  };

  // LEGACY: Keep old wine handling (commented for reference)
  /*
  // Filtrar solo vinos destacados para la sección de recomendados
  const featuredWines = wines.filter((wine) => wine.featured);

  // Si no hay vinos destacados, usar todos los vinos
  const displayWines = featuredWines.length > 0 ? featuredWines : wines || [];

  // Calcular vinos por página basado en el tamaño de pantalla
  const winesPerPage = getItemsPerPage(1, 1, 2, 3);

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
  */

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  // Mostrar loading mientras cargan los combos
  if (isLoading) {
    return (
      <Section className="!px-0 !py-16" id="combos" variant="default">
        <div data-aos="fade-up">
          <SectionHeader subtitle={subtitle} title={title} />
        </div>
        <div className="flex justify-center items-center py-16">
          <div className="text-lg text-gray-600">Cargando combos...</div>
        </div>
      </Section>
    );
  }

  // Mostrar error si hay problemas cargando
  if (error) {
    return (
      <Section className="!px-0 !py-16" id="combos" variant="default">
        <div data-aos="fade-up">
          <SectionHeader subtitle={subtitle} title={title} />
        </div>
        <div className="flex justify-center items-center py-16">
          <div className="text-lg text-red-600">Error al cargar combos</div>
        </div>
      </Section>
    );
  }

  // No mostrar la sección si no hay combos destacados
  if (displayCombos.length === 0) {
    return null;
  }

  return (
    <Section className="!px-0 !py-16" id="combos" variant="default">
      <div data-aos="fade-up">
        <SectionHeader subtitle={subtitle} title={title} />
      </div>

      {/* NEW: Combo Cards Carousel Container */}
      <div className="w-full max-w-[1300px] max-[480px]:px-0 px-4 sm:px-0 inline-flex flex-col justify-start items-center gap-2.5">
        {/* Combo Cards Display - 2 cards per page */}
        <div className="pt-5 pb-2.5 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 justify-items-center">
            {displayCombos
              .slice(
                currentPage * combosPerPage,
                currentPage * combosPerPage + combosPerPage
              )
              .map((combo, index) => (
                <div
                  key={combo.id}
                  className="flex justify-center w-full px-4 sm:px-0"
                  data-aos="fade-up"
                  data-aos-delay={300 + index * 100}
                  data-aos-once="true"
                >
                  <ComboCard
                    className="w-full sm:w-auto"
                    combo={combo}
                    onAddToCart={handleAddComboToCart}
                  />
                </div>
              ))}
          </div>
        </div>
        {/* Navigation Controls - Only show if there's more than 1 page */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-4 mt-4">
            {/* Navigation with arrows and numbers */}
            <div className="flex justify-center items-center gap-4">
              <button
                aria-label="Previous combo"
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
                aria-label="Next combo"
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
      </div>

      {/* LEGACY: Original wine carousel (commented for reference) 
      {shouldShowSkeleton ? (
        <SkeletonTheme baseColor="#f3f3f3" highlightColor="#e0e0e0">
          <div className="w-full max-w-[1300px] max-[480px]:px-0 px-4 sm:px-0 inline-flex flex-col justify-start items-center gap-2.5 overflow-hidden" data-aos="fade-up" data-aos-delay="200">
            <SkeletonTheme baseColor="#f3f3f3" highlightColor="#e0e0e0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="p-4">
                    <Skeleton className="rounded-lg mb-4" height={200} />
                    <Skeleton height={16} width="400px" />
                    <Skeleton className="rounded" height={36} />
                  </Card>
                ))}
              </div>
            </SkeletonTheme>
          </div>
          <div className="w-full max-w-[1300px] pt-8 flex flex-col justify-center items-center gap-7 px-4 sm:px-0 mt-2">
            <div className="text-center max-w-[600px]">
              <Skeleton className="mb-2" height={20} />
              <Skeleton className="mb-2" height={20} />
              <Skeleton height={20} width="60%" />
            </div>
            <Skeleton className="rounded" height={40} width={200} />
          </div>
        </SkeletonTheme>
      ) : (
        // Original wine carousel content would go here
      )}
      */}

      {/* Texto descriptivo y botón */}
      <div className="w-full max-w-[1300px] pt-2.5 flex flex-col justify-center items-center gap-7 px-4 sm:px-0 mt-2">
        <div className="text-center text-neutral-900 text-lg font-normal font-['Lora'] italic leading-tight tracking-wide">
          Descubrimos combinaciones únicas que quizás todavía no hayas probado.
          <br />
          Nuestro deseo es simple: que cada combo te sorprenda, te emocione y te
          revele algo distinto. Todo comienza al abrir una botella.
        </div>
        {/* Mostrar botones "VER TODOS" solo si NO estamos en la página de vinos */}
        {!isVinosPage && (
          <>
            {/* Button for desktop - centered */}
            <div className="min-[481px]:block hidden">
              <Button size="lg" variant="primary">
                <a href="/vinos#combos">ver todos</a>
              </Button>
            </div>
            {/* Button for mobile - full width outside centered container */}
            <div className="w-full max-w-[1300px] max-[480px]:px-0 px-4 sm:px-0 max-[480px]:block hidden">
              <Button className="w-full" size="lg" variant="primary">
                <a href="/vinos#combos">ver todos</a>
              </Button>
            </div>
          </>
        )}
      </div>
    </Section>
  );
};

export default Recomendados;
