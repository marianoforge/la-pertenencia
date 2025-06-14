/**
 * Script para verificar la configuración del proyecto Firebase
 * Run with: node scripts/check-firebase-project.js
 */

// Load environment variables
require("dotenv").config({ path: ".env.local" });

const admin = require("firebase-admin");

const checkFirebaseProject = async () => {
  console.log("🔍 Verificando configuración del proyecto Firebase...\n");

  // Verificar variables de entorno
  const envVars = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };

  console.log("📋 Variables de entorno:");
  console.log(`✅ Project ID: ${envVars.projectId}`);
  console.log(`✅ Client Email: ${envVars.clientEmail?.substring(0, 30)}...`);
  console.log(
    `✅ Private Key: ${envVars.privateKey ? "Configurada" : "Faltante"}\n`
  );

  if (!envVars.projectId || !envVars.privateKey || !envVars.clientEmail) {
    console.error("❌ Faltan variables de entorno críticas");
    return;
  }

  // Inicializar Firebase Admin
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: envVars.projectId,
          privateKey: envVars.privateKey.replace(/\\n/g, "\n"),
          clientEmail: envVars.clientEmail,
        }),
        projectId: envVars.projectId,
      });
    }
    console.log("✅ Firebase Admin SDK inicializado correctamente\n");
  } catch (error) {
    console.error("❌ Error inicializando Firebase Admin:", error.message);
    return;
  }

  // Verificar acceso a Firestore
  try {
    const db = admin.firestore();
    const testDoc = await db.collection("wines").limit(1).get();
    console.log(
      `✅ Firestore: Acceso correcto (${testDoc.size} documentos encontrados)`
    );
  } catch (error) {
    console.error("❌ Firestore: Error de acceso:", error.message);
  }

  // Verificar Storage
  try {
    const bucket = admin.storage().bucket();
    const bucketName = bucket.name;
    console.log(`✅ Storage: Bucket configurado - ${bucketName}`);
  } catch (error) {
    console.error("❌ Storage: Error de configuración:", error.message);
  }

  // Información del proyecto
  console.log("\n📊 Información del proyecto:");
  console.log(`🏷️  Project ID: ${envVars.projectId}`);
  console.log(
    `🔗 Firebase Console: https://console.firebase.google.com/project/${envVars.projectId}`
  );
  console.log(
    `🔗 Storage Console: https://console.firebase.google.com/project/${envVars.projectId}/storage`
  );
  console.log(
    `🔗 Firestore Console: https://console.firebase.google.com/project/${envVars.projectId}/firestore`
  );

  // Soluciones recomendadas
  console.log("\n🛠️  Si Storage Rules fallan, intenta:");
  console.log("1. Cerrar sesión y volver a entrar en Firebase Console");
  console.log("2. Usar modo incógnito en el navegador");
  console.log("3. Verificar que Storage esté habilitado en el proyecto");
  console.log("4. Verificar permisos de tu cuenta en el proyecto");
  console.log("5. Esperar unos minutos y reintentar");
};

checkFirebaseProject().catch((error) => {
  console.error("💥 Error verificando proyecto:", error);
});
