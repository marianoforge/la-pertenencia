# 🔒 Guía: Configurar Reglas de Seguridad en Firebase

## 🎯 Objetivo
Configurar reglas de seguridad para proteger tu base de datos Firestore y Firebase Storage.

## 📋 Reglas Creadas

### ✅ Firestore Rules (`firebase-rules/firestore.rules`)
- **Vinos**: Lectura pública, escritura autenticada con validación
- **Usuarios**: Privado a cada usuario
- **Pedidos**: Privado al dueño del pedido
- **Categorías**: Lectura pública, escritura solo admin
- **Chat/Soporte**: Configurado para sistema de ayuda

### ✅ Storage Rules (`firebase-rules/storage.rules`)
- **Imágenes de vinos**: Lectura pública, escritura autenticada
- **Avatares de usuario**: Privado a cada usuario
- **Galería**: Lectura pública, escritura solo admin
- **Validación de archivos**: Tamaño y tipo de imagen

## 🚀 Configuración Paso a Paso

### 1. Configurar Firestore Rules

#### Acceder a Firestore Rules:
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto **la-pertenencia**
3. En el menú lateral: **Firestore Database**
4. Pestaña: **Rules** (Reglas)

#### Aplicar las reglas:
1. **Elimina** todo el contenido actual del editor
2. **Copia** todo el contenido de `firebase-rules/firestore.rules`
3. **Pega** en el editor de Firebase Console
4. Haz clic en **Publish** (Publicar)

### 2. Configurar Storage Rules

#### Acceder a Storage Rules:
1. En Firebase Console, ve a **Storage**
2. Pestaña: **Rules** (Reglas)

#### Aplicar las reglas:
1. **Elimina** todo el contenido actual del editor
2. **Copia** todo el contenido de `firebase-rules/storage.rules`
3. **Pega** en el editor de Firebase Console
4. Haz clic en **Publish** (Publicar)

## ⚙️ Configuración de Administradores

### Obtener tu UID de Firebase Auth:

#### Método 1: Desde Firebase Console
1. Ve a **Authentication > Users**
2. Crea un usuario de prueba o usa uno existente
3. Copia el **UID** del usuario

#### Método 2: Desde tu app
```tsx
import { useAuth } from '@/hooks/useAuth';

function GetMyUID() {
  const { user } = useAuth();
  
  console.log('Mi UID:', user?.uid);
  return <div>UID: {user?.uid}</div>;
}
```

### Actualizar reglas con tu UID:

#### En firestore.rules:
```javascript
function isAdmin(userId) {
  return userId in [
    'TU_UID_AQUI',        // Reemplaza con tu UID real
    'OTRO_ADMIN_UID'      // Agrega más admins si necesitas
  ];
}
```

#### En storage.rules:
```javascript
function isAdmin() {
  return request.auth.uid in [
    'TU_UID_AQUI',        // Reemplaza con tu UID real
    'OTRO_ADMIN_UID'      // Agrega más admins si necesitas
  ];
}
```

## 🧪 Probar las Reglas

### Usando Firebase Console:
1. Ve a **Firestore Database > Rules**
2. Haz clic en **Rules Playground**
3. Prueba diferentes escenarios:
   - Usuario autenticado leyendo vinos ✅
   - Usuario no autenticado escribiendo vinos ❌
   - Usuario leyendo datos de otro usuario ❌

### Usando tu aplicación:
```tsx
// Este código debería funcionar
const wines = await getAllWines(); // ✅ Lectura pública

// Este código debería requerir autenticación
await addWine(newWineData); // ✅ Solo si estás logueado
```

## 📊 Resumen de Permisos

### 🍷 **Wines Collection**
| Acción | Usuario Anónimo | Usuario Autenticado | Admin |
|--------|-----------------|-------------------|-------|
| Leer | ✅ | ✅ | ✅ |
| Crear | ❌ | ✅ | ✅ |
| Editar | ❌ | ✅ | ✅ |
| Eliminar | ❌ | ✅ | ✅ |

### 👤 **Users Collection**
| Acción | Usuario Anónimo | Dueño | Otros Usuarios | Admin |
|--------|-----------------|-------|----------------|-------|
| Leer | ❌ | ✅ | ❌ | ❌ |
| Escribir | ❌ | ✅ | ❌ | ❌ |

### 📦 **Orders Collection**
| Acción | Usuario Anónimo | Dueño del Pedido | Otros Usuarios | Admin |
|--------|-----------------|------------------|----------------|-------|
| Leer | ❌ | ✅ | ❌ | ❌ |
| Escribir | ❌ | ✅ | ❌ | ❌ |

### 🖼️ **Storage Images**
| Tipo | Lectura | Escritura | Límite Tamaño |
|------|---------|-----------|---------------|
| Vinos | 🌐 Pública | 🔒 Autenticada | 3MB |
| Avatares | 🔒 Privada | 🔒 Dueño | 1MB |
| Galería | 🌐 Pública | 🔒 Solo Admin | 10MB |

## 🚨 Validaciones Implementadas

### Firestore:
- ✅ Datos de vino válidos (nombre, precio, categoría, etc.)
- ✅ Categorías predefinidas: Tintos, Blancos, Rosados, Espumantes
- ✅ Año de cosecha razonable (1900-2030)
- ✅ Precio positivo

### Storage:
- ✅ Solo imágenes (JPEG, PNG, WebP)
- ✅ Límites de tamaño por tipo
- ✅ Usuarios solo pueden acceder a sus archivos privados

## 🔍 Solución de Problemas

### Error: "Missing or insufficient permissions"
- **Causa**: Usuario no autenticado intentando escribir
- **Solución**: Asegúrate de que el usuario esté logueado

### Error: "Validation failed"
- **Causa**: Datos no cumplen validaciones
- **Solución**: Verifica formato de datos (ej: categoría válida)

### Error: "Storage unauthorized"
- **Causa**: Intentando subir archivo no válido
- **Solución**: Verifica tipo y tamaño de archivo

### No puedo acceder como admin
- **Causa**: UID no configurado en reglas
- **Solución**: Actualiza las reglas con tu UID real

## ✅ Verificación Final

Después de aplicar las reglas, verifica:

1. **Firestore Rules publicadas** ✅
2. **Storage Rules publicadas** ✅
3. **UIDs de admin actualizados** ✅
4. **Pruebas en Rules Playground** ✅

## 🔗 Enlaces Útiles

- [Firebase Rules Documentation](https://firebase.google.com/docs/rules)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Storage Security Rules](https://firebase.google.com/docs/storage/security)

## 🚀 Próximo Paso

Una vez configuradas las reglas, estarás listo para el **Paso 3: Configurar Authentication** 