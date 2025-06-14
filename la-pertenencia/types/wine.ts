export interface Wine {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  iva: number;
  stock: number;
  category: "Tintos" | "Blancos" | "Rosados" | "Espumantes";
  region: string;
  vintage: number;
  alcohol: number;
  image: string;
  featured: boolean;
  winery: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWineInput {
  name: string;
  description: string;
  price: number;
  cost: number;
  iva: number;
  stock: number;
  category: "Tintos" | "Blancos" | "Rosados" | "Espumantes";
  region: string;
  vintage: number;
  alcohol: number;
  image: string;
  featured: boolean;
}

export interface UpdateWineInput extends Partial<CreateWineInput> {
  id: string;
}

export interface WineFilters {
  category?: string;
  region?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  search?: string;
}
