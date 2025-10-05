import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import DefaultLayout from "@/layouts/default";
import { useWines } from "@/hooks/useWines";
import { Wine, WineFilters } from "@/types/wine";
import WineGridCard from "@/components/wines/WineGridCard";
import WineHero from "@/components/wines/WineHero";
import FilterBar from "@/components/FilterBar";
import FilterPanel from "@/components/FilterPanel";
import { useFilterStore } from "@/stores/useFilterStore";
import Contacto from "@/components/Contacto";
import Combos from "@/components/wines/Combos";

export default function VinosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [localFilters, setLocalFilters] = useState<WineFilters>({
    search: "",
  });
  const router = useRouter();

  // Use filter store
  const {
    filters: storeFilters,
    sortBy,
    isOpen: isFilterPanelOpen,
  } = useFilterStore();

  // Combine local filters (search) with store filters
  const combinedFilters = useMemo(
    () => ({
      ...storeFilters,
      ...localFilters, // Local filters (search) should override store filters
    }),
    [localFilters, storeFilters]
  );

  const { data: wines = [], isLoading, error } = useWines(combinedFilters);

  // Initialize search term from URL on page load
  useEffect(() => {
    if (router.query.search && typeof router.query.search === "string") {
      const urlSearchTerm = router.query.search;

      setSearchTerm(urlSearchTerm);
      setLocalFilters((prev) => ({ ...prev, search: urlSearchTerm }));
    }
  }, [router.query.search]);

  // Reset search input when filter panel opens
  useEffect(() => {
    if (isFilterPanelOpen) {
      setSearchTerm("");
      setLocalFilters((prev) => ({ ...prev, search: "" }));

      // Also clear search from URL
      router.push("/vinos", undefined, { shallow: true });
    }
  }, [isFilterPanelOpen, router]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setLocalFilters({ ...localFilters, search: value });

    // Actualizar URL con el término de búsqueda
    if (value.trim()) {
      router.push(`/vinos?search=${encodeURIComponent(value)}`, undefined, {
        shallow: true,
      });
    } else {
      router.push("/vinos", undefined, { shallow: true });
    }
  };

  const handleFiltersChange = (newFilters: WineFilters) => {
    setLocalFilters({ ...localFilters, ...newFilters });
  };

  // Obtener vino destacado para el hero
  const featuredWine = useMemo(() => {
    if (!wines.length) return undefined;

    // Buscar un vino destacado, o tomar el primero
    return wines.find((wine: Wine) => wine.featured) || wines[0];
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
        return winesCopy.sort((a, b) => a.marca.localeCompare(b.marca));
      case "newest":
        return winesCopy.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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

  // Configuración de paginación
  const winesPerPage = 12; // 12 vinos por página (4 por línea x 3 líneas)
  const totalPages = Math.ceil(sortedWines.length / winesPerPage);

  // Vinos para la página actual
  const currentWines = useMemo(() => {
    const startIndex = currentPage * winesPerPage;
    const endIndex = startIndex + winesPerPage;

    return sortedWines.slice(startIndex, endIndex);
  }, [sortedWines, currentPage, winesPerPage]);

  // Resetear página actual cuando cambian los filtros o búsqueda
  useEffect(() => {
    setCurrentPage(0);
  }, [combinedFilters, sortBy]);

  // Funciones de navegación de páginas
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <DefaultLayout>
      <div className="w-full mx-auto px-4 md:px-2 lg:px-2 bg-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-[10px] rounded-sm overflow-hidden">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="text-black text-sm md:text-base font-normal font-['Lora'] tracking-wide max-[480px]:hidden"
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
          <div className="w-full sm:w-72 pl-3 pr-2.5 py-1.5 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-between items-center">
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
        <div data-aos="fade-up">
          <WineHero
            featuredWine={featuredWine}
            onAddToCart={(wine, quantity) => {
              // Los componentes ya manejan la funcionalidad del carrito
              console.log(
                "Vino agregado al carrito:",
                wine.marca,
                "Cantidad:",
                quantity
              );
            }}
          />
        </div>

        {/* Filter Bar Section */}
        <div
          className="w-full max-w-[1300px] mx-auto px-4 md:px-6 lg:px-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <FilterBar />
        </div>

        {/* Minimum Sale Banner */}
        <div
          className="w-full max-w-[1300px] mx-auto px-4 md:px-6 lg:px-8"
          data-aos="fade-up"
          data-aos-delay="250"
        >
          <div className="w-full bg-amber-300 py-3 px-6 flex justify-center items-center gap-4 rounded-sm relative">
            {/* Left exclamation icon */}
            <div className="absolute left-4 flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-neutral-900 rounded-full flex items-center justify-center">
              <span className="text-amber-300 text-lg md:text-xl font-bold font-['Lora']">
                !
              </span>
            </div>

            {/* Text */}
            <p className="text-neutral-900 text-sm md:text-base font-semibold font-['Lora'] uppercase tracking-[3px] md:tracking-[4px] text-center flex-1">
              ¡VENTA MÍNIMA POR CAJA DE 6 UNIDADES!
            </p>

            {/* Right exclamation icon */}
            <div className="absolute right-4 flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-neutral-900 rounded-full flex items-center justify-center">
              <span className="text-amber-300 text-lg md:text-xl font-bold font-['Lora']">
                !
              </span>
            </div>
          </div>
        </div>

        {/* Wine List Section */}
        <div className="w-full max-w-[1300px] mx-auo px-4 md:px-6 lg:px-8">
          {isLoading ? (
            <SkeletonTheme baseColor="#f3f3f3" highlightColor="#e0e0e0">
              <div className="space-y-6">
                {/* Skeleton para el contador de resultados */}
                <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <Skeleton height={20} width={200} />
                  <Skeleton height={20} width={150} />
                </div>

                {/* Skeleton para la grilla de vinos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 justify-items-center">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <div key={index} className="w-full max-w-[280px]">
                      {/* Imagen del vino */}
                      <Skeleton className="rounded-lg mb-4" height={350} />
                      {/* Título */}
                      <Skeleton className="mb-2" height={24} />
                      {/* Subtítulo */}
                      <Skeleton className="mb-3" height={20} width="80%" />
                      {/* Precio */}
                      <Skeleton className="mb-4" height={28} width="60%" />
                      {/* Botón */}
                      <Skeleton className="rounded" height={40} />
                    </div>
                  ))}
                </div>
              </div>
            </SkeletonTheme>
          ) : error ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-lg font-lora text-red-600">
                Error al cargar los vinos
              </div>
            </div>
          ) : sortedWines.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-lg font-lora">
                {searchTerm || Object.values(combinedFilters).some((f) => f)
                  ? "No se encontraron vinos que coincidan con los filtros seleccionados"
                  : "No se encontraron vinos"}
              </div>
            </div>
          ) : (
            <>
              {/* Results count and pagination info */}
              <div
                className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
                data-aos="fade-up"
                data-aos-delay="300"
              >
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

                {totalPages > 1 && (
                  <p className="text-sm font-normal font-['Lora'] text-gray-500">
                    Página {currentPage + 1} de {totalPages}
                  </p>
                )}
              </div>

              {/* Wine Grid */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 justify-items-center"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                {currentWines.map((wine: Wine) => (
                  <WineGridCard
                    key={wine.id}
                    wine={wine}
                    onAddToCart={(wine, quantity) => {
                      // Los componentes ya manejan la funcionalidad del carrito
                      console.log(
                        "Vino agregado al carrito:",
                        wine.marca,
                        "Cantidad:",
                        quantity
                      );
                    }}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div
                  className="flex justify-center items-center gap-4 mt-8 mb-4"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <button
                    className="px-6 py-2 bg-neutral-900 text-dorado-light rounded-sm font-['Lora'] font-medium uppercase tracking-[2px] text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors"
                    disabled={currentPage === 0}
                    onClick={goToPreviousPage}
                  >
                    Anterior
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        className={`w-10 h-10 rounded-sm font-['Lora'] font-medium text-sm transition-colors ${
                          currentPage === index
                            ? "bg-amber-300 text-neutral-900"
                            : "bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-100"
                        }`}
                        onClick={() => setCurrentPage(index)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    className="px-6 py-2 bg-neutral-900 text-dorado-light rounded-sm font-['Lora'] font-medium uppercase tracking-[2px] text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors"
                    disabled={currentPage === totalPages - 1}
                    onClick={goToNextPage}
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Combos title="nuestros combos" subtitle="Combinaciones únicas" />
      <Contacto />
      <FilterPanel />
    </DefaultLayout>
  );
}
