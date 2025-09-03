import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { motion } from "framer-motion";

import { useFilterStore } from "@/stores/useFilterStore";

interface FilterBarProps {
  onSortChange?: (sortBy: string) => void;
}

const FilterBar = ({ onSortChange }: FilterBarProps) => {
  const { toggleFilters, sortBy, updateSort } = useFilterStore();
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const calculateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  const handleDropdownToggle = () => {
    if (!showSortDropdown) {
      calculateDropdownPosition();
    }
    setShowSortDropdown(!showSortDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowSortDropdown(false);
      }
    };

    if (showSortDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortDropdown]);

  // Portal dropdown
  useEffect(() => {
    if (!showSortDropdown || typeof window === "undefined") {
      return;
    }

    const portalRoot = document.createElement("div");

    document.body.appendChild(portalRoot);

    const dropdown = (
      <motion.div
        animate={{ opacity: 1, y: 0, scaleY: 1 }}
        className="bg-white border border-neutral-400 rounded-b-sm shadow-2xl"
        exit={{ opacity: 0, y: -10, scaleY: 0 }}
        initial={{ opacity: 0, y: -10, scaleY: 0 }}
        style={{
          position: "fixed",
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: Math.max(dropdownPosition.width, 180),
          zIndex: 99999,
          backgroundColor: "white",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
        }}
        transition={{
          duration: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          transformOrigin: "top",
        }}
      >
        {sortOptions.map((option) => (
          <button
            key={option.value}
            className="w-full px-4 py-2 text-left text-neutral-900 font-['Lora'] text-sm bg-white hover:bg-neutral-100 transition-colors"
            onClick={() => handleSortChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </motion.div>
    );

    const root = ReactDOM.createRoot(portalRoot);

    root.render(dropdown);

    return () => {
      root.unmount();
      document.body.removeChild(portalRoot);
    };
  }, [showSortDropdown, dropdownPosition, handleSortChange, sortOptions]);

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
    <img
      alt="Filtrar"
      className="w-5 h-5"
      height={20}
      src="/images/icon-filtros.svg"
      width={20}
    />
  );

  return (
    <div className="self-stretch py-5 rounded-sm border-t border-neutral-400 flex justify-between items-center gap-3 relative z-[9997]">
      <button
        className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-100 rounded-sm transition-colors max-[480px]:hidden"
        onClick={toggleFilters}
      >
        <span className="text-neutral-900 text-sm md:text-base font-normal font-['Lora'] tracking-wide max-[480px]:hidden">
          Filtrar por:
        </span>
        <FilterIcon />
      </button>
      {/* Right side - Sort dropdown */}
      <div className="flex items-center gap-3">
        <span className="text-neutral-900 text-sm md:text-base font-normal font-['Lora'] tracking-wide">
          Ordenar por:
        </span>

        <div className="relative z-[9998]">
          <button
            ref={buttonRef}
            className="flex items-center gap-2 px-4 py-2 border border-neutral-400 rounded-sm text-left hover:border-neutral-600 transition-colors min-w-[120px] max-[480px]:min-w-[100px]"
            onClick={handleDropdownToggle}
          >
            <span className="text-neutral-900 font-['Lora'] text-sm flex-1">
              {sortOptions.find((option) => option.value === sortBy)?.label ||
                "Más relevantes"}
            </span>
            <DropdownIcon />
          </button>
        </div>
      </div>
      {/* Left side - Filter button */}
      <button
        className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-100 rounded-sm transition-colors min-[480px]:hidden"
        onClick={toggleFilters}
      >
        <span className="text-neutral-900 text-sm md:text-base font-normal font-['Lora'] tracking-wide max-[480px]:hidden">
          Filtrar por:
        </span>
        <FilterIcon />
      </button>
    </div>
  );
};

export default FilterBar;
