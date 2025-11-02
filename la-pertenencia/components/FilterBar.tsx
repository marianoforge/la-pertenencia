import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useFilterStore } from "@/stores/useFilterStore";

interface FilterBarProps {
  onSortChange?: (sortBy: string) => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

const sortOptions = [
  { value: "relevance", label: "Más relevantes" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "name-asc", label: "Nombre: A-Z" },
  { value: "name-desc", label: "Nombre: Z-A" },
];

const FilterBar = ({
  onSortChange,
  searchTerm = "",
  onSearchChange,
}: FilterBarProps) => {
  const { toggleFilters, sortBy, updateSort } = useFilterStore();
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const desktopButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  const calculateDropdownPosition = useCallback(() => {
    // Use the visible button ref based on screen size
    const activeButton = window.innerWidth >= 768 
      ? desktopButtonRef.current 
      : mobileButtonRef.current;
    
    if (activeButton) {
      const rect = activeButton.getBoundingClientRect();
      
      console.log('Button position:', {
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
        right: rect.right,
        bottom: rect.bottom
      });

      setDropdownPosition({
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
      });
    }
  }, []);

  const handleSortChange = useCallback(
    (value: string) => {
      updateSort(value);
      setShowSortDropdown(false);

      if (onSortChange) {
        onSortChange(value);
      }
    },
    [updateSort, onSortChange]
  );

  const handleDropdownToggle = useCallback(() => {
    setShowSortDropdown(!showSortDropdown);
  }, [showSortDropdown]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Check if click is outside both buttons
      const isOutsideDesktop = desktopButtonRef.current && !desktopButtonRef.current.contains(target);
      const isOutsideMobile = mobileButtonRef.current && !mobileButtonRef.current.contains(target);

      if (isOutsideDesktop && isOutsideMobile) {
        // Check if click is not on a dropdown button
        const isDropdownButton = (target as HTMLElement).closest(
          '[data-dropdown-option="true"]'
        );

        if (!isDropdownButton) {
          setShowSortDropdown(false);
        }
      }
    };

    if (showSortDropdown) {
      // Use setTimeout to avoid immediate closing
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortDropdown]);

  // Calculate position when dropdown opens
  useEffect(() => {
    if (showSortDropdown) {
      calculateDropdownPosition();
    }
  }, [showSortDropdown, calculateDropdownPosition]);

  // Recalculate position on scroll/resize
  useEffect(() => {
    if (!showSortDropdown) return;

    const handleReposition = () => {
      calculateDropdownPosition();
    };

    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);

    return () => {
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [showSortDropdown, calculateDropdownPosition]);

  // Render dropdown portal
  const renderDropdownPortal = () => {
    if (typeof window === "undefined") {
      return null;
    }

    console.log('Rendering dropdown with position:', dropdownPosition);

    return ReactDOM.createPortal(
      <AnimatePresence mode="wait">
        {showSortDropdown && (
          <motion.div
            key="sort-dropdown"
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-neutral-400 rounded-b-sm shadow-2xl"
            exit={{ opacity: 0, y: -10 }}
            initial={{ opacity: 0, y: -10 }}
            style={{
              position: "fixed",
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: Math.max(dropdownPosition.width, 180),
              zIndex: 99999,
              backgroundColor: "white",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
            }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
          >
            {sortOptions.map((option) => (
              <button
                key={option.value}
                className="w-full px-4 py-2 text-left text-neutral-900 font-['Lora'] text-sm bg-white hover:bg-neutral-100 transition-colors first:rounded-t-sm last:rounded-b-sm"
                data-dropdown-option="true"
                onClick={() => handleSortChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );
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
    <img
      alt="Filtrar"
      className="w-5 h-5"
      height={20}
      src="/images/icon-filtros.svg"
      width={20}
    />
  );

  return (
    <>
      <div className="self-stretch py-5 rounded-sm border-t border-neutral-400 relative z-[9997]">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center gap-3">
          {/* Left side - Filter button */}
          <button
            className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-100 rounded-sm transition-colors"
            onClick={toggleFilters}
          >
            <span className="text-neutral-900 text-sm md:text-base font-normal font-['Lora'] tracking-wide">
              Filtrar por:
            </span>
            <FilterIcon />
          </button>

          {/* Center - Search Input */}
          <div className="flex-1 max-w-md mx-4 pl-3 pr-2.5 py-1.5 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-between items-center">
            <input
              className="flex-1 outline-none text-black text-sm md:text-base font-normal font-['Lora'] tracking-wide bg-transparent"
              placeholder="Buscar vinos..."
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
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

          {/* Right side - Sort dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-neutral-900 text-sm md:text-base font-normal font-['Lora'] tracking-wide">
              Ordenar por:
            </span>

            <div className="relative z-[9998]">
              <button
                ref={desktopButtonRef}
                className="flex items-center gap-2 px-4 py-2 border border-neutral-400 rounded-sm text-left hover:border-neutral-600 transition-colors min-w-[120px]"
                onClick={handleDropdownToggle}
              >
                <span className="text-neutral-900 font-['Lora'] text-sm flex-1">
                  {sortOptions.find((option) => option.value === sortBy)
                    ?.label || "Más relevantes"}
                </span>
                <DropdownIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="flex md:hidden flex-col gap-3">
          {/* Search Input */}
          <div className="w-full pl-3 pr-2.5 py-1.5 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-between items-center">
            <input
              className="flex-1 outline-none text-black text-sm font-normal font-['Lora'] tracking-wide bg-transparent"
              placeholder="Buscar vinos..."
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
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

          {/* Sort dropdown */}
          <div className="flex items-center gap-3 justify-end">
            <span className="text-neutral-900 text-sm font-normal font-['Lora'] tracking-wide">
              Ordenar por:
            </span>

            <div className="relative z-[9998] flex-1">
              <button
                ref={mobileButtonRef}
                className="w-full flex items-center gap-2 px-4 py-2 border border-neutral-400 rounded-sm text-left hover:border-neutral-600 transition-colors"
                onClick={handleDropdownToggle}
              >
                <span className="text-neutral-900 font-['Lora'] text-sm flex-1">
                  {sortOptions.find((option) => option.value === sortBy)
                    ?.label || "Más relevantes"}
                </span>
                <DropdownIcon />
              </button>
            </div>

            {/* Filter button */}
            <button
              className="flex items-center gap-2 px-3 py-2 hover:bg-neutral-100 rounded-sm transition-colors"
              onClick={toggleFilters}
            >
              <FilterIcon />
            </button>
          </div>
        </div>
      </div>
      {renderDropdownPortal()}
    </>
  );
};

export default FilterBar;
