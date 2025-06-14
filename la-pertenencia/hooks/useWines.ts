import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Wine,
  CreateWineInput,
  UpdateWineInput,
  WineFilters,
} from "../types/wine";

const API_BASE = "/api/wines";

// Función para construir query string desde filtros
function buildQueryString(filters: WineFilters): string {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  return params.toString();
}

// Fetch functions
async function fetchWines(filters?: WineFilters): Promise<Wine[]> {
  const queryString = filters ? buildQueryString(filters) : "";
  const url = queryString ? `${API_BASE}?${queryString}` : API_BASE;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch wines");
  }

  return response.json();
}

async function fetchWineById(id: string): Promise<Wine> {
  const response = await fetch(`${API_BASE}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch wine");
  }

  return response.json();
}

async function createWine(wine: CreateWineInput): Promise<Wine> {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wine),
  });

  if (!response.ok) {
    throw new Error("Failed to create wine");
  }

  return response.json();
}

async function updateWine(wine: UpdateWineInput): Promise<Wine> {
  const response = await fetch(`${API_BASE}/${wine.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wine),
  });

  if (!response.ok) {
    throw new Error("Failed to update wine");
  }

  return response.json();
}

async function deleteWine(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete wine");
  }
}

// Query hooks
export function useWines(filters?: WineFilters) {
  return useQuery({
    queryKey: ["wines", filters],
    queryFn: () => fetchWines(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

export function useWine(id: string) {
  return useQuery({
    queryKey: ["wine", id],
    queryFn: () => fetchWineById(id),
    enabled: !!id,
  });
}

// Mutation hooks
export function useCreateWine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wines"] });
    },
  });
}

export function useUpdateWine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWine,
    onSuccess: (updatedWine) => {
      queryClient.invalidateQueries({ queryKey: ["wines"] });
      queryClient.setQueryData(["wine", updatedWine.id], updatedWine);
    },
  });
}

export function useDeleteWine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWine,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["wines"] });
      queryClient.removeQueries({ queryKey: ["wine", deletedId] });
    },
  });
}
