# ⚡ Configuración Rápida del Admin

## 🎯 5 Pasos para Activar tu Admin

### 1️⃣ Crea tu usuario en Firebase

**Opción A - Firebase Console:**

```
1. Ve a console.firebase.google.com
2. Authentication > Users > "Add user"
3. Ingresa tu email y contraseña
4. Copia el UID que se genera
```

**Opción B - Desde la App:**

```
1. Ve a /login en tu app
2. Inicia sesión (email/password o Google)
3. Ve a /admin
4. Copia el UID que aparece en pantalla
```

### 2️⃣ Agrega tu UID al frontend

**Archivo:** `hooks/useIsAdmin.ts`

```typescript
const ADMIN_UIDS = [
  "PEGA-TU-UID-AQUI", // 👈 Reemplaza esto
];
```

### 3️⃣ Agrega tu UID a las reglas de Firebase

**Archivo:** `firebase-rules/firestore.rules`

```javascript
function isAdmin(userId) {
  return (
    userId in
    [
      "PEGA-TU-UID-AQUI", // 👈 Reemplaza esto
    ]
  );
}
```

### 4️⃣ Despliega las reglas

```bash
firebase deploy --only firestore:rules
```

### 5️⃣ ¡Listo! Inicia sesión

```
1. Ve a /login
2. Ingresa tu email y contraseña
3. Serás redirigido a /admin automáticamente
4. Verás el badge "Admin Activo" 🎉
```

---

## 🔐 URLs Importantes

- **Login:** `/login`
- **Admin Panel:** `/admin`

## 🆘 ¿Problemas?

**"No tienes permisos"**

- ✅ Verifica que tu UID esté en `useIsAdmin.ts`
- ✅ Verifica que tu UID esté en `firestore.rules`
- ✅ Asegúrate de haber desplegado las reglas
- ✅ Recarga la página

**"Email o contraseña incorrectos"**

- ✅ Verifica las credenciales
- ✅ Verifica que el usuario exista en Firebase Console

---

## 📖 Documentación Completa

Ver: `README-ADMIN-AUTH.md`








