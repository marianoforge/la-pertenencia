/**
 * Migration script to transfer wine data from CSV to Firestore
 * Run with: npx tsx scripts/migrate-csv-to-firestore.ts
 */

// Load environment variables
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";
import { db } from "../lib/firebaseAdmin";

interface CSVWineData {
  Bodega: string;
  Marca: string;
  Tipo: string;
  Varietal: string;
  Region: string;
  Descripcion: string;
  Maridaje: string;
  "PRECIO\nde Venta": string;
  "COSTO\nde Compra": string;
  Stock: string;
  Imagen: string;
}

interface FirestoreWineData {
  marca: string;
  bodega: string;
  tipo: string;
  varietal: string;
  maridaje: string;
  description: string;
  price: number;
  cost: number;
  iva: number;
  stock: number;
  region: string;
  vintage: number;
  alcohol: number;
  image: string;
  featured: boolean;
  winery: string;
  createdAt: string;
  updatedAt: string;
}

const cleanNumericValue = (value: string): number => {
  if (!value || value === '-' || value.trim() === '') return 0;
  return parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
};

const cleanStringValue = (value: string): string => {
  if (!value || value === '-') return '';
  return value.trim();
};

const generateWineId = (bodega: string, marca: string, tipo: string): string => {
  const cleanStr = (str: string) => str.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `${cleanStr(bodega)}-${cleanStr(marca)}-${cleanStr(tipo)}`;
};

const mapCSVToFirestore = (csvWine: CSVWineData, index: number): FirestoreWineData => {
  const now = new Date().toISOString();
  
  return {
    marca: cleanStringValue(csvWine.Marca),
    bodega: cleanStringValue(csvWine.Bodega),
    tipo: cleanStringValue(csvWine.Tipo) || "Tinto",
    varietal: cleanStringValue(csvWine.Varietal) || "Malbec",
    maridaje: cleanStringValue(csvWine.Maridaje),
    description: cleanStringValue(csvWine.Descripcion),
    price: cleanNumericValue(csvWine["PRECIO\nde Venta"]) || 2000,
    cost: cleanNumericValue(csvWine["COSTO\nde Compra"]) || 1000,
    iva: 21, // Valor por defecto
    stock: cleanNumericValue(csvWine.Stock) || 0,
    region: cleanStringValue(csvWine.Region) || "Mendoza",
    vintage: 2024, // Valor por defecto
    alcohol: 14.0, // Valor por defecto
    image: cleanStringValue(csvWine.Imagen) || "/images/wine-placeholder.svg",
    featured: false, // Valor por defecto
    winery: cleanStringValue(csvWine.Bodega),
    createdAt: now,
    updatedAt: now,
  };
};

const migrateCsvToFirestore = async () => {
  try {
    console.log("🚀 Starting CSV wine data migration to Firestore...");
    
    // Read CSV file
    const csvPath = path.join(__dirname, "../data/vinosData.csv");
    if (!fs.existsSync(csvPath)) {
      throw new Error(`CSV file not found at: ${csvPath}`);
    }

    const csvContent = fs.readFileSync(csvPath, "utf-8");
    const csvData = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as CSVWineData[];

    console.log(`📊 Total wines found in CSV: ${csvData.length}`);

    const batch = db.batch();
    let successCount = 0;
    let errorCount = 0;
    const processedWines: FirestoreWineData[] = [];

    for (let i = 0; i < csvData.length; i++) {
      const csvWine = csvData[i];
      
      try {
        // Skip empty rows
        if (!csvWine.Bodega && !csvWine.Marca) {
          console.log(`⏭️  Skipping empty row ${i + 1}`);
          continue;
        }

        const firestoreWine = mapCSVToFirestore(csvWine, i);
        const wineId = generateWineId(firestoreWine.bodega, firestoreWine.marca, firestoreWine.tipo);
        
        // Create document reference
        const docRef = db.collection("wines").doc(wineId);
        
        // Add to batch
        batch.set(docRef, firestoreWine);
        processedWines.push(firestoreWine);
        
        successCount++;
        console.log(`✅ Prepared wine: ${firestoreWine.marca} - ${firestoreWine.bodega} (${wineId})`);
        
      } catch (error) {
        errorCount++;
        console.error(`❌ Error processing wine at row ${i + 1}:`, error);
        console.error(`   Data:`, csvWine);
      }
    }

    if (successCount === 0) {
      console.log("⚠️  No wines to migrate. Exiting...");
      return;
    }

    // Commit the batch
    console.log(`\n📝 Committing ${successCount} wines to Firestore...`);
    await batch.commit();

    console.log("\n🎉 Migration completed!");
    console.log(`✅ Successfully migrated: ${successCount} wines`);
    console.log(`❌ Errors: ${errorCount}`);

    // Show sample of migrated data
    console.log("\n📋 Sample migrated wines:");
    processedWines.slice(0, 3).forEach((wine, index) => {
      console.log(`   ${index + 1}. ${wine.marca} - ${wine.tipo} - $${wine.price}`);
    });

    // Verify migration
    const winesSnapshot = await db.collection("wines").get();
    console.log(`\n🔍 Verification: ${winesSnapshot.size} wines found in Firestore`);
    
    console.log("\n📈 Migration Statistics:");
    console.log(`   • Total processed: ${csvData.length}`);
    console.log(`   • Successfully migrated: ${successCount}`);
    console.log(`   • Errors: ${errorCount}`);
    console.log(`   • Final count in Firestore: ${winesSnapshot.size}`);

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
  console.log("- Fields: tipo (Ascending), marca (Ascending)");
  console.log("- Fields: bodega (Ascending), marca (Ascending)");
  console.log("- Fields: varietal (Ascending), precio (Ascending)");
  console.log("- Fields: featured (Ascending), marca (Ascending)");
  console.log("- Fields: region (Ascending), vintage (Descending)");
  console.log("- Fields: price (Ascending), tipo (Ascending)");
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
  console.log("🍷 CSV Wine Data Migration Tool");
  console.log("===============================\n");

  verifyEnvironment();
  await migrateCsvToFirestore();
  await createIndexes();

  console.log("\n🏁 Migration process completed!");
  console.log("Next steps:");
  console.log("1. Check your Firebase Console to verify the data");
  console.log("2. Create the recommended indexes");
  console.log("3. Test the admin panel to see your wines");
  console.log("4. Update any missing images or data as needed");
  process.exit(0);
};

// Execute if run directly
if (require.main === module) {
  main().catch((error) => {
    console.error("💥 Fatal error:", error);
    process.exit(1);
  });
}

export { migrateCsvToFirestore, createIndexes }; 