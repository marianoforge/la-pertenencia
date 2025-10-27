# 🔧 Script de Configuración del Primer Administrador

## Pasos Automatizables

### 1. Crear usuario en Firebase (Manual)

Ejecuta esto en tu terminal para abrir Firebase Console:

```bash
open "https://console.firebase.google.com/project/$(node -p "require('./.env.local').NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'tu-proyecto'")/authentication/users"
```

O manualmente:

1. Ve a Firebase Console
2. Selecciona tu proyecto
3. Authentication → Users → Add user
4. Ingresa email y contraseña
5. **Copia el UID**

### 2. Configurar el UID

Una vez que tengas el UID, reemplázalo en estos dos archivos:

**A. Frontend - hooks/useIsAdmin.ts**

```typescript
const ADMIN_UIDS = [
  "TU_UID_AQUI", // 👈 Reemplaza
];
```

**B. Backend - firebase-rules/firestore.rules**

```javascript
function isAdmin(userId) {
  return (
    userId in
    [
      "TU_UID_AQUI", // 👈 Reemplaza
    ]
  );
}
```

### 3. Desplegar Reglas

```bash
# Desplegar solo las reglas de Firestore
firebase deploy --only firestore:rules

# O desplegar todo
firebase deploy
```

### 4. Verificar

```bash
# Iniciar el servidor de desarrollo
npm run dev

# Abre el navegador en:
# - http://localhost:3000/login (para iniciar sesión)
# - http://localhost:3000/admin (para verificar acceso)
```

## Checklist de Verificación

- [ ] Usuario creado en Firebase Authentication
- [ ] UID copiado correctamente
- [ ] UID agregado en `hooks/useIsAdmin.ts`
- [ ] UID agregado en `firebase-rules/firestore.rules`
- [ ] Reglas desplegadas con `firebase deploy --only firestore:rules`
- [ ] Login exitoso en `/login`
- [ ] Acceso confirmado en `/admin`
- [ ] Badge "Admin Activo" visible
- [ ] Mensaje "✅ Tienes permisos completos" visible

## Agregar Más Administradores

Para agregar más admins, simplemente agrega sus UIDs a ambos archivos:

**hooks/useIsAdmin.ts**

```typescript
const ADMIN_UIDS = [
  "primer-admin-uid",
  "segundo-admin-uid", // 👈 Agregar aquí
  "tercer-admin-uid", // 👈 Y aquí
];
```

**firebase-rules/firestore.rules**

```javascript
function isAdmin(userId) {
  return (
    userId in
    [
      "primer-admin-uid",
      "segundo-admin-uid", // 👈 Agregar aquí
      "tercer-admin-uid", // 👈 Y aquí
    ]
  );
}
```

Luego despliega las reglas nuevamente:

```bash
firebase deploy --only firestore:rules
```

## Remover Administradores

1. Elimina el UID de ambos archivos
2. Despliega las reglas
3. (Opcional) Elimina el usuario de Firebase Console

---

**Tip:** Guarda los UIDs de los administradores en un lugar seguro (ej: 1Password, LastPass).




