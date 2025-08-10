import { create } from "zustand";

import { WineFilters } from "@/types/wine";

interface FilterState {
  isOpen: boolean;
  filters: WineFilters;
  sortBy: string;

  // Actions
  toggleFilters: () => void;
  closeFilters: () => void;
  updateFilters: (newFilters: WineFilters) => void;
  updateSort: (sortBy: string) => void;
  clearFilters: () => void;
}

const initialFilters: WineFilters = {
  category: undefined,
  region: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  featured: undefined,
  search: undefined,
};

export const useFilterStore = create<FilterState>((set, get) => ({
  isOpen: false,
  filters: initialFilters,
  sortBy: "relevance",

  toggleFilters: () => set((state) => ({ isOpen: !state.isOpen })),
  closeFilters: () => set({ isOpen: false }),

  updateFilters: (newFilters: WineFilters) =>
    set({ filters: { ...get().filters, ...newFilters } }),

  updateSort: (sortBy: string) => set({ sortBy }),

  clearFilters: () => set({ filters: initialFilters }),
}));
