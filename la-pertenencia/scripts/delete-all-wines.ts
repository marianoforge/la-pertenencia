/**
 * Script para borrar todos los documentos de la colección wines
 * Uso: npx tsx scripts/delete-all-wines.ts
 */

import admin from "firebase-admin";

// Cargar variables de entorno si no están cargadas
if (!process.env.FIREBASE_PROJECT_ID) {
  try {
    const dotenv = require("dotenv");
    dotenv.config({ path: ".env.local" });
  } catch (error) {
    console.error("❌ Error cargando dotenv:", error);
  }
}

// Verificar variables de entorno
const requiredVars = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

const missingVars = Object.entries(requiredVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error("❌ Faltan variables de entorno:", missingVars);
  console.error("\n💡 Asegúrate de tener en tu .env.local:");
  console.error("FIREBASE_PROJECT_ID=...");
  console.error("FIREBASE_PRIVATE_KEY=...");
  console.error("FIREBASE_CLIENT_EMAIL=...");
  process.exit(1);
}

// Inicializar Firebase Admin si no está inicializado
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: requiredVars.projectId!,
        privateKey: requiredVars.privateKey!.replace(/\\n/g, "\n"),
        clientEmail: requiredVars.clientEmail!,
      }),
    });
    console.log("✅ Firebase Admin SDK inicializado correctamente");
  } catch (error) {
    console.error("❌ Error inicializando Firebase Admin SDK:", error);
    process.exit(1);
  }
}

const db = admin.firestore();

async function deleteAllWines() {
  try {
    console.log("🔥 Iniciando borrado de todos los vinos...");

    const winesRef = db.collection("wines");
    const snapshot = await winesRef.get();

    if (snapshot.empty) {
      console.log("✅ No hay vinos para borrar.");
      return;
    }

    console.log(`📋 Se encontraron ${snapshot.size} vinos para borrar.`);

    // Borrar en batches de 500 (límite de Firestore)
    const batch = db.batch();
    let count = 0;

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
      count++;
    });

    await batch.commit();

    console.log(`✅ Se borraron ${count} vinos exitosamente.`);
    console.log("✅ Colección wines limpiada.");
  } catch (error) {
    console.error("❌ Error al borrar vinos:", error);
    throw error;
  }
}

// Ejecutar
deleteAllWines()
  .then(() => {
    console.log("✅ Proceso completado.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
