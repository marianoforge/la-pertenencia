import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Wine,
  CreateWineInput,
  UpdateWineInput,
  WineFilters,
} from "../types/wine";

// Importar funciones de Firebase
import {
  getAllWines,
  getWineById,
  addWine,
  updateWine as updateWineFirebase,
  deleteWine as deleteWineFirebase,
  getWinesByCategory,
  searchWinesByName,
} from "@/lib/firestore";

// Función helper para aplicar filtros localmente
function applyFilters(wines: any[], filters?: WineFilters): any[] {
  if (!filters) return wines;

  return wines.filter((wine) => {
    // Filtro por búsqueda de texto
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesMarca = wine.marca?.toLowerCase().includes(searchLower);
      const matchesBodega = wine.bodega?.toLowerCase().includes(searchLower);
      const matchesDescription = wine.description
        ?.toLowerCase()
        .includes(searchLower);
      const matchesRegion = wine.region?.toLowerCase().includes(searchLower);

      if (
        !matchesMarca &&
        !matchesBodega &&
        !matchesDescription &&
        !matchesRegion
      ) {
        return false;
      }
    }

    // Filtro por categoría (usando tipo)
    if (filters.category && filters.category !== "all") {
      if (wine.tipo !== filters.category) return false;
    }

    // Filtro por región
    if (filters.region && filters.region !== "all") {
      if (wine.region !== filters.region) return false;
    }

    // Filtro por rango de precios
    if (filters.minPrice !== undefined && wine.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && wine.price > filters.maxPrice) {
      return false;
    }

    // Filtro por vinos destacados
    if (filters.featured && !wine.featured) {
      return false;
    }

    return true;
  });
}

// Fetch functions using Firebase
async function fetchWines(filters?: WineFilters): Promise<Wine[]> {
  try {
    let wines: any[];

    // Si hay filtro de categoría específica, usar función optimizada
    if (filters?.category && filters.category !== "all") {
      wines = await getWinesByCategory(filters.category);
    }
    // Si hay búsqueda de texto, usar función de búsqueda
    else if (filters?.search) {
      wines = await searchWinesByName(filters.search);
    }
    // Sino, obtener todos los vinos
    else {
      wines = await getAllWines();
    }

    // Aplicar filtros adicionales localmente
    return applyFilters(wines, filters) as Wine[];
  } catch (error) {
    console.error("Error fetching wines:", error);
    throw new Error("Failed to fetch wines from Firebase");
  }
}

async function fetchWineById(id: string): Promise<Wine> {
  try {
    const wine = await getWineById(id);

    if (!wine) {
      throw new Error("Wine not found");
    }

    return wine as Wine;
  } catch (error) {
    console.error("Error fetching wine by ID:", error);
    throw new Error("Failed to fetch wine from Firebase");
  }
}

async function createWine(wineData: CreateWineInput): Promise<Wine> {
  try {
    const wineId = await addWine(wineData);

    if (!wineId) {
      throw new Error("Failed to create wine");
    }

    // Obtener el vino recién creado
    const newWine = await getWineById(wineId);

    if (!newWine) {
      throw new Error("Failed to fetch created wine");
    }

    return newWine as Wine;
  } catch (error) {
    console.error("Error creating wine:", error);
    throw new Error("Failed to create wine in Firebase");
  }
}

async function updateWine(wineData: UpdateWineInput): Promise<Wine> {
  try {
    const success = await updateWineFirebase(wineData.id, wineData);

    if (!success) {
      throw new Error("Failed to update wine");
    }

    // Obtener el vino actualizado
    const updatedWine = await getWineById(wineData.id);

    if (!updatedWine) {
      throw new Error("Failed to fetch updated wine");
    }

    return updatedWine as Wine;
  } catch (error) {
    console.error("Error updating wine:", error);
    throw new Error("Failed to update wine in Firebase");
  }
}

async function deleteWine(id: string): Promise<void> {
  try {
    const success = await deleteWineFirebase(id);

    if (!success) {
      throw new Error("Failed to delete wine");
    }
  } catch (error) {
    console.error("Error deleting wine:", error);
    throw new Error("Failed to delete wine from Firebase");
  }
}

// Query hooks
export function useWines(filters?: WineFilters) {
  return useQuery({
    queryKey: ["wines", filters],
    queryFn: () => fetchWines(filters),
    staleTime: 2 * 60 * 1000, // 2 minutos (menos tiempo para datos en tiempo real)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Agregar nuevo hook para obtener un vino individual
export const useWine = (id: string) => {
  return useQuery({
    queryKey: ["wine", id],
    queryFn: async (): Promise<Wine> => {
      const response = await fetch(`/api/wines/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch wine");
      }

      return response.json();
    },
    enabled: !!id,
  });
};

// Mutation hooks
export function useCreateWine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWine,
    onSuccess: (newWine) => {
      // Invalidar queries de vinos para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ["wines"] });

      // Agregar el nuevo vino al cache
      queryClient.setQueryData(["wine", newWine.id], newWine);

      console.log("Wine created successfully:", newWine.marca);
    },
    onError: (error) => {
      console.error("Error creating wine:", error);
    },
  });
}

export function useUpdateWine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWine,
    onSuccess: (updatedWine) => {
      // Invalidar queries de vinos para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ["wines"] });

      // Actualizar el vino específico en cache
      queryClient.setQueryData(["wine", updatedWine.id], updatedWine);

      console.log("Wine updated successfully:", updatedWine.marca);
    },
    onError: (error) => {
      console.error("Error updating wine:", error);
    },
  });
}

export function useDeleteWine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWine,
    onSuccess: (_, deletedId) => {
      // Invalidar queries de vinos para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ["wines"] });

      // Remover el vino eliminado del cache
      queryClient.removeQueries({ queryKey: ["wine", deletedId] });

      console.log("Wine deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting wine:", error);
    },
  });
}

// Hook adicional para obtener vinos por categoría optimizado
export function useWinesByCategory(category: string) {
  return useQuery({
    queryKey: ["wines", "category", category],
    queryFn: () => getWinesByCategory(category),
    enabled: !!category && category !== "all",
    staleTime: 3 * 60 * 1000, // 3 minutos
  });
}

// Hook adicional para búsqueda de vinos
export function useSearchWines(searchTerm: string) {
  return useQuery({
    queryKey: ["wines", "search", searchTerm],
    queryFn: () => searchWinesByName(searchTerm),
    enabled: !!searchTerm && searchTerm.length >= 2,
    staleTime: 1 * 60 * 1000, // 1 minuto para búsquedas
  });
}
