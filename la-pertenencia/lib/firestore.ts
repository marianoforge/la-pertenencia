import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  runTransaction,
  QuerySnapshot,
  DocumentSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

// Importar el tipo Wine desde types/wine.ts para mantener consistencia
import { Wine } from "@/types/wine";

// Collection names
const COLLECTIONS = {
  WINES: "wines",
  ORDERS: "orders",
  USERS: "users",
  CATEGORIES: "categories",
} as const;

/**
 * 🍷 Wine Management Functions
 */

// Get all wines
export const getAllWines = async (): Promise<Wine[]> => {
  try {
    const winesCollection = collection(db, COLLECTIONS.WINES);
    const snapshot: QuerySnapshot = await getDocs(winesCollection);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Wine[];
  } catch (error) {
    console.error("Error fetching wines:", error);

    return [];
  }
};

// Get wine by ID
export const getWineById = async (id: string): Promise<Wine | null> => {
  try {
    const wineDoc = doc(db, COLLECTIONS.WINES, id);
    const snapshot: DocumentSnapshot = await getDoc(wineDoc);

    if (snapshot.exists()) {
      return {
        id: snapshot.id,
        ...snapshot.data(),
      } as Wine;
    }

    return null;
  } catch (error) {
    console.error("Error fetching wine:", error);

    return null;
  }
};

// Get wines by category (using tipo field)
export const getWinesByCategory = async (category: string): Promise<Wine[]> => {
  try {
    const winesCollection = collection(db, COLLECTIONS.WINES);
    const q = query(
      winesCollection,
      where("tipo", "==", category),
      orderBy("marca"),
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Wine[];
  } catch (error) {
    console.error("Error fetching wines by category:", error);

    return [];
  }
};

// Get featured wines
export const getFeaturedWines = async (): Promise<Wine[]> => {
  try {
    const winesCollection = collection(db, COLLECTIONS.WINES);
    const q = query(
      winesCollection,
      where("featured", "==", true),
      orderBy("marca"),
      limit(6),
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Wine[];
  } catch (error) {
    console.error("Error fetching featured wines:", error);

    return [];
  }
};

// Add new wine
export const addWine = async (
  wineData: Omit<Wine, "id" | "createdAt" | "updatedAt">,
): Promise<string | null> => {
  try {
    const winesCollection = collection(db, COLLECTIONS.WINES);
    const now = new Date().toISOString();

    const docRef = await addDoc(winesCollection, {
      ...wineData,
      createdAt: now,
      updatedAt: now,
    });

    console.log("✅ Wine added with ID:", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("❌ Error adding wine:", error);

    return null;
  }
};

// Update wine
export const updateWine = async (
  id: string,
  wineData: Partial<Wine>,
): Promise<boolean> => {
  try {
    const wineDoc = doc(db, COLLECTIONS.WINES, id);

    await updateDoc(wineDoc, {
      ...wineData,
      updatedAt: new Date().toISOString(),
    });

    console.log("✅ Wine updated:", id);

    return true;
  } catch (error) {
    console.error("❌ Error updating wine:", error);

    return false;
  }
};

// Delete wine
export const deleteWine = async (id: string): Promise<boolean> => {
  try {
    const wineDoc = doc(db, COLLECTIONS.WINES, id);

    await deleteDoc(wineDoc);

    console.log("✅ Wine deleted:", id);

    return true;
  } catch (error) {
    console.error("❌ Error deleting wine:", error);

    return false;
  }
};

// Reduce wine stock (transactional to prevent race conditions)
export const reduceWineStock = async (
  wineId: string,
  quantity: number,
): Promise<{ success: boolean; newStock?: number; error?: string }> => {
  try {
    const wineDoc = doc(db, COLLECTIONS.WINES, wineId);

    const result = await runTransaction(db, async (transaction) => {
      const wineSnapshot = await transaction.get(wineDoc);

      if (!wineSnapshot.exists()) {
        throw new Error(`Wine with ID ${wineId} not found`);
      }

      const wineData = wineSnapshot.data() as Wine;
      const currentStock = wineData.stock || 0;

      if (currentStock < quantity) {
        throw new Error(
          `Insufficient stock. Available: ${currentStock}, Requested: ${quantity}`,
        );
      }

      const newStock = currentStock - quantity;

      // Update the wine document with new stock
      transaction.update(wineDoc, {
        stock: newStock,
        updatedAt: new Date().toISOString(),
      });

      return newStock;
    });

    console.log(
      `✅ Stock reduced for wine ${wineId}: ${quantity} units. New stock: ${result}`,
    );

    return { success: true, newStock: result };
  } catch (error) {
    console.error("❌ Error reducing wine stock:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return { success: false, error: errorMessage };
  }
};

// Search wines by name
export const searchWinesByName = async (
  searchTerm: string,
): Promise<Wine[]> => {
  try {
    const winesCollection = collection(db, COLLECTIONS.WINES);
    const snapshot = await getDocs(winesCollection);

    const allWines = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Wine[];

    // Client-side filtering for name search (Firestore doesn't support full-text search)
    return allWines.filter(
      (wine) =>
        wine.marca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wine.bodega?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wine.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  } catch (error) {
    console.error("Error searching wines:", error);

    return [];
  }
};

/**
 * 📦 Migration function to import initial wine data
 */
export const migrateWineData = async (
  wines: Omit<Wine, "id">[],
): Promise<boolean> => {
  try {
    const winesCollection = collection(db, COLLECTIONS.WINES);

    for (const wine of wines) {
      await addDoc(winesCollection, wine);
    }

    console.log("✅ Wine data migration completed");

    return true;
  } catch (error) {
    console.error("❌ Error migrating wine data:", error);

    return false;
  }
};
