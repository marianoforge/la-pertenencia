import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useFilterStore } from "@/stores/useFilterStore";

interface FilterBarProps {
  onSortChange?: (sortBy: string) => void;
}

const FilterBar = ({ onSortChange }: FilterBarProps) => {
  const { toggleFilters, sortBy, updateSort } = useFilterStore();
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const sortOptions = [
    { value: "relevance", label: "Más relevantes" },
    { value: "price-asc", label: "Precio: menor a mayor" },
    { value: "price-desc", label: "Precio: mayor a menor" },
    { value: "name-asc", label: "Nombre: A-Z" },
    { value: "name-desc", label: "Nombre: Z-A" },
  ];

  const handleSortChange = (value: string) => {
    updateSort(value);
    setShowSortDropdown(false);
    if (onSortChange) {
      onSortChange(value);
    }
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

  const FilterIcon = () => (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 24 24"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6H20M7 12H17M10 18H14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );

  return (
    <div className="self-stretch py-5 rounded-sm border-t border-neutral-400 max-[480px]:flex-col max-[480px]:gap-4 flex justify-between items-center">
      {/* Left side - Filter button */}
      <button
        className="max-[480px]:w-full flex items-center gap-3 px-4 py-2 hover:bg-neutral-100 rounded-sm transition-colors"
        onClick={toggleFilters}
      >
        <span className="text-neutral-900 text-sm md:text-base font-normal font-['Lora'] tracking-wide">
          Filtrar por:
        </span>
        <FilterIcon />
      </button>

      {/* Right side - Sort dropdown */}
      <div className="max-[480px]:w-full flex items-center gap-3">
        <span className="text-neutral-900 text-sm md:text-base font-normal font-['Lora'] tracking-wide">
          Ordenar por:
        </span>

        <div className="max-[480px]:flex-1 relative">
          <button
            className="max-[480px]:w-full flex items-center gap-2 px-4 py-2 border border-neutral-400 rounded-sm text-left hover:border-neutral-600 transition-colors min-w-[180px]"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <span className="text-neutral-900 font-['Lora'] text-sm flex-1">
              {sortOptions.find((option) => option.value === sortBy)?.label ||
                "Más relevantes"}
            </span>
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
                className="absolute top-full right-0 bg-white border border-neutral-400 border-t-0 rounded-b-sm z-10 min-w-[180px] shadow-lg"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className="w-full px-4 py-2 text-left text-neutral-900 font-['Lora'] text-sm hover:bg-neutral-100 transition-colors"
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
    </div>
  );
};

export default FilterBar;
