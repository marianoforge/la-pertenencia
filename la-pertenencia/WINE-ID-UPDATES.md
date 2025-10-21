# Actualizaciones del Sistema de Vinos

## Cambios Realizados

### 1. Corrección en la Visualización de Bodega

✅ Se corrigió el componente `WineDetail.tsx` para que muestre correctamente el campo `bodega` en la sección de características del vino.

### 2. Nuevo Formato de IDs para Vinos

✅ Ahora los vinos se crean con IDs personalizados en el siguiente formato:

```
marca-varietal-uid
```

**Ejemplo:** `casa-de-toro-malbec-lq9x8z2a1`

**Beneficios:**

- IDs legibles y descriptivos
- Fácil identificación del vino
- URLs amigables para SEO
- Sin caracteres especiales ni acentos

### 3. Borrado Automático de Imágenes

✅ Cuando se elimina un vino, ahora también se borra automáticamente la imagen asociada de Firebase Storage.

**Comportamiento:**

- Solo borra imágenes alojadas en Firebase Storage
- No intenta borrar placeholders o imágenes externas
- Si falla el borrado de la imagen, el vino se elimina igualmente

### 4. Script para Borrar Todos los Vinos

✅ Se creó el script `delete-all-wines.ts` para limpiar la colección de vinos.

## Cómo Usar el Script de Borrado

### Opción 1: Usando ts-node directamente

```bash
npx ts-node la-pertenencia/scripts/delete-all-wines.ts
```

### Opción 2: Agregar un script en package.json

Agrega esto en la sección `scripts` de tu `package.json`:

```json
"delete-wines": "ts-node scripts/delete-all-wines.ts"
```

Y luego ejecuta:

```bash
npm run delete-wines
```

## Configuración Necesaria

Asegúrate de tener las siguientes variables de entorno configuradas:

```env
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-project-id
FIREBASE_CLIENT_EMAIL=tu-service-account-email
FIREBASE_PRIVATE_KEY=tu-private-key
```

## Flujo de Trabajo Recomendado

1. **Borrar vinos existentes:**

   ```bash
   npx ts-node la-pertenencia/scripts/delete-all-wines.ts
   ```

2. **Crear nuevos vinos:**

   - Usa el panel de administración en `/admin`
   - Los vinos se crearán automáticamente con el nuevo formato de ID
   - Las imágenes se subirán con nombres consistentes

3. **Eliminar vinos:**
   - Usa el panel de administración
   - La imagen se borrará automáticamente de Storage

## Ejemplo de Uso en el Admin Panel

```typescript
// Al crear un vino nuevo, el ID se genera automáticamente:
// Marca: "Casa de Toro"
// Varietal: "Malbec"
// ID generado: "casa-de-toro-malbec-lq9x8z2a1"

// La imagen se sube con el mismo ID:
// Ruta: images/wines/casa-de-toro-malbec-lq9x8z2a1_1234567890.jpg
```

## Estructura de Archivos Modificados

```
la-pertenencia/
├── lib/
│   └── firestore.ts              # Funciones addWine y deleteWine actualizadas
├── components/
│   ├── admin/
│   │   └── WineAdminPanel.tsx    # Usa generateWineId para imágenes
│   └── wines/
│       └── WineDetail.tsx        # Muestra bodega correctamente
└── scripts/
    └── delete-all-wines.ts       # Nuevo script para borrar todos los vinos
```

## Notas Importantes

⚠️ **ADVERTENCIA:** El script `delete-all-wines.ts` borra TODOS los vinos de la colección sin pedir confirmación. Úsalo con precaución.

💡 **Tip:** Antes de ejecutar el script de borrado, considera hacer un backup de tus datos exportando la colección desde la consola de Firebase.

## Función generateWineId

La función que genera los IDs personalizados:

```typescript
export const generateWineId = (marca: string, varietal: string): string => {
  // 1. Limpia la marca (remove accents, lowercase, replace spaces with hyphens)
  const cleanMarca = marca
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]/g, "-") // Replace non-alphanumeric
    .replace(/-+/g, "-") // Single hyphens
    .replace(/^-|-$/g, ""); // No leading/trailing hyphens

  // 2. Limpia el varietal (same process)
  const cleanVarietal = varietal
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  // 3. Genera un UID único corto
  const uid = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

  // 4. Combina todo
  return `${cleanMarca}-${cleanVarietal}-${uid}`;
};
```

## Próximos Pasos

1. ✅ Ejecutar el script para borrar los vinos antiguos
2. ✅ Crear vinos nuevos con el formato actualizado
3. ✅ Verificar que las imágenes se borren correctamente al eliminar vinos
4. ✅ Confirmar que la bodega se muestre en la página de detalle

---

**Fecha de actualización:** 2025-10-21  
**Versión:** 1.0.0
