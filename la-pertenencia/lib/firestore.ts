import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
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
import { deleteImageByUrl } from "@/lib/storage";

// Importar el tipo Wine desde types/wine.ts para mantener consistencia
import { Wine } from "@/types/wine";

// Collection names
const COLLECTIONS = {
  WINES: "wines",
  ORDERS: "orders",
  USERS: "users",
  CATEGORIES: "categories",
  SUSCRIPTOS: "suscriptos",
} as const;

/**
 * 🍷 Wine Management Functions
 */

// Helper function to generate custom wine ID: marca-varietal-uid
export const generateWineId = (marca: string, varietal: string): string => {
  const cleanMarca = marca
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens

  const cleanVarietal = varietal
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const uid = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

  return `${cleanMarca}-${cleanVarietal}-${uid}`;
};

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
      orderBy("marca")
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
      limit(6)
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

// Add new wine with custom ID format: marca-varietal-uid
export const addWine = async (
  wineData: Omit<Wine, "id" | "createdAt" | "updatedAt">
): Promise<string | null> => {
  try {
    const customId = generateWineId(wineData.marca, wineData.varietal);
    const wineDocRef = doc(db, COLLECTIONS.WINES, customId);
    const now = new Date().toISOString();

    await setDoc(wineDocRef, {
      ...wineData,
      createdAt: now,
      updatedAt: now,
    });

    console.log("✅ Wine added with ID:", customId);

    return customId;
  } catch (error) {
    console.error("❌ Error adding wine:", error);

    return null;
  }
};

// Update wine
export const updateWine = async (
  id: string,
  wineData: Partial<Wine>
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

// Delete wine and associated image from Storage
export const deleteWine = async (id: string): Promise<boolean> => {
  try {
    const wineDoc = doc(db, COLLECTIONS.WINES, id);

    // Get wine data to retrieve image URL
    const wineSnapshot = await getDoc(wineDoc);

    if (wineSnapshot.exists()) {
      const wineData = wineSnapshot.data() as Wine;

      // Delete wine document
      await deleteDoc(wineDoc);

      console.log("✅ Wine document deleted:", id);

      // Delete associated image from Storage if it exists and is not a placeholder
      if (
        wineData.image &&
        wineData.image.includes("firebasestorage.googleapis.com")
      ) {
        try {
          await deleteImageByUrl(wineData.image);
          console.log("✅ Wine image deleted from Storage");
        } catch (imageError) {
          console.warn("⚠️ Could not delete image from Storage:", imageError);
          // Continue even if image deletion fails
        }
      }
    } else {
      console.log("⚠️ Wine not found:", id);
      return false;
    }

    return true;
  } catch (error) {
    console.error("❌ Error deleting wine:", error);

    return false;
  }
};

// Reduce wine stock (transactional to prevent race conditions)
export const reduceWineStock = async (
  wineId: string,
  quantity: number
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
          `Insufficient stock. Available: ${currentStock}, Requested: ${quantity}`
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
      `✅ Stock reduced for wine ${wineId}: ${quantity} units. New stock: ${result}`
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
  searchTerm: string
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
        wine.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
  wines: Omit<Wine, "id">[]
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

/**
 * 📧 Newsletter Subscription Functions
 */

export interface NewsletterSubscription {
  id?: string;
  email: string;
  subscribedAt: string;
  active: boolean;
}

// Add newsletter subscription
export const addNewsletterSubscription = async (
  email: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const suscriptosCollection = collection(db, COLLECTIONS.SUSCRIPTOS);

    // Add new subscription (sin verificar duplicados para evitar problemas de permisos)
    const subscriptionData: Omit<NewsletterSubscription, "id"> = {
      email,
      subscribedAt: new Date().toISOString(),
      active: true,
    };

    await addDoc(suscriptosCollection, subscriptionData);

    console.log("✅ Newsletter subscription added:", email);

    return { success: true };
  } catch (error) {
    console.error("❌ Error adding newsletter subscription:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error al suscribirse";

    return { success: false, error: errorMessage };
  }
};

// Get all newsletter subscriptions
export const getAllNewsletterSubscriptions = async (): Promise<
  NewsletterSubscription[]
> => {
  try {
    const suscriptosCollection = collection(db, COLLECTIONS.SUSCRIPTOS);
    const q = query(suscriptosCollection, orderBy("subscribedAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as NewsletterSubscription[];
  } catch (error) {
    console.error("Error fetching newsletter subscriptions:", error);

    return [];
  }
};

// Unsubscribe from newsletter
export const unsubscribeFromNewsletter = async (
  email: string
): Promise<boolean> => {
  try {
    const suscriptosCollection = collection(db, COLLECTIONS.SUSCRIPTOS);
    const q = query(suscriptosCollection, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("❌ Email not found in subscriptions");

      return false;
    }

    // Update the active status to false
    const subscriptionDoc = snapshot.docs[0];

    await updateDoc(doc(db, COLLECTIONS.SUSCRIPTOS, subscriptionDoc.id), {
      active: false,
      unsubscribedAt: new Date().toISOString(),
    });

    console.log("✅ Unsubscribed:", email);

    return true;
  } catch (error) {
    console.error("❌ Error unsubscribing:", error);

    return false;
  }
};
