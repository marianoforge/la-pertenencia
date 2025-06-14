#!/usr/bin/env tsx

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config({ path: ".env.local" });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function getAdminUID() {
  try {
    console.log("🔐 Obteniendo UID de Administrador para La Pertenencia");
    console.log("=".repeat(50));

    // Solicitar credenciales
    const email = process.argv[2] || process.env.ADMIN_EMAIL;
    const password = process.argv[3] || process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.log("❌ Falta email o contraseña");
      console.log("\n📝 Uso:");
      console.log("npm run get-admin-uid <email> <password>");
      console.log("\n💡 O agrega estas variables a tu .env.local:");
      console.log("ADMIN_EMAIL=tu@email.com");
      console.log("ADMIN_PASSWORD=tucontraseña");
      process.exit(1);
    }

    console.log(`📧 Email: ${email}`);
    console.log("🔐 Intentando autenticar...");

    // Iniciar sesión
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("\n✅ Autenticación exitosa!");
    console.log("=".repeat(50));
    console.log("👤 Información del Admin:");
    console.log(`📧 Email: ${user.email}`);
    console.log(`👨‍💼 Nombre: ${user.displayName || "No establecido"}`);
    console.log(`🆔 UID: ${user.uid}`);
    console.log(`✅ Verificado: ${user.emailVerified ? "Sí" : "No"}`);
    console.log(`📅 Creado: ${user.metadata.creationTime}`);
    console.log("=".repeat(50));

    console.log("\n🔧 Configuración de Admin:");
    console.log("1. Copia este UID en las reglas de Firebase:");
    console.log("");
    console.log("📄 En firebase-rules/firestore.rules:");
    console.log("```javascript");
    console.log("function isAdmin(userId) {");
    console.log("  return userId in [");
    console.log(`    '${user.uid}',  // Admin principal`);
    console.log("    // Agrega más UIDs aquí si necesitas");
    console.log("  ];");
    console.log("}");
    console.log("```");
    console.log("");
    console.log("📄 En firebase-rules/storage.rules:");
    console.log("```javascript");
    console.log("function isAdmin() {");
    console.log("  return request.auth.uid in [");
    console.log(`    '${user.uid}',  // Admin principal`);
    console.log("    // Agrega más UIDs aquí si necesitas");
    console.log("  ];");
    console.log("}");
    console.log("```");

    console.log("\n📋 Próximos pasos:");
    console.log("1. ✅ Copia el UID de arriba");
    console.log("2. 📝 Actualiza las reglas de Firebase con tu UID");
    console.log("3. 🚀 Republica las reglas en Firebase Console");
    console.log("4. 🧪 Prueba el panel de admin");

    process.exit(0);
  } catch (error: any) {
    console.error("\n❌ Error:", error.message);

    if (error.code === "auth/user-not-found") {
      console.log("\n💡 El usuario no existe. Opciones:");
      console.log(
        "1. Crea el usuario desde Firebase Console > Authentication > Users > Add user"
      );
      console.log("2. O usa el componente de registro en tu app");
    } else if (error.code === "auth/wrong-password") {
      console.log("\n💡 Contraseña incorrecta. Verifica tus credenciales.");
    } else if (error.code === "auth/invalid-email") {
      console.log("\n💡 Email inválido. Verifica el formato.");
    }

    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  getAdminUID();
}

export { getAdminUID };
