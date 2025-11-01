# 🔐 Guía de Autenticación de Administradores

## Descripción General

Este sistema implementa autenticación con email/contraseña y Google para el panel de administración de La Pertenencia, usando Firebase Authentication.

## 🚀 Configuración Inicial

### 1. Crear el Primer Usuario Administrador

#### Opción A: Con Email y Contraseña

1. **Ve a Firebase Console**

   - Abre [Firebase Console](https://console.firebase.google.com/)
   - Selecciona tu proyecto "La Pertenencia"
   - Ve a **Authentication** > **Users**

2. **Crea un nuevo usuario**

   - Haz clic en "Add user"
   - Ingresa el email del administrador
   - Ingresa una contraseña segura
   - Haz clic en "Add user"

3. **Copia el UID**
   - Una vez creado el usuario, copia su UID (aparece en la columna "User UID")
   - Lo necesitarás para el siguiente paso

#### Opción B: Crear Usuario desde el Login

1. **Ve a la página de login**
   - Accede a `/login` en tu aplicación
2. **Inicia sesión** (puedes crear una cuenta nueva si Firebase lo permite)

   - Usa email y contraseña
   - O inicia sesión con Google

3. **Ve al admin**
   - Intenta acceder a `/admin`
   - Verás tu UID en un cuadro informativo
   - Copia ese UID

### 2. Configurar los Permisos de Administrador

#### A. Actualizar el Hook de Validación (Frontend)

1. **Edita el archivo:** `hooks/useIsAdmin.ts`

2. **Agrega tu UID** a la lista de administradores:

```typescript
const ADMIN_UIDS = [
  "tu-uid-aqui", // Reemplaza con tu UID real
  // Puedes agregar más UIDs aquí:
  // "otro-admin-uid",
];
```

**Ejemplo:**

```typescript
const ADMIN_UIDS = [
  "abc123XYZ456def789", // Admin principal
  "xyz789ABC123ghi456", // Segundo admin
];
```

#### B. Actualizar las Reglas de Firestore (Backend)

1. **Edita el archivo:** `firebase-rules/firestore.rules`

2. **Actualiza la función `isAdmin`** (línea 155):

```javascript
function isAdmin(userId) {
  return (
    userId in
    [
      "tu-uid-aqui", // Reemplaza con tu UID real
      // Agrega más UIDs si es necesario:
      // 'otro-admin-uid'
    ]
  );
}
```

**Ejemplo:**

```javascript
function isAdmin(userId) {
  return (
    userId in
    [
      "abc123XYZ456def789", // Admin principal
      "xyz789ABC123ghi456", // Segundo admin
    ]
  );
}
```

3. **Despliega las reglas a Firebase:**

```bash
firebase deploy --only firestore:rules
```

### 3. Verificar que Todo Funcione

1. **Recarga la aplicación**

   - Cierra sesión si ya estás logueado
   - Vuelve a iniciar sesión con el usuario administrador

2. **Accede al admin**

   - Ve a `/admin`
   - Deberías ver el badge "Admin Activo" en verde
   - Verás un mensaje "✅ Tienes permisos completos de administrador"

3. **Prueba las funcionalidades**
   - Intenta crear, editar o eliminar un vino
   - Intenta crear, editar o eliminar un combo
   - Todo debería funcionar correctamente

## 📋 Flujo de Autenticación

```
Usuario visita /admin
    ↓
¿Está autenticado?
    ├─ No → Redirige a /login
    └─ Sí → Verifica si es admin
              ├─ No → Muestra mensaje de "No tienes permisos"
              └─ Sí → Muestra panel completo con badge "Admin Activo"
```

## 🔑 Métodos de Autenticación Disponibles

### 1. Email y Contraseña

- Login en `/login`
- Ingresa email y contraseña
- Redirección automática a `/admin` si es exitoso

### 2. Google OAuth

- Login en `/login`
- Haz clic en "Continuar con Google"
- Selecciona tu cuenta de Google
- Redirección automática a `/admin` si es exitoso

## 🛡️ Seguridad

### Niveles de Protección

1. **Frontend (React/Next.js)**

   - Hook `useIsAdmin` verifica el UID del usuario
   - Redirecciones automáticas si no está autenticado
   - UI condicional basada en permisos

2. **Backend (Firestore Rules)**
   - Función `isAdmin()` en las reglas de Firestore
   - Solo usuarios en la lista pueden modificar datos
   - Lecturas públicas, escrituras solo para admins

### Mejores Prácticas

1. **No hardcodear contraseñas** en el código
2. **Usar contraseñas fuertes** (mínimo 12 caracteres)
3. **Habilitar 2FA** en las cuentas de Google usadas para admin
4. **Revisar regularmente** la lista de UIDs de administradores
5. **Eliminar usuarios** que ya no deberían tener acceso

## 🔧 Mantenimiento

### Agregar un Nuevo Administrador

1. El nuevo usuario debe crear una cuenta (email/password o Google)
2. Obtén su UID (puede verlo en `/admin`)
3. Agrega el UID a `hooks/useIsAdmin.ts`
4. Agrega el UID a `firebase-rules/firestore.rules`
5. Despliega las reglas: `firebase deploy --only firestore:rules`

### Remover un Administrador

1. Elimina su UID de `hooks/useIsAdmin.ts`
2. Elimina su UID de `firebase-rules/firestore.rules`
3. Despliega las reglas: `firebase deploy --only firestore:rules`
4. (Opcional) Elimina el usuario de Firebase Console

### Recuperación de Contraseña

Si un administrador olvida su contraseña:

1. Ve a `/login`
2. Haz clic en "¿Olvidaste tu contraseña?" (si implementado)
3. O usa Firebase Console:
   - Authentication > Users
   - Encuentra al usuario
   - Haz clic en los tres puntos → "Reset password"
   - Se enviará un email de recuperación

## 📝 Archivos Relacionados

```
/hooks
  ├── useAuth.ts          # Hook de autenticación general
  └── useIsAdmin.ts       # Hook de verificación de admin

/components
  ├── auth/
  │   └── LoginForm.tsx   # Formulario de login
  └── admin/
      └── AdminPanel.tsx  # Panel de administración

/pages
  ├── login.tsx           # Página de login
  └── admin/
      └── index.tsx       # Página de admin

/firebase-rules
  └── firestore.rules     # Reglas de seguridad de Firestore

/lib
  └── firebase.ts         # Configuración de Firebase
```

## 🐛 Solución de Problemas

### "No tienes permisos de administrador"

**Causa:** Tu UID no está en la lista de administradores.

**Solución:**

1. Copia tu UID del mensaje en el admin
2. Agrégalo a `hooks/useIsAdmin.ts`
3. Agrégalo a `firebase-rules/firestore.rules`
4. Despliega las reglas
5. Recarga la página

### "Error al iniciar sesión"

**Causas posibles:**

- Credenciales incorrectas
- Usuario no existe en Firebase
- Configuración incorrecta de Firebase

**Solución:**

1. Verifica que el email y contraseña sean correctos
2. Verifica que el usuario exista en Firebase Console
3. Verifica las credenciales en `.env.local`

### Redirección infinita

**Causa:** Error en las rutas de autenticación.

**Solución:**

1. Limpia las cookies del navegador
2. Cierra sesión completamente
3. Vuelve a iniciar sesión

### No puedo modificar vinos/combos

**Causa:** Las reglas de Firestore no están actualizadas o tu UID no está incluido.

**Solución:**

1. Verifica que tu UID esté en `firestore.rules`
2. Despliega las reglas: `firebase deploy --only firestore:rules`
3. Espera 1-2 minutos para que se propaguen los cambios

## 🎯 Próximos Pasos

Una vez configurado el sistema de autenticación:

1. **Agregar recuperación de contraseña** en el login
2. **Implementar roles** (admin, editor, viewer) si es necesario
3. **Agregar logs de auditoría** para cambios importantes
4. **Implementar sesiones con duración limitada**
5. **Agregar notificaciones** de actividad sospechosa

## 📞 Soporte

Si tienes problemas con la autenticación:

1. Revisa los logs de la consola del navegador
2. Revisa los logs de Firebase en la consola
3. Verifica que todas las configuraciones estén correctas
4. Consulta la documentación de [Firebase Authentication](https://firebase.google.com/docs/auth)

---

**Última actualización:** Octubre 2025
**Autor:** Sistema de Autenticación La Pertenencia








