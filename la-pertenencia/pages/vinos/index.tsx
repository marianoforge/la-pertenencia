import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import DefaultLayout from "@/layouts/default";
import { useWines } from "@/hooks/useWines";
import { WineFilters } from "@/types/wine";
import WineGridCard from "@/components/wines/WineGridCard";
import WineFiltersComponent from "@/components/wines/WineFilters";
import WineHero from "@/components/wines/WineHero";
import Contacto from "@/components/Contacto";

export default function VinosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<WineFilters>({
    search: "",
  });
  const [sortBy, setSortBy] = useState("relevance");
  const router = useRouter();

  const { data: wines = [], isLoading, error } = useWines(filters);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, search: value });

    // Actualizar URL con el término de búsqueda
    if (value) {
      router.push(`/vinos?search=${encodeURIComponent(value)}`, undefined, {
        shallow: true,
      });
    } else {
      router.push("/vinos", undefined, { shallow: true });
    }
  };

  const handleFiltersChange = (newFilters: WineFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  // Obtener vino destacado para el hero
  const featuredWine = useMemo(() => {
    if (!wines.length) return undefined;

    // Buscar un vino destacado, o tomar el primero
    return wines.find((wine) => wine.featured) || wines[0];
  }, [wines]);

  // Aplicar ordenamiento a los vinos
  const sortedWines = useMemo(() => {
    if (!wines.length) return wines;

    const winesCopy = [...wines];

    switch (sortBy) {
      case "price-asc":
        return winesCopy.sort((a, b) => a.price - b.price);
      case "price-desc":
        return winesCopy.sort((a, b) => b.price - a.price);
      case "name":
        return winesCopy.sort((a, b) => a.name.localeCompare(b.name));
      case "newest":
        return winesCopy.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      case "relevance":
      default:
        return winesCopy.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;

          return b.price - a.price;
        });
    }
  }, [wines, sortBy]);

  return (
    <DefaultLayout>
      <div className="w-full mx-auto px-4 md:px-2 lg:px-2 bg-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-2.5 py-[5px] rounded-sm overflow-hidden">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="text-black text-sm md:text-base font-normal font-['Lora'] tracking-wide"
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
              <li aria-current="page" className="text-gray-600">
                Vinos
                {searchTerm && (
                  <span className="text-gray-500 ml-1">
                    - &quot;{searchTerm}&quot;
                  </span>
                )}
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
      <section className="max-w-[1300px] mx-auto flex flex-col gap-4 md:gap-8 py-4 ">
        {/* Breadcrumb and Search Section */}

        {/* Wine Hero Section */}
        <WineHero
          featuredWine={featuredWine}
          onAddToCart={(wine, quantity) => {
            // Los componentes ya manejan la funcionalidad del carrito
            console.log(
              "Vino agregado al carrito:",
              wine.marca,
              "Cantidad:",
              quantity,
            );
          }}
        />

        {/* Filters Section */}
        <div className="w-full max-w-[1300px] mx-auto px-4 md:px-6 lg:px-8">
          <WineFiltersComponent
            onFiltersChange={handleFiltersChange}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Wine List Section */}
        <div className="w-full max-w-[1300px] mx-auto px-4 md:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-lg font-lora">Cargando vinos...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-lg font-lora text-red-600">
                Error al cargar los vinos
              </div>
            </div>
          ) : sortedWines.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-lg font-lora">
                {searchTerm || Object.values(filters).some((f) => f)
                  ? "No se encontraron vinos que coincidan con los filtros seleccionados"
                  : "No se encontraron vinos"}
              </div>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="mb-6">
                <p className="text-sm md:text-base font-normal font-['Lora'] tracking-wide text-gray-600">
                  {sortedWines.length}{" "}
                  {sortedWines.length === 1
                    ? "vino encontrado"
                    : "vinos encontrados"}
                  {searchTerm && (
                    <span className="text-gray-500 ml-1">
                      para &quot;{searchTerm}&quot;
                    </span>
                  )}
                </p>
              </div>

              {/* Wine Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 justify-items-center">
                {sortedWines.map((wine) => (
                  <WineGridCard
                    key={wine.id}
                    wine={wine}
                    onAddToCart={(wine, quantity) => {
                      // Los componentes ya manejan la funcionalidad del carrito
                      console.log(
                        "Vino agregado al carrito:",
                        wine.marca,
                        "Cantidad:",
                        quantity,
                      );
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <Contacto />
    </DefaultLayout>
  );
}
