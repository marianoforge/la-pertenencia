# 👁️ Guía Visual: Configuración del Admin

## 🎯 Lo que verás en cada paso

### 1️⃣ Página de Login (`/login`)

```
┌─────────────────────────────────────────┐
│              🍷                         │
│         La Pertenencia                  │
│  Panel de Administración de Vinos      │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ Email del administrador           │ │
│  └───────────────────────────────────┘ │
│  ┌───────────────────────────────────┐ │
│  │ Contraseña                        │ │
│  └───────────────────────────────────┘ │
│                                         │
│  [ Iniciar Sesión ]                    │
│                                         │
│  ────── O continúa con ──────          │
│                                         │
│  [    🔵 Google    ]                   │
│                                         │
│  💡 Para convertirte en administrador: │
│  1. Inicia sesión primero             │
│  2. Copia tu UID que aparecerá        │
│  3. Actualiza las reglas de Firebase  │
│  4. ¡Listo para administrar vinos!    │
└─────────────────────────────────────────┘
```

**Estado: No autenticado**

- ✅ Formulario de email/password
- ✅ Botón de Google OAuth
- ✅ Instrucciones para primer admin

---

### 2️⃣ Después de Login Exitoso (Redirección automática a `/admin`)

#### Si NO eres admin todavía:

```
┌─────────────────────────────────────────────────────────┐
│  🍷 Panel de Administración    [Usuario: tu@email.com] │
│  La Pertenencia - Gestión de Contenido [Cerrar Sesión] │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 🔐 Información de Usuario - UID para Configuración   [✕]│
│                                                          │
│ Tu UID de Firebase (cópialo para configurar permisos): │
│ ┌────────────────────────────────────────────────────┐ │
│ │ abc123XYZ456def789                     [ Copiar ] │ │
│ └────────────────────────────────────────────────────┘ │
│                                                          │
│ ⚠️ No tienes permisos de administrador                  │
│                                                          │
│ Para obtener acceso completo:                           │
│ 1. Copia el UID de arriba                              │
│ 2. Agrega tu UID en hooks/useIsAdmin.ts                │
│ 3. Actualiza las reglas de Firebase en                 │
│    firebase-rules/firestore.rules                       │
│ 4. Recarga la página                                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  [ 🍷 Vinos ]  [ 📦 Combos ]                           │
└─────────────────────────────────────────────────────────┘
```

**Estado: Autenticado pero NO admin**

- ✅ UID visible con botón para copiar
- ⚠️ Advertencia de "No tienes permisos"
- 📋 Instrucciones paso a paso
- ✅ Acceso a vinos y combos (lectura limitada)

---

#### Si SÍ eres admin:

```
┌─────────────────────────────────────────────────────────┐
│  🍷 Panel de Administración 🟢 Admin Activo            │
│  La Pertenencia - Gestión de Contenido                 │
│                                      [Usuario: tu@email]│
│                                      [Cerrar Sesión]    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 🔐 Información de Usuario - UID para Configuración   [✕]│
│                                                          │
│ Tu UID de Firebase (cópialo para configurar permisos): │
│ ┌────────────────────────────────────────────────────┐ │
│ │ abc123XYZ456def789                     [ Copiar ] │ │
│ └────────────────────────────────────────────────────┘ │
│                                                          │
│ ✅ Tienes permisos completos de administrador           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  [ 🍷 Vinos ]  [ 📦 Combos ]                           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Lista de Vinos                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ Malbec 2020 - $1500  [✏️ Editar] [🗑️ Eliminar]  │ │
│  │ Cabernet 2019 - $1800 [✏️ Editar] [🗑️ Eliminar] │ │
│  └───────────────────────────────────────────────────┘ │
│  [ ➕ Agregar Nuevo Vino ]                             │
└─────────────────────────────────────────────────────────┘
```

**Estado: Autenticado Y admin**

- 🟢 Badge "Admin Activo" con animación pulse
- ✅ Mensaje "Tienes permisos completos"
- ✅ Botones de editar/eliminar funcionales
- ✅ Puede crear nuevos vinos y combos
- ✅ Acceso completo al panel

---

### 3️⃣ Flujo de Estados

```
┌──────────────┐
│   /login     │  ← Usuario no autenticado
└──────┬───────┘
       │ Ingresa email/password o usa Google
       ↓
┌──────────────┐
│ Autenticando │  ← Spinner de carga
│      ...     │
└──────┬───────┘
       │ ✅ Exitoso
       ↓
┌──────────────┐
│   /admin     │  ← Redirección automática
└──────┬───────┘
       │
       ├─→ ❌ No es admin
       │   └→ Muestra: ⚠️ "No tienes permisos"
       │      └→ Instrucciones de configuración
       │
       └─→ ✅ Es admin
           └→ Muestra: 🟢 "Admin Activo"
              └→ Acceso completo
```

---

## 🎨 Códigos de Color en la UI

| Color       | Significado           | Ejemplo                          |
| ----------- | --------------------- | -------------------------------- |
| 🟢 Verde    | Activo/Permitido      | Badge "Admin Activo"             |
| ✅ Verde    | Éxito/Confirmación    | "Tienes permisos completos"      |
| ⚠️ Amarillo | Advertencia           | "No tienes permisos"             |
| 🔴 Rojo     | Error                 | "Email o contraseña incorrectos" |
| 🔵 Azul     | Información           | Card de UID                      |
| ⚪ Gris     | Neutral/Deshabilitado | Botones durante carga            |

---

## 🎬 Animaciones

1. **Badge "Admin Activo"**: Punto verde con pulse animation
2. **Loading spinner**: Durante autenticación
3. **Hover effects**: En botones y cards
4. **Fade in**: Al mostrar/ocultar card de UID

---

## 🖱️ Interacciones

### Botón "Copiar UID"

```
[Antes] → [ Copiar ]
[Click] → [ Copiar ] + Alert: "UID copiado al portapapeles"
```

### Card de Información

```
[Visible] → [✕] (botón cerrar)
[Oculto]  → [📋 Mostrar información de configuración]
```

### Botón Login

```
[Normal]  → [ Iniciar Sesión ]
[Loading] → [ ⟳ Iniciando sesión... ] (deshabilitado)
[Error]   → [ Iniciar Sesión ] + mensaje de error abajo
```

---

## 📱 Responsive

El diseño es completamente responsive y se adapta a:

- 💻 Desktop (1024px+)
- 📱 Tablet (768px - 1023px)
- 📱 Mobile (< 768px)

---

## ✨ Detalles de UI/UX

### 1. Login Form

- ✅ Campos con validación HTML5
- ✅ Botones deshabilitados durante carga
- ✅ Mensajes de error con iconos
- ✅ Auto-focus en primer campo

### 2. Admin Panel

- ✅ Header sticky
- ✅ Card informativa colapsable
- ✅ Código con fondo oscuro para mejor lectura
- ✅ Botón copiar con feedback inmediato
- ✅ Tabs con estado activo visible
- ✅ Información del usuario en el header

### 3. Feedback Visual

- ⟳ Loading durante operaciones
- ✅ Confirmaciones de éxito
- ❌ Errores claros y útiles
- 💡 Tips y sugerencias contextuales

---

**Tip:** Toma screenshots en cada paso para tu documentación interna! 📸















