#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🔍 Verificando dependencias de HeroUI...");

const requiredPackages = [
  "@heroui/button",
  "@heroui/card",
  "@heroui/input",
  "@heroui/navbar",
  "@heroui/link",
  "@heroui/modal",
  "@heroui/table",
  "@heroui/theme",
  "@heroui/system",
];

let allPackagesFound = true;

requiredPackages.forEach((pkg) => {
  try {
    const pkgPath = path.join(
      process.cwd(),
      "node_modules",
      pkg,
      "package.json"
    );
    if (fs.existsSync(pkgPath)) {
      const pkgInfo = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
      console.log(`✅ ${pkg} v${pkgInfo.version} - OK`);
    } else {
      console.log(`❌ ${pkg} - NOT FOUND`);
      allPackagesFound = false;
    }
  } catch (error) {
    console.log(`❌ ${pkg} - ERROR: ${error.message}`);
    allPackagesFound = false;
  }
});

if (allPackagesFound) {
  console.log("🎉 Todas las dependencias de HeroUI están disponibles!");
  process.exit(0);
} else {
  console.log("💥 Faltan algunas dependencias de HeroUI!");
  console.log("Ejecuta: npm install --force");
  process.exit(1);
}
