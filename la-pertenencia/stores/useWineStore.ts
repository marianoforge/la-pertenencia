import { create } from "zustand";

import { Wine, WineFilters } from "../types/wine";

interface WineStore {
  wines: Wine[];
  loading: boolean;
  error: string | null;
  filters: WineFilters;
  selectedWine: Wine | null;

  // Actions
  setWines: (wines: Wine[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: WineFilters) => void;
  setSelectedWine: (wine: Wine | null) => void;
  addWine: (wine: Wine) => void;
  updateWine: (wine: Wine) => void;
  removeWine: (id: string) => void;
  clearError: () => void;
  resetFilters: () => void;
}

const initialFilters: WineFilters = {
  category: undefined,
  region: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  featured: undefined,
  search: undefined,
};

export const useWineStore = create<WineStore>((set, get) => ({
  wines: [],
  loading: false,
  error: null,
  filters: initialFilters,
  selectedWine: null,

  setWines: (wines) => set({ wines }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  setFilters: (filters) => set({ filters }),

  setSelectedWine: (wine) => set({ selectedWine: wine }),

  addWine: (wine) =>
    set((state) => ({
      wines: [...state.wines, wine],
    })),

  updateWine: (updatedWine) =>
    set((state) => ({
      wines: state.wines.map((wine) =>
        wine.id === updatedWine.id ? updatedWine : wine
      ),
      selectedWine:
        state.selectedWine?.id === updatedWine.id
          ? updatedWine
          : state.selectedWine,
    })),

  removeWine: (id) =>
    set((state) => ({
      wines: state.wines.filter((wine) => wine.id !== id),
      selectedWine: state.selectedWine?.id === id ? null : state.selectedWine,
    })),

  clearError: () => set({ error: null }),

  resetFilters: () => set({ filters: initialFilters }),
}));
