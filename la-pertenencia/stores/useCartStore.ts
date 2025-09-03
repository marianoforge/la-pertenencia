import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Wine } from "../types/wine";
import { CartItem, CartState, CartActions } from "../types/cart";

interface CartStore extends CartState, CartActions {
  // Notification state
  showNotification: boolean;
  notificationMessage: string;
  setNotification: (message: string) => void;
  hideNotification: () => void;
}

const calculateFinalPrice = (wine: Wine) => {
  return wine.price + (wine.price * wine.iva) / 100;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      items: [],
      isOpen: false,
      totalItems: 0,
      totalAmount: 0,
      showNotification: false,
      notificationMessage: "",

      // Acciones
      addItem: (wine: Wine, quantity = 1) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.wine.id === wine.id,
        );
        const finalPrice = calculateFinalPrice(wine);

        let newItems: CartItem[];

        if (existingItemIndex >= 0) {
          // Si el item ya existe, actualizar cantidad
          newItems = currentItems.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        } else {
          // Si es un item nuevo, agregarlo
          const newItem: CartItem = {
            wine,
            quantity,
            priceAtTimeOfAdd: finalPrice,
          };

          newItems = [...currentItems, newItem];
        }

        // Recalcular totales
        const totalItems = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
        const totalAmount = newItems.reduce(
          (sum, item) => sum + item.priceAtTimeOfAdd * item.quantity,
          0,
        );

        // Mostrar notificación
        const message = `✅ ${wine.marca} agregado al carrito (${quantity})`;

        set({
          items: newItems,
          totalItems,
          totalAmount,
          showNotification: true,
          notificationMessage: message,
        });

        // Auto-hide notification after 3 seconds
        setTimeout(() => {
          get().hideNotification();
        }, 3000);
      },

      removeItem: (wineId: string) => {
        const currentItems = get().items;
        const newItems = currentItems.filter((item) => item.wine.id !== wineId);

        // Recalcular totales
        const totalItems = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
        const totalAmount = newItems.reduce(
          (sum, item) => sum + item.priceAtTimeOfAdd * item.quantity,
          0,
        );

        set({
          items: newItems,
          totalItems,
          totalAmount,
        });
      },

      updateQuantity: (wineId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(wineId);

          return;
        }

        const currentItems = get().items;
        const newItems = currentItems.map((item) =>
          item.wine.id === wineId ? { ...item, quantity } : item,
        );

        // Recalcular totales
        const totalItems = newItems.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
        const totalAmount = newItems.reduce(
          (sum, item) => sum + item.priceAtTimeOfAdd * item.quantity,
          0,
        );

        set({
          items: newItems,
          totalItems,
          totalAmount,
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalAmount: 0,
        });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      getItemQuantity: (wineId: string) => {
        const item = get().items.find((item) => item.wine.id === wineId);

        return item ? item.quantity : 0;
      },

      setNotification: (message: string) => {
        set({ showNotification: true, notificationMessage: message });
      },

      hideNotification: () => {
        set({ showNotification: false, notificationMessage: "" });
      },
    }),
    {
      name: "cart-storage", // Nombre para localStorage
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalAmount: state.totalAmount,
      }),
    },
  ),
);
