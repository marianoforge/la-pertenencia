/**
 * Script para probar que las reglas de seguridad estén funcionando
 * Run with: node scripts/test-security-rules.js
 */

// Load environment variables
require("dotenv").config({ path: ".env.local" });

const admin = require("firebase-admin");

// Initialize Firebase Admin
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

const testSecurityRules = async () => {
  console.log("🔒 Probando Reglas de Seguridad de Firebase...\n");

  let successCount = 0;
  let failCount = 0;

  // Test 1: Lectura pública de vinos (debería funcionar)
  console.log("🧪 Test 1: Lectura pública de vinos");
  try {
    const winesSnapshot = await db.collection("wines").limit(1).get();
    console.log(
      `   ✅ Éxito: Lectura pública permitida (${winesSnapshot.size} vinos leídos)`
    );
    successCount++;
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    failCount++;
  }

  // Test 2: Intentar crear vino como admin (debería funcionar con reglas correctas)
  console.log("\n🧪 Test 2: Crear vino como admin");
  try {
    const testWineRef = db.collection("wines").doc("test-wine");
    await testWineRef.set({
      name: "Test Wine",
      description: "Vino de prueba",
      price: 1000,
      category: "Tintos",
      region: "Test",
      vintage: 2023,
      cost: 500,
      iva: 21,
      stock: 10,
      alcohol: 14.0,
      featured: false,
      winery: "La Pertenencia",
      image: "/test.jpg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Eliminar el vino de prueba
    await testWineRef.delete();

    console.log("   ✅ Éxito: Escritura de vino permitida para admin");
    successCount++;
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    if (error.message.includes("PERMISSION_DENIED")) {
      console.log(
        "   💡 Nota: Esto es normal si no has configurado tu UID como admin"
      );
    }
    failCount++;
  }

  // Test 3: Verificar estructura de datos existentes
  console.log("\n🧪 Test 3: Verificar estructura de datos");
  try {
    const winesSnapshot = await db.collection("wines").limit(1).get();
    if (!winesSnapshot.empty) {
      const wine = winesSnapshot.docs[0].data();
      const requiredFields = [
        "name",
        "description",
        "price",
        "category",
        "region",
        "vintage",
      ];
      const hasAllFields = requiredFields.every((field) =>
        wine.hasOwnProperty(field)
      );

      if (hasAllFields) {
        console.log("   ✅ Éxito: Estructura de datos válida");
        successCount++;
      } else {
        console.log("   ⚠️  Advertencia: Algunos campos requeridos faltan");
        console.log(`   Campos requeridos: ${requiredFields.join(", ")}`);
        console.log(`   Campos presentes: ${Object.keys(wine).join(", ")}`);
        failCount++;
      }
    } else {
      console.log("   ℹ️  Info: No hay vinos para verificar estructura");
      successCount++;
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    failCount++;
  }

  // Test 4: Verificar que no se puedan crear documentos inválidos
  console.log("\n🧪 Test 4: Intentar crear vino con datos inválidos");
  try {
    const invalidWineRef = db.collection("wines").doc("invalid-wine");
    await invalidWineRef.set({
      name: "", // Nombre vacío (inválido)
      price: -100, // Precio negativo (inválido)
      category: "CategoriaInvalida", // Categoría no permitida
      vintage: 1800, // Año muy antiguo (inválido)
    });

    // Si llegamos aquí, las reglas no están funcionando bien
    await invalidWineRef.delete(); // Limpiar
    console.log(
      "   ⚠️  Advertencia: Se permitió crear vino con datos inválidos"
    );
    console.log("   💡 Verifica que las reglas de validación estén aplicadas");
    failCount++;
  } catch (error) {
    if (
      error.message.includes("PERMISSION_DENIED") ||
      error.message.includes("INVALID_ARGUMENT")
    ) {
      console.log(
        "   ✅ Éxito: Datos inválidos fueron rechazados correctamente"
      );
      successCount++;
    } else {
      console.log(`   ❌ Error inesperado: ${error.message}`);
      failCount++;
    }
  }

  // Resumen
  console.log("\n📊 Resumen de Pruebas de Seguridad:");
  console.log(`✅ Pruebas exitosas: ${successCount}`);
  console.log(`❌ Pruebas fallidas: ${failCount}`);

  if (failCount === 0) {
    console.log("\n🎉 ¡Reglas de seguridad configuradas correctamente!");
    console.log("✅ Tu base de datos está protegida");
  } else {
    console.log("\n⚠️  Algunas reglas necesitan atención");
    console.log("📋 Revisa la guía en FIREBASE-SECURITY-RULES-GUIDE.md");
    console.log("🔗 Firebase Console: https://console.firebase.google.com/");
  }

  // Información adicional
  console.log("\n📝 Notas importantes:");
  console.log(
    "- Para probar completamente, necesitas configurar tu UID como admin"
  );
  console.log("- Las reglas pueden tardar unos minutos en propagarse");
  console.log("- Usa Firebase Rules Playground para pruebas más detalladas");

  process.exit(failCount === 0 ? 0 : 1);
};

// Ejecutar pruebas
testSecurityRules().catch((error) => {
  console.error("💥 Error ejecutando pruebas:", error);
  process.exit(1);
});
