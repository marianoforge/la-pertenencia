import { useState } from "react";

import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { useWines } from "@/hooks/useWines";
import WineCard from "@/components/WineCard";
import WineFilters from "@/components/WineFilters";

export default function IndexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 999999 });

  const {
    data: wines,
    isLoading,
    error,
  } = useWines({
    search: searchQuery,
    category: selectedCategory,
    region: selectedRegion,
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
  });

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedRegion("");
    setPriceRange({ min: 0, max: 999999 });
  };

  const featuredWines = wines?.filter((wine) => wine.featured) || [];
  const regularWines = wines?.filter((wine) => !wine.featured) || [];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({ color: "violet" })}>
            Bienvenido a La Pertenencia
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
            Descubre nuestra selección de vinos premium argentinos
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4">
          {/* Filtros */}
          <WineFilters
            priceRange={priceRange}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedRegion={selectedRegion}
            onCategoryChange={setSelectedCategory}
            onClearFilters={handleClearFilters}
            onPriceRangeChange={setPriceRange}
            onRegionChange={setSelectedRegion}
            onSearchChange={setSearchQuery}
          />

          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">
                Error al cargar los vinos. Por favor, intenta de nuevo.
              </p>
            </div>
          )}

          {/* No results */}
          {wines && wines.length === 0 && !isLoading && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🍷</div>
              <h3 className="text-xl font-semibold mb-2">
                No se encontraron vinos
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>
          )}

          {/* Vinos destacados */}
          {featuredWines.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">
                🌟 Vinos Destacados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredWines.map((wine) => (
                  <WineCard key={wine.id} wine={wine} />
                ))}
              </div>
            </div>
          )}

          {/* Todos los vinos */}
          {regularWines.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">
                🍷 Nuestra Selección
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {regularWines.map((wine) => (
                  <WineCard key={wine.id} wine={wine} />
                ))}
              </div>
            </div>
          )}

          {/* Mostrar total de resultados */}
          {wines && wines.length > 0 && (
            <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
              Mostrando {wines.length} vino{wines.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
