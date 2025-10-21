#!/usr/bin/env node

/**
 * Script de Verificación de Configuración del Admin
 *
 * Este script verifica que el sistema de autenticación del admin
 * esté configurado correctamente.
 *
 * Uso: node scripts/verify-admin-setup.js
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 Verificando configuración del sistema de admin...\n");

let errorsFound = 0;
let warningsFound = 0;

// Colores para la terminal
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

function success(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function error(message) {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
  errorsFound++;
}

function warning(message) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
  warningsFound++;
}

function info(message) {
  console.log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
}

// 1. Verificar que existan los archivos necesarios
console.log("📁 Verificando archivos...");

const requiredFiles = [
  "hooks/useIsAdmin.ts",
  "components/auth/LoginForm.tsx",
  "components/admin/AdminPanel.tsx",
  "firebase-rules/firestore.rules",
  "lib/firebase.ts",
];

requiredFiles.forEach((file) => {
  const filePath = path.join(__dirname, "..", file);
  if (fs.existsSync(filePath)) {
    success(`Archivo encontrado: ${file}`);
  } else {
    error(`Archivo NO encontrado: ${file}`);
  }
});

console.log("");

// 2. Verificar configuración en useIsAdmin.ts
console.log("🔐 Verificando configuración de administradores...");

const useIsAdminPath = path.join(__dirname, "..", "hooks/useIsAdmin.ts");
if (fs.existsSync(useIsAdminPath)) {
  const content = fs.readFileSync(useIsAdminPath, "utf8");

  // Buscar la línea de ADMIN_UIDS
  const adminUidsRegex = /const ADMIN_UIDS\s*=\s*\[([\s\S]*?)\]/;
  const match = content.match(adminUidsRegex);

  if (match) {
    const uidsContent = match[1];

    // Contar UIDs (excluir comentarios y líneas vacías)
    const uids = uidsContent
      .split("\n")
      .filter((line) => {
        const trimmed = line.trim();
        return trimmed && !trimmed.startsWith("//") && trimmed !== ",";
      })
      .map((line) => line.trim().replace(/["',]/g, ""))
      .filter((uid) => uid && !uid.startsWith("//"));

    if (uids.length === 0) {
      error("No hay UIDs configurados en hooks/useIsAdmin.ts");
      info("  → Agrega tu UID en el array ADMIN_UIDS");
    } else if (
      uids.some(
        (uid) =>
          uid.includes("ADMIN_UID") ||
          uid.includes("tu-uid") ||
          uid.includes("PEGA-TU-UID")
      )
    ) {
      warning("Hay UIDs de ejemplo en hooks/useIsAdmin.ts");
      info("  → Reemplaza los UIDs de ejemplo con tu UID real");
    } else {
      success(`${uids.length} UID(s) configurado(s) en hooks/useIsAdmin.ts`);
      uids.forEach((uid, index) => {
        info(`  → Admin ${index + 1}: ${uid.substring(0, 10)}...`);
      });
    }
  } else {
    error(
      "No se encontró la configuración de ADMIN_UIDS en hooks/useIsAdmin.ts"
    );
  }
} else {
  error("Archivo hooks/useIsAdmin.ts no encontrado");
}

console.log("");

// 3. Verificar configuración en firestore.rules
console.log("🔥 Verificando reglas de Firestore...");

const firestoreRulesPath = path.join(
  __dirname,
  "..",
  "firebase-rules/firestore.rules"
);
if (fs.existsSync(firestoreRulesPath)) {
  const content = fs.readFileSync(firestoreRulesPath, "utf8");

  // Buscar la función isAdmin
  const isAdminRegex =
    /function isAdmin\(userId\)\s*\{[\s\S]*?return userId in \[([\s\S]*?)\];/;
  const match = content.match(isAdminRegex);

  if (match) {
    const uidsContent = match[1];

    // Contar UIDs en las reglas
    const uids = uidsContent
      .split("\n")
      .filter((line) => {
        const trimmed = line.trim();
        return trimmed && !trimmed.startsWith("//") && trimmed !== ",";
      })
      .map((line) => line.trim().replace(/['",]/g, ""))
      .filter((uid) => uid && !uid.startsWith("//"));

    if (uids.length === 0) {
      error("No hay UIDs configurados en firestore.rules");
      info("  → Agrega tu UID en la función isAdmin()");
    } else if (
      uids.some(
        (uid) =>
          uid.includes("ADMIN_UID") ||
          uid.includes("tu-uid") ||
          uid.includes("PEGA-TU-UID")
      )
    ) {
      warning("Hay UIDs de ejemplo en firestore.rules");
      info("  → Reemplaza los UIDs de ejemplo con tu UID real");
    } else {
      success(`${uids.length} UID(s) configurado(s) en firestore.rules`);
      uids.forEach((uid, index) => {
        info(`  → Admin ${index + 1}: ${uid.substring(0, 10)}...`);
      });
    }
  } else {
    error("No se encontró la función isAdmin() en firestore.rules");
  }
} else {
  error("Archivo firebase-rules/firestore.rules no encontrado");
}

console.log("");

// 4. Verificar variables de entorno de Firebase
console.log("🔧 Verificando variables de entorno...");

const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  success("Archivo .env.local encontrado");

  const envContent = fs.readFileSync(envPath, "utf8");
  const requiredEnvVars = [
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    "NEXT_PUBLIC_FIREBASE_APP_ID",
  ];

  requiredEnvVars.forEach((envVar) => {
    if (envContent.includes(envVar)) {
      success(`Variable configurada: ${envVar}`);
    } else {
      error(`Variable NO configurada: ${envVar}`);
    }
  });
} else {
  error("Archivo .env.local NO encontrado");
  info("  → Crea el archivo .env.local con las credenciales de Firebase");
}

console.log("");

// 5. Verificar documentación
console.log("📖 Verificando documentación...");

const docsFiles = [
  "LEEME-PRIMERO.md",
  "README-ADMIN-AUTH.md",
  "SETUP-ADMIN-QUICKSTART.md",
  "GUIA-VISUAL-ADMIN.md",
  "IMPLEMENTACION-ADMIN-AUTH.md",
];

docsFiles.forEach((file) => {
  const filePath = path.join(__dirname, "..", file);
  if (fs.existsSync(filePath)) {
    success(`Documentación encontrada: ${file}`);
  } else {
    warning(`Documentación NO encontrada: ${file}`);
  }
});

console.log("");

// Resumen final
console.log("═══════════════════════════════════════════════════════════");
console.log(`${colors.blue}📊 RESUMEN DE VERIFICACIÓN${colors.reset}`);
console.log("═══════════════════════════════════════════════════════════");

if (errorsFound === 0 && warningsFound === 0) {
  console.log(
    `${colors.green}✅ ¡Todo perfecto! No se encontraron errores ni advertencias.${colors.reset}`
  );
  console.log("");
  console.log("🎉 Tu sistema de autenticación está listo para usar.");
  console.log("");
  console.log("Próximos pasos:");
  console.log("1. Inicia el servidor: npm run dev");
  console.log("2. Ve a http://localhost:3002/login");
  console.log("3. Inicia sesión con tu email y contraseña");
  console.log("4. ¡Disfruta de tu admin!");
} else {
  if (errorsFound > 0) {
    console.log(
      `${colors.red}❌ Se encontraron ${errorsFound} error(es)${colors.reset}`
    );
  }
  if (warningsFound > 0) {
    console.log(
      `${colors.yellow}⚠️  Se encontraron ${warningsFound} advertencia(s)${colors.reset}`
    );
  }
  console.log("");
  console.log(
    "Por favor, revisa los mensajes de arriba y corrige los problemas."
  );
  console.log("");
  console.log("Consulta la documentación:");
  console.log("- LEEME-PRIMERO.md (guía rápida)");
  console.log("- README-ADMIN-AUTH.md (guía completa)");
}

console.log("═══════════════════════════════════════════════════════════");

process.exit(errorsFound > 0 ? 1 : 0);
