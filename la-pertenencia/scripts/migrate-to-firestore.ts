/**
 * Migration script to transfer wine data from JSON to Firestore
 * Run with: npx tsx scripts/migrate-to-firestore.ts
 */

// Load environment variables
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "../lib/firebaseAdmin";
import winesData from "../data/wines.json";

interface WineData {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  iva: number;
  stock: number;
  category: string;
  region: string;
  vintage: number;
  alcohol: number;
  image: string;
  featured: boolean;
  winery: string;
  createdAt: string;
  updatedAt: string;
}

const migrateWinesToFirestore = async () => {
  try {
    console.log("🚀 Starting wine data migration to Firestore...");
    console.log(`📊 Total wines to migrate: ${winesData.length}`);

    const batch = db.batch();
    let successCount = 0;
    let errorCount = 0;

    for (const wine of winesData as WineData[]) {
      try {
        // Create a document reference with the wine ID
        const docRef = db.collection("wines").doc(wine.id);

        // Map old schema to new schema
        const { id, name, category, ...restData } = wine;

        // Create mapped wine data with new schema
        const mappedWineData = {
          ...restData,
          marca: name, // name → marca
          bodega: wine.winery || "La Pertenencia", // Default bodega
          tipo: category === "Tintos" ? "Tinto" : 
                category === "Blancos" ? "Blanco" : 
                category as any, // Map category → tipo
          varietal: "Malbec", // Default varietal (can be updated later)
          migratedAt: new Date().toISOString(),
        };

        // Add to batch
        batch.set(docRef, mappedWineData);

        successCount++;
        console.log(`✅ Prepared wine: ${wine.name} (${wine.id})`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Error preparing wine ${wine.name}:`, error);
      }
    }

    // Commit the batch
    await batch.commit();

    console.log("\n🎉 Migration completed!");
    console.log(`✅ Successfully migrated: ${successCount} wines`);
    console.log(`❌ Errors: ${errorCount}`);

    // Verify migration
    const winesSnapshot = await db.collection("wines").get();
    console.log(
      `🔍 Verification: ${winesSnapshot.size} wines found in Firestore`
    );
  } catch (error) {
    console.error("💥 Migration failed:", error);
    process.exit(1);
  }
};

const createIndexes = async () => {
  console.log("\n🔧 Creating recommended Firestore indexes...");
  console.log("Please create these indexes manually in Firebase Console:");
  console.log("");
  console.log("Collection: wines");
  console.log("- Fields: category (Ascending), name (Ascending)");
  console.log("- Fields: featured (Ascending), name (Ascending)");
  console.log("- Fields: region (Ascending), vintage (Descending)");
  console.log("- Fields: price (Ascending), category (Ascending)");
  console.log("");
  console.log("🔗 Firebase Console: https://console.firebase.google.com/");
};

const verifyEnvironment = () => {
  const requiredEnvVars = [
    "FIREBASE_PROJECT_ID",
    "FIREBASE_PRIVATE_KEY",
    "FIREBASE_CLIENT_EMAIL",
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    console.error("❌ Missing required environment variables:");
    missingVars.forEach((varName) => console.error(`   - ${varName}`));
    console.error(
      "\nPlease create a .env.local file with your Firebase Admin credentials."
    );
    process.exit(1);
  }

  console.log("✅ Environment variables verified");
};

// Main execution
const main = async () => {
  console.log("🔥 Firebase Wine Data Migration Tool");
  console.log("=====================================\n");

  verifyEnvironment();
  await migrateWinesToFirestore();
  await createIndexes();

  console.log("\n🏁 Migration process completed!");
  console.log("Don't forget to:");
  console.log("1. Create the recommended indexes in Firebase Console");
  console.log("2. Set up Firebase Storage rules for images");
  console.log("3. Configure Firebase Authentication");
  process.exit(0);
};

// Execute if run directly
if (require.main === module) {
  main().catch((error) => {
    console.error("💥 Fatal error:", error);
    process.exit(1);
  });
}

export { migrateWinesToFirestore, createIndexes };
