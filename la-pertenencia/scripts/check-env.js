/**
 * Script para verificar las variables de entorno necesarias para Firebase
 */

require("dotenv").config({ path: ".env.local" });

const requiredVars = {
  // Firebase Admin SDK (for server-side operations)
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,

  // Firebase Client SDK (for frontend)
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log("🔍 Verificando variables de entorno de Firebase...\n");

let missingVars = [];
let presentVars = [];

Object.entries(requiredVars).forEach(([key, value]) => {
  if (!value || value.trim() === "" || value === "your_value_here") {
    missingVars.push(key);
    console.log(`❌ ${key}: MISSING`);
  } else {
    presentVars.push(key);
    // Show only first 10 characters for security
    const preview = value.length > 10 ? value.substring(0, 10) + "..." : value;
    console.log(`✅ ${key}: ${preview}`);
  }
});

console.log("\n📊 Resumen:");
console.log(`✅ Variables configuradas: ${presentVars.length}`);
console.log(`❌ Variables faltantes: ${missingVars.length}`);

if (missingVars.length > 0) {
  console.log("\n🚨 Variables faltantes para migración:");
  missingVars.forEach((varName) => {
    console.log(`   - ${varName}`);
  });

  console.log("\n📋 Para obtener estas credenciales:");
  console.log("1. Ve a https://console.firebase.google.com/");
  console.log("2. Selecciona tu proyecto");
  console.log("3. Ve a Project Settings > Service accounts");
  console.log('4. Haz clic en "Generate new private key"');
  console.log("5. Descarga el archivo JSON");
  console.log("6. Copia los valores al .env.local");

  process.exit(1);
} else {
  console.log("\n🎉 ¡Todas las variables están configuradas!");
  console.log("Ya puedes ejecutar: yarn migrate");
}
