# 🔥 Firebase Setup Guide - La Pertenencia

Esta guía te ayudará a configurar Firebase para el proyecto La Pertenencia, incluyendo Authentication, Firestore y Storage.

## 📋 Requisitos Previos

- Cuenta de Google/Firebase
- Node.js >= 18.18.0
- Proyecto Next.js funcionando

## 🚀 Configuración Inicial de Firebase

### 1. Crear Proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto llamado "la-pertenencia"
3. Habilita Google Analytics (opcional)

### 2. Configurar Authentication

1. En Firebase Console, ve a **Authentication > Sign-in method**
2. Habilita los siguientes proveedores:
   - **Email/Password**: Para registro tradicional
   - **Google**: Para login social
3. En **Settings**, configura el dominio autorizado

### 3. Configurar Firestore Database

1. Ve a **Firestore Database > Create database**
2. Inicia en **modo de prueba** (configurarás reglas después)
3. Selecciona una ubicación cercana (ej: `southamerica-east1`)

### 4. Configurar Storage

1. Ve a **Storage > Get started**
2. Inicia en **modo de prueba**
3. Selecciona la misma ubicación que Firestore

### 5. Obtener Configuraciones

#### Para el Frontend (Client SDK):
1. Ve a **Project Settings > General**
2. En "Your apps", haz clic en "Web app"
3. Registra la app con nombre "la-pertenencia-web"
4. Copia la configuración `firebaseConfig`

#### Para el Backend (Admin SDK):
1. Ve a **Project Settings > Service accounts**
2. Haz clic en "Generate new private key"
3. Descarga el archivo JSON

## 🔧 Configuración Local

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Copia el contenido de firebase.env.example
cp firebase.env.example .env.local
```

Completa las variables con tus valores de Firebase:

```env
# Firebase Client Configuration (del firebaseConfig)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=la-pertenencia.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=la-pertenencia
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=la-pertenencia.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Firebase Admin SDK (del archivo JSON descargado)
FIREBASE_PROJECT_ID=la-pertenencia
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@la-pertenencia.iam.gserviceaccount.com
```

### 2. Migrar Datos Existentes

Para transferir los vinos del archivo JSON a Firestore:

```bash
yarn migrate
```

Este comando:
- Lee los datos de `data/wines.json`
- Los sube a Firestore en la colección `wines`
- Verifica que la migración sea exitosa

## 📁 Estructura de Archivos Firebase

```
la-pertenencia/
├── lib/
│   ├── firebase.ts          # Configuración cliente
│   ├── firebaseAdmin.ts     # Configuración admin
│   ├── firestore.ts         # Utilidades Firestore
│   └── storage.ts           # Utilidades Storage
├── hooks/
│   └── useAuth.ts           # Hook de autenticación
├── scripts/
│   └── migrate-to-firestore.ts  # Script de migración
└── firebase.env.example     # Plantilla de variables
```

## 🔒 Configurar Reglas de Seguridad

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Wines collection - read public, write authenticated
    match /wines/{wineId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Users collection - private to owner
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Orders collection - private to owner
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Images can be read by anyone
    match /images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 📊 Índices Recomendados

Crea estos índices en Firestore Console > Indexes:

### Collection: `wines`
- `category` (Ascending) + `name` (Ascending)
- `featured` (Ascending) + `name` (Ascending)  
- `region` (Ascending) + `vintage` (Descending)
- `price` (Ascending) + `category` (Ascending)

## 🧪 Uso en Componentes

### Autenticación

```tsx
import { useAuth } from '@/hooks/useAuth';

function LoginComponent() {
  const { signIn, signInWithGoogle, user, loading } = useAuth();
  
  const handleLogin = async (email: string, password: string) => {
    const result = await signIn({ email, password });
    if (result.success) {
      console.log('Usuario logueado:', result.user);
    }
  };
}
```

### Firestore

```tsx
import { getAllWines, addWine } from '@/lib/firestore';

function WinesComponent() {
  const [wines, setWines] = useState([]);
  
  useEffect(() => {
    const loadWines = async () => {
      const data = await getAllWines();
      setWines(data);
    };
    loadWines();
  }, []);
}
```

### Storage

```tsx
import { uploadWineImage } from '@/lib/storage';

function ImageUpload() {
  const handleUpload = async (file: File, wineId: string) => {
    const url = await uploadWineImage(file, wineId);
    if (url) {
      console.log('Imagen subida:', url);
    }
  };
}
```

## 🚨 Solución de Problemas

### Error: "Firebase not initialized"
- Verifica que las variables de entorno estén correctas
- Asegúrate de que el archivo `.env.local` esté en la raíz

### Error: "Permission denied"
- Revisa las reglas de Firestore/Storage
- Verifica que el usuario esté autenticado

### Error en migración
- Verifica las credenciales del Admin SDK
- Asegúrate de que Firestore esté habilitado

## 📚 Recursos Adicionales

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Data Model](https://firebase.google.com/docs/firestore/data-model)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Firebase Storage](https://firebase.google.com/docs/storage)

## 🛠️ Comandos Útiles

```bash
# Migrar datos
yarn migrate

# Desarrollo
yarn dev

# Verificar configuración
yarn firebase:setup
``` 