import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { WineFilters as WineFiltersType } from "@/types/wine";

interface WineFiltersProps {
  onFiltersChange: (filters: WineFiltersType) => void;
  onSortChange: (sort: string) => void;
}

const sortOptions = [
  { value: "relevance", label: "Más relevantes" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "name", label: "Nombre A-Z" },
  { value: "newest", label: "Más recientes" },
];

const bodegas = [
  { value: "", label: "Todas las bodegas" },
  { value: "mendoza", label: "Mendoza" },
  { value: "san-juan", label: "San Juan" },
  { value: "salta", label: "Salta" },
  { value: "rio-negro", label: "Río Negro" },
];

const marcas = [
  { value: "", label: "Todas las marcas" },
  { value: "la-pertenencia", label: "La Pertenencia" },
  { value: "premium", label: "Premium" },
  { value: "reserva", label: "Reserva" },
];

const tipos = [
  { value: "", label: "Todos los tipos" },
  { value: "Tinto", label: "Tinto" },
  { value: "Blanco", label: "Blanco" },
  { value: "Red", label: "Red" },
  { value: "Blend", label: "Blend" },
  { value: "Rosado", label: "Rosado" },
  { value: "Espumante", label: "Espumante" },
  { value: "Naranjo", label: "Naranjo" },
];

const varietales = [
  { value: "", label: "Todos los varietales" },
  { value: "Malbec", label: "Malbec" },
  { value: "Cabernet Sauvignon", label: "Cabernet Sauvignon" },
  { value: "Merlot", label: "Merlot" },
  { value: "Pinot Noir", label: "Pinot Noir" },
  { value: "Cabernet Franc", label: "Cabernet Franc" },
  { value: "Syrah", label: "Syrah" },
  { value: "Chardonnay", label: "Chardonnay" },
  { value: "Sauvignon Blanc", label: "Sauvignon Blanc" },
  { value: "Petit Verdot", label: "Petit Verdot" },
  { value: "Pinot Gris", label: "Pinot Gris" },
  { value: "Bonarda", label: "Bonarda" },
  { value: "Criolla", label: "Criolla" },
  { value: "Moscatel", label: "Moscatel" },
  { value: "Sangiovese", label: "Sangiovese" },
  { value: "Torrontés", label: "Torrontés" },
  { value: "Otros...", label: "Otros..." },
];

const WineFilters = ({ onFiltersChange, onSortChange }: WineFiltersProps) => {
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedBodega, setSelectedBodega] = useState("");
  const [selectedMarca, setSelectedMarca] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("");
  const [selectedVarietal, setSelectedVarietal] = useState("");
  const [currentFilters, setCurrentFilters] = useState<WineFiltersType>({});

  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showBodegaDropdown, setShowBodegaDropdown] = useState(false);
  const [showMarcaDropdown, setShowMarcaDropdown] = useState(false);
  const [showTipoDropdown, setShowTipoDropdown] = useState(false);
  const [showVarietalDropdown, setShowVarietalDropdown] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const bodegaRef = useRef<HTMLDivElement>(null);
  const marcaRef = useRef<HTMLDivElement>(null);
  const tipoRef = useRef<HTMLDivElement>(null);
  const varietalRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
      if (
        bodegaRef.current &&
        !bodegaRef.current.contains(event.target as Node)
      ) {
        setShowBodegaDropdown(false);
      }
      if (
        marcaRef.current &&
        !marcaRef.current.contains(event.target as Node)
      ) {
        setShowMarcaDropdown(false);
      }
      if (tipoRef.current && !tipoRef.current.contains(event.target as Node)) {
        setShowTipoDropdown(false);
      }
      if (
        varietalRef.current &&
        !varietalRef.current.contains(event.target as Node)
      ) {
        setShowVarietalDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange(value);
    setShowSortDropdown(false);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    let newFilters = { ...currentFilters };

    switch (filterType) {
      case "bodega":
        setSelectedBodega(value);
        newFilters.region = value || undefined;
        setShowBodegaDropdown(false);
        break;
      case "marca":
        setSelectedMarca(value);
        // No hay campo específico para marca en WineFilters, se podría usar search
        setShowMarcaDropdown(false);
        break;
      case "tipo":
        setSelectedTipo(value);
        newFilters.category = value || undefined;
        setShowTipoDropdown(false);
        break;
      case "varietal":
        setSelectedVarietal(value);
        // No hay campo específico para varietal, se podría usar search
        setShowVarietalDropdown(false);
        break;
    }

    setCurrentFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const DropdownIcon = () => (
    <div className="w-5 h-5 relative flex items-center justify-center">
      <svg
        fill="none"
        height="6"
        viewBox="0 0 12 6"
        width="12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L6 5L11 1"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );

  return (
    <div className="self-stretch py-5 rounded-sm border-t border-neutral-400 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-0 overflow-visible">
      {/* Ordenar por */}
      <div className="flex flex-col sm:flex-row sm:justify-start sm:items-center gap-2 sm:gap-5">
        <div className="text-black text-sm md:text-base font-normal font-['Lora'] tracking-wide whitespace-nowrap">
          Ordenar por:
        </div>
        <div ref={sortRef} className="relative">
          <button
            className="w-full sm:w-48 pl-3 pr-2.5 py-2.5 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-between items-center hover:bg-gray-50 transition-colors"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <div className="text-black text-sm md:text-base font-normal font-['Lora'] tracking-wide">
              {sortOptions.find((opt) => opt.value === sortBy)?.label}
            </div>
            <DropdownIcon />
          </button>
          <AnimatePresence>
            {showSortDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10, scaleY: 0 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -10, scaleY: 0 }}
                transition={{ 
                  duration: 0.2, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  transformOrigin: "top"
                }}
                className="absolute top-full left-0 w-full bg-white border border-neutral-400 rounded-sm mt-1 z-[9999] shadow-lg"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className="w-full px-3 py-2 text-left text-sm md:text-base font-normal font-['Lora'] tracking-wide hover:bg-gray-50 transition-colors"
                    onClick={() => handleSortChange(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Filtrar por */}
      <div className="flex flex-col lg:flex-row lg:justify-start lg:items-center gap-4 lg:gap-5">
        <div className="text-black text-sm md:text-base font-normal font-['Lora'] tracking-wide whitespace-nowrap">
          Filtrar por:
        </div>
        <div className="grid grid-cols-2 lg:flex lg:justify-start lg:items-center gap-2 lg:gap-5">
          {/* Bodega */}
          <div ref={bodegaRef} className="relative">
            <button
              className="w-full lg:w-40 pl-3 pr-2.5 py-2.5 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-between items-center hover:bg-gray-50 transition-colors"
              onClick={() => setShowBodegaDropdown(!showBodegaDropdown)}
            >
              <div className="text-black text-xs md:text-base font-normal font-['Lora'] tracking-wide truncate">
                {bodegas.find((b) => b.value === selectedBodega)?.label ||
                  "Bodega"}
              </div>
              <DropdownIcon />
            </button>
            <AnimatePresence>
              {showBodegaDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scaleY: 0 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -10, scaleY: 0 }}
                  transition={{ 
                    duration: 0.2, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    transformOrigin: "top"
                  }}
                  className="absolute top-full left-0 w-full bg-white border border-neutral-400 rounded-sm mt-1 z-[9999] shadow-lg"
                >
                  {bodegas.map((bodega) => (
                    <button
                      key={bodega.value}
                      className="w-full px-3 py-2 text-left text-xs md:text-base font-normal font-['Lora'] tracking-wide hover:bg-gray-50 transition-colors"
                      onClick={() => handleFilterChange("bodega", bodega.value)}
                    >
                      {bodega.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Marca */}
          <div ref={marcaRef} className="relative">
            <button
              className="w-full lg:w-40 pl-3 pr-2.5 py-2.5 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-between items-center hover:bg-gray-50 transition-colors"
              onClick={() => setShowMarcaDropdown(!showMarcaDropdown)}
            >
              <div className="text-black text-xs md:text-base font-normal font-['Lora'] tracking-wide truncate">
                {marcas.find((m) => m.value === selectedMarca)?.label ||
                  "Marca"}
              </div>
              <DropdownIcon />
            </button>
            <AnimatePresence>
              {showMarcaDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scaleY: 0 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -10, scaleY: 0 }}
                  transition={{ 
                    duration: 0.2, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    transformOrigin: "top"
                  }}
                  className="absolute top-full left-0 w-full bg-white border border-neutral-400 rounded-sm mt-1 z-[9999] shadow-lg"
                >
                  {marcas.map((marca) => (
                    <button
                      key={marca.value}
                      className="w-full px-3 py-2 text-left text-xs md:text-base font-normal font-['Lora'] tracking-wide hover:bg-gray-50 transition-colors"
                      onClick={() => handleFilterChange("marca", marca.value)}
                    >
                      {marca.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tipo */}
          <div ref={tipoRef} className="relative">
            <button
              className="w-full lg:w-40 pl-3 pr-2.5 py-2.5 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-between items-center hover:bg-gray-50 transition-colors"
              onClick={() => setShowTipoDropdown(!showTipoDropdown)}
            >
              <div className="text-black text-xs md:text-base font-normal font-['Lora'] tracking-wide truncate">
                {tipos.find((t) => t.value === selectedTipo)?.label || "Tipo"}
              </div>
              <DropdownIcon />
            </button>
            <AnimatePresence>
              {showTipoDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scaleY: 0 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -10, scaleY: 0 }}
                  transition={{ 
                    duration: 0.2, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    transformOrigin: "top"
                  }}
                  className="absolute top-full left-0 w-full bg-white border border-neutral-400 rounded-sm mt-1 z-[9999] shadow-lg"
                >
                  {tipos.map((tipo) => (
                    <button
                      key={tipo.value}
                      className="w-full px-3 py-2 text-left text-xs md:text-base font-normal font-['Lora'] tracking-wide hover:bg-gray-50 transition-colors"
                      onClick={() => handleFilterChange("tipo", tipo.value)}
                    >
                      {tipo.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Varietal */}
          <div ref={varietalRef} className="relative">
            <button
              className="w-full lg:w-40 pl-3 pr-2.5 py-2.5 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-between items-center hover:bg-gray-50 transition-colors"
              onClick={() => setShowVarietalDropdown(!showVarietalDropdown)}
            >
              <div className="text-black text-xs md:text-base font-normal font-['Lora'] tracking-wide truncate">
                {varietales.find((v) => v.value === selectedVarietal)?.label ||
                  "Varietal"}
              </div>
              <DropdownIcon />
            </button>
            {showVarietalDropdown && (
              <div className="absolute top-full left-0 w-full bg-white border border-neutral-400 rounded-sm mt-1 z-[9999] shadow-lg">
                {varietales.map((varietal) => (
                  <button
                    key={varietal.value}
                    className="w-full px-3 py-2 text-left text-xs md:text-base font-normal font-['Lora'] tracking-wide hover:bg-gray-50 transition-colors"
                    onClick={() =>
                      handleFilterChange("varietal", varietal.value)
                    }
                  >
                    {varietal.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineFilters;
