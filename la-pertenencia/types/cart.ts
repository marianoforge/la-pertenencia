import { Wine } from "./wine";

export interface CartItem {
  wine: Wine;
  quantity: number;
  priceAtTimeOfAdd: number; // Precio con IVA al momento de agregar
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalAmount: number;
}

export interface CartActions {
  addItem: (wine: Wine, quantity?: number) => void;
  removeItem: (wineId: string) => void;
  updateQuantity: (wineId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getItemQuantity: (wineId: string) => number;
}
