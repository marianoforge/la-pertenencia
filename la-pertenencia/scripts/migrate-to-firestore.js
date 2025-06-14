/**
 * Migration script to transfer wine data from JSON to Firestore
 * Run with: node scripts/migrate-to-firestore.js
 */

// Load environment variables first
require("dotenv").config({ path: ".env.local" });

const admin = require("firebase-admin");
const winesData = require("../data/wines.json");

// Initialize Firebase Admin SDK
const requiredEnvVars = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

// Validate environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error("❌ Missing required environment variables:", missingVars);
  process.exit(1);
}

if (!admin.apps.length) {
  try {
    const credential = admin.credential.cert({
      projectId: requiredEnvVars.projectId,
      privateKey: requiredEnvVars.privateKey.replace(/\\n/g, "\n"),
      clientEmail: requiredEnvVars.clientEmail,
    });

    admin.initializeApp({
      credential,
      projectId: requiredEnvVars.projectId,
    });

    console.log("✅ Firebase Admin SDK initialized successfully");
  } catch (error) {
    console.error("❌ Error initializing Firebase Admin SDK:", error);
    process.exit(1);
  }
}

const db = admin.firestore();

const migrateWinesToFirestore = async () => {
  try {
    console.log("🚀 Starting wine data migration to Firestore...");
    console.log(`📊 Total wines to migrate: ${winesData.length}`);

    const batch = db.batch();
    let successCount = 0;
    let errorCount = 0;

    for (const wine of winesData) {
      try {
        // Create a document reference with the wine ID
        const docRef = db.collection("wines").doc(wine.id);

        // Remove the id field from the data since it's used as document ID
        const { id, ...wineData } = wine;

        // Add to batch
        batch.set(docRef, {
          ...wineData,
          migratedAt: new Date().toISOString(),
        });

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

// Main execution
const main = async () => {
  console.log("🔥 Firebase Wine Data Migration Tool");
  console.log("=====================================\n");

  await migrateWinesToFirestore();
  await createIndexes();

  console.log("\n🏁 Migration process completed!");
  console.log("Don't forget to:");
  console.log("1. Create the recommended indexes in Firebase Console");
  console.log("2. Set up Firebase Storage rules for images");
  console.log("3. Configure Firebase Authentication");
  process.exit(0);
};

// Execute
main().catch((error) => {
  console.error("💥 Fatal error:", error);
  process.exit(1);
});
