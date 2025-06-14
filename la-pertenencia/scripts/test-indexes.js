/**
 * Script para probar que los índices de Firestore están funcionando
 * Run with: node scripts/test-indexes.js
 */

// Load environment variables
require("dotenv").config({ path: ".env.local" });

const admin = require("firebase-admin");

// Initialize Firebase Admin (reuse existing initialization)
if (!admin.apps.length) {
  const requiredEnvVars = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };

  if (
    !requiredEnvVars.projectId ||
    !requiredEnvVars.privateKey ||
    !requiredEnvVars.clientEmail
  ) {
    console.error("❌ Missing Firebase credentials");
    process.exit(1);
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: requiredEnvVars.projectId,
      privateKey: requiredEnvVars.privateKey.replace(/\\n/g, "\n"),
      clientEmail: requiredEnvVars.clientEmail,
    }),
    projectId: requiredEnvVars.projectId,
  });
}

const db = admin.firestore();

const testIndexes = async () => {
  console.log("🧪 Probando índices de Firestore...\n");

  const tests = [
    {
      name: "Consulta por categoría (category + name)",
      query: () =>
        db
          .collection("wines")
          .where("category", "==", "Tintos")
          .orderBy("name")
          .limit(3),
      description: "Buscar vinos tintos ordenados por nombre",
    },
    {
      name: "Consulta vinos destacados (featured + name)",
      query: () =>
        db
          .collection("wines")
          .where("featured", "==", true)
          .orderBy("name")
          .limit(3),
      description: "Buscar vinos destacados ordenados por nombre",
    },
    {
      name: "Consulta por región y año (region + vintage)",
      query: () =>
        db
          .collection("wines")
          .where("region", "==", "Mendoza")
          .orderBy("vintage", "desc")
          .limit(3),
      description:
        "Buscar vinos de Mendoza ordenados por año (más recientes primero)",
    },
    {
      name: "Consulta por precio y categoría (price + category)",
      query: () =>
        db
          .collection("wines")
          .where("category", "==", "Blancos")
          .orderBy("price")
          .limit(3),
      description:
        "Buscar vinos blancos ordenados por precio (más baratos primero)",
    },
  ];

  let successCount = 0;
  let failCount = 0;

  for (const test of tests) {
    try {
      console.log(`🔍 Ejecutando: ${test.name}`);
      console.log(`   ${test.description}`);

      const startTime = Date.now();
      const snapshot = await test.query().get();
      const duration = Date.now() - startTime;

      console.log(`   ✅ Éxito: ${snapshot.size} resultados en ${duration}ms`);

      // Mostrar algunos resultados
      if (snapshot.size > 0) {
        snapshot.docs.slice(0, 2).forEach((doc) => {
          const wine = doc.data();
          console.log(
            `      - ${wine.name} (${wine.category}, $${wine.price})`
          );
        });
      }

      successCount++;
      console.log("");
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);

      // Verificar si es un error de índice faltante
      if (error.message.includes("index")) {
        console.log(
          `   💡 Solución: Crear el índice faltante en Firebase Console`
        );
        if (error.message.includes("https://")) {
          const indexUrl = error.message.match(/https:\/\/[^\s]+/)?.[0];
          if (indexUrl) {
            console.log(`   🔗 Crear índice: ${indexUrl}`);
          }
        }
      }

      failCount++;
      console.log("");
    }
  }

  // Resumen
  console.log("📊 Resumen de Pruebas:");
  console.log(`✅ Consultas exitosas: ${successCount}`);
  console.log(`❌ Consultas fallidas: ${failCount}`);

  if (failCount === 0) {
    console.log("\n🎉 ¡Todos los índices están funcionando correctamente!");
    console.log("✅ Tu base de datos está optimizada para consultas complejas");
  } else {
    console.log("\n⚠️  Algunos índices necesitan ser creados");
    console.log("📋 Sigue la guía en FIRESTORE-INDEXES-GUIDE.md");
    console.log("🔗 O ve a: https://console.firebase.google.com/");
  }

  process.exit(failCount === 0 ? 0 : 1);
};

// Ejecutar pruebas
testIndexes().catch((error) => {
  console.error("💥 Error ejecutando pruebas:", error);
  process.exit(1);
});
