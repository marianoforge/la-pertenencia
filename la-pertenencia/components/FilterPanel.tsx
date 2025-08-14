import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useFilterStore } from "@/stores/useFilterStore";
import { useWineFilterOptions } from "@/hooks/useWineFilterOptions";

const FilterPanel = () => {
  const { isOpen, filters, closeFilters, updateFilters, clearFilters } =
    useFilterStore();

  // Estados locales para los dropdowns
  const [showBodegaDropdown, setShowBodegaDropdown] = useState(false);
  const [showMarcaDropdown, setShowMarcaDropdown] = useState(false);
  const [showTipoDropdown, setShowTipoDropdown] = useState(false);
  const [showVarietalDropdown, setShowVarietalDropdown] = useState(false);

  // Estados locales para las selecciones
  const [selectedBodega, setSelectedBodega] = useState("");
  const [selectedMarca, setSelectedMarca] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("");
  const [selectedVarietal, setSelectedVarietal] = useState("");

  // Hook para obtener opciones dinámicas
  const { data: filterOptions } = useWineFilterOptions();

  // Opciones para los filtros (con fallback mientras cargan)
  const bodegas = (filterOptions as any)?.bodegas || [];
  const marcas = (filterOptions as any)?.marcas || [];
  const tipos = (filterOptions as any)?.tipos || [];
  const varietales = (filterOptions as any)?.varietales || [];

  const handleFilterChange = (filterType: string, value: string) => {
    let newFilters = { ...filters };

    switch (filterType) {
      case "bodega":
        setSelectedBodega(value);
        newFilters.bodega = value || undefined;
        setShowBodegaDropdown(false);
        break;
      case "marca":
        setSelectedMarca(value);
        newFilters.marca = value || undefined;
        setShowMarcaDropdown(false);
        break;
      case "tipo":
        setSelectedTipo(value);
        newFilters.category = value || undefined;
        setShowTipoDropdown(false);
        break;
      case "varietal":
        setSelectedVarietal(value);
        newFilters.varietal = value || undefined;
        setShowVarietalDropdown(false);
        break;
    }

    updateFilters(newFilters);
  };

  const handleClearFilters = () => {
    setSelectedBodega("");
    setSelectedMarca("");
    setSelectedTipo("");
    setSelectedVarietal("");
    clearFilters();
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.button
            animate={{ opacity: 1 }}
            aria-label="Cerrar filtros"
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeFilters}
          />

          {/* Filter Panel */}
          <motion.div
            animate={{ x: 0 }}
            className="fixed left-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
            exit={{ x: "-100%" }}
            initial={{ x: "-100%" }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94], // easeOutCubic
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-neutral-400">
              <h2 className="text-lg font-semibold font-['Lora'] text-neutral-900 uppercase tracking-[4px]">
                Filtrar por:
              </h2>
              <button
                className="text-neutral-500 hover:text-neutral-700 text-2xl"
                onClick={closeFilters}
              >
                ✕
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {/* Bodega Filter */}
              <div className="mb-6">
                <div className="relative">
                  <button
                    className="w-full px-4 py-3 bg-white border border-neutral-400 rounded-sm text-left flex justify-between items-center hover:border-neutral-600 transition-colors"
                    onClick={() => setShowBodegaDropdown(!showBodegaDropdown)}
                  >
                    <span className="text-neutral-900 font-['Lora'] text-sm">
                      {selectedBodega || "Bodega"}
                    </span>
                    <DropdownIcon />
                  </button>

                  <AnimatePresence>
                    {showBodegaDropdown && (
                      <motion.div
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        className="absolute top-full left-0 right-0 bg-white border border-neutral-400 border-t-0 rounded-b-sm z-10 max-h-40 overflow-y-auto"
                        exit={{ opacity: 0, y: -10, scaleY: 0 }}
                        initial={{ opacity: 0, y: -10, scaleY: 0 }}
                        transition={{
                          duration: 0.2,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          transformOrigin: "top",
                        }}
                      >
                        <button
                          className="w-full px-4 py-2 text-left text-neutral-900 font-['Lora'] text-sm hover:bg-neutral-100 transition-colors"
                          onClick={() => handleFilterChange("bodega", "")}
                        >
                          Todas las bodegas
                        </button>
                        {bodegas.map((bodega: string) => (
                          <button
                            key={bodega}
                            className="w-full px-4 py-2 text-left text-neutral-900 font-['Lora'] text-sm hover:bg-neutral-100 transition-colors"
                            onClick={() => handleFilterChange("bodega", bodega)}
                          >
                            {bodega}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Marca Filter */}
              <div className="mb-6">
                <div className="relative">
                  <button
                    className="w-full px-4 py-3 bg-white border border-neutral-400 rounded-sm text-left flex justify-between items-center hover:border-neutral-600 transition-colors"
                    onClick={() => setShowMarcaDropdown(!showMarcaDropdown)}
                  >
                    <span className="text-neutral-900 font-['Lora'] text-sm">
                      {selectedMarca || "Marca"}
                    </span>
                    <DropdownIcon />
                  </button>

                  <AnimatePresence>
                    {showMarcaDropdown && (
                      <motion.div
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        className="absolute top-full left-0 right-0 bg-white border border-neutral-400 border-t-0 rounded-b-sm z-10 max-h-40 overflow-y-auto"
                        exit={{ opacity: 0, y: -10, scaleY: 0 }}
                        initial={{ opacity: 0, y: -10, scaleY: 0 }}
                        transition={{
                          duration: 0.2,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          transformOrigin: "top",
                        }}
                      >
                        <button
                          className="w-full px-4 py-2 text-left text-neutral-900 font-['Lora'] text-sm hover:bg-neutral-100 transition-colors"
                          onClick={() => handleFilterChange("marca", "")}
                        >
                          Todas las marcas
                        </button>
                        {marcas.map((marca: string) => (
                          <button
                            key={marca}
                            className="w-full px-4 py-2 text-left text-neutral-900 font-['Lora'] text-sm hover:bg-neutral-100 transition-colors"
                            onClick={() => handleFilterChange("marca", marca)}
                          >
                            {marca}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Tipo Filter */}
              <div className="mb-6">
                <div className="relative">
                  <button
                    className="w-full px-4 py-3 bg-white border border-neutral-400 rounded-sm text-left flex justify-between items-center hover:border-neutral-600 transition-colors"
                    onClick={() => setShowTipoDropdown(!showTipoDropdown)}
                  >
                    <span className="text-neutral-900 font-['Lora'] text-sm">
                      {selectedTipo || "Tipo"}
                    </span>
                    <DropdownIcon />
                  </button>

                  <AnimatePresence>
                    {showTipoDropdown && (
                      <motion.div
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        className="absolute top-full left-0 right-0 bg-white border border-neutral-400 border-t-0 rounded-b-sm z-10 max-h-40 overflow-y-auto"
                        exit={{ opacity: 0, y: -10, scaleY: 0 }}
                        initial={{ opacity: 0, y: -10, scaleY: 0 }}
                        transition={{
                          duration: 0.2,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          transformOrigin: "top",
                        }}
                      >
                        <button
                          className="w-full px-4 py-2 text-left text-neutral-900 font-['Lora'] text-sm hover:bg-neutral-100 transition-colors"
                          onClick={() => handleFilterChange("tipo", "")}
                        >
                          Todos los tipos
                        </button>
                        {tipos.map((tipo: string) => (
                          <button
                            key={tipo}
                            className="w-full px-4 py-2 text-left text-neutral-900 font-['Lora'] text-sm hover:bg-neutral-100 transition-colors"
                            onClick={() => handleFilterChange("tipo", tipo)}
                          >
                            {tipo}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Varietal Filter */}
              <div className="mb-6">
                <div className="relative">
                  <button
                    className="w-full px-4 py-3 bg-white border border-neutral-400 rounded-sm text-left flex justify-between items-center hover:border-neutral-600 transition-colors"
                    onClick={() =>
                      setShowVarietalDropdown(!showVarietalDropdown)
                    }
                  >
                    <span className="text-neutral-900 font-['Lora'] text-sm">
                      {selectedVarietal || "Varietal"}
                    </span>
                    <DropdownIcon />
                  </button>

                  <AnimatePresence>
                    {showVarietalDropdown && (
                      <motion.div
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        className="absolute top-full left-0 right-0 bg-white border border-neutral-400 border-t-0 rounded-b-sm z-10 max-h-40 overflow-y-auto"
                        exit={{ opacity: 0, y: -10, scaleY: 0 }}
                        initial={{ opacity: 0, y: -10, scaleY: 0 }}
                        transition={{
                          duration: 0.2,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          transformOrigin: "top",
                        }}
                      >
                        <button
                          className="w-full px-4 py-2 text-left text-neutral-900 font-['Lora'] text-sm hover:bg-neutral-100 transition-colors"
                          onClick={() => handleFilterChange("varietal", "")}
                        >
                          Todos los varietales
                        </button>
                        {varietales.map((varietal: string) => (
                          <button
                            key={varietal}
                            className="w-full px-4 py-2 text-left text-neutral-900 font-['Lora'] text-sm hover:bg-neutral-100 transition-colors"
                            onClick={() =>
                              handleFilterChange("varietal", varietal)
                            }
                          >
                            {varietal}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-5 border-t border-neutral-400 flex gap-3">
              <button
                className="flex-1 h-10 px-4 py-2 bg-neutral-900 rounded-sm flex justify-center items-center hover:bg-neutral-800 transition-colors"
                onClick={closeFilters}
              >
                <span className="text-amber-300 text-sm font-medium font-['Lora'] uppercase tracking-[3px]">
                  Aplicar
                </span>
              </button>
              <button
                className="flex-1 h-10 px-4 py-2 rounded-sm border border-neutral-400 flex justify-center items-center hover:bg-neutral-100 transition-colors"
                onClick={handleClearFilters}
              >
                <span className="text-neutral-900 text-sm font-medium font-['Lora'] uppercase tracking-[3px]">
                  Descartar
                </span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;
