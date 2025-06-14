# 📊 Guía: Configurar Índices en Firestore

## 🎯 Objetivo
Crear índices compuestos para optimizar las consultas de vinos en Firestore.

## 📍 Paso a Paso

### 1. Acceder a Firebase Console
1. Ve a: https://console.firebase.google.com/
2. Selecciona tu proyecto: **la-pertenencia**
3. En el menú lateral, haz clic en **Firestore Database**

### 2. Navegar a Índices
1. En la pestaña superior, haz clic en **Indexes** (Índices)
2. Verás una página con pestañas: **Single field** y **Composite**
3. Haz clic en **Composite** (Compuesto)

### 3. Crear Primer Índice: category + name
1. Haz clic en **Create index** (Crear índice)
2. Configurar:
   - **Collection ID**: `wines`
   - **Fields to index**:
     - Campo 1: `category` - **Ascending**
     - Campo 2: `name` - **Ascending**
3. Haz clic en **Create** (Crear)

### 4. Crear Segundo Índice: featured + name
1. Haz clic en **Create index** nuevamente
2. Configurar:
   - **Collection ID**: `wines`
   - **Fields to index**:
     - Campo 1: `featured` - **Ascending**
     - Campo 2: `name` - **Ascending**
3. Haz clic en **Create**

### 5. Crear Tercer Índice: region + vintage
1. Haz clic en **Create index**
2. Configurar:
   - **Collection ID**: `wines`
   - **Fields to index**:
     - Campo 1: `region` - **Ascending**
     - Campo 2: `vintage` - **Descending**
3. Haz clic en **Create**

### 6. Crear Cuarto Índice: price + category
1. Haz clic en **Create index**
2. Configurar:
   - **Collection ID**: `wines`
   - **Fields to index**:
     - Campo 1: `price` - **Ascending**
     - Campo 2: `category` - **Ascending**
3. Haz clic en **Create**

## ⏱️ Tiempo de Creación
- Los índices pueden tardar **unos minutos** en crearse
- El estado aparecerá como "Building" (Construyendo) y luego "Enabled" (Habilitado)

## ✅ Verificación
Una vez creados, deberías ver 4 índices compuestos:

| Collection | Fields | Status |
|------------|--------|--------|
| wines | category (Asc), name (Asc) | ✅ Enabled |
| wines | featured (Asc), name (Asc) | ✅ Enabled |
| wines | region (Asc), vintage (Desc) | ✅ Enabled |
| wines | price (Asc), category (Asc) | ✅ Enabled |

## 🎯 Para qué sirve cada índice:

### 1. **category + name**
```tsx
// Optimiza consultas como:
const tintos = await getWinesByCategory('Tintos'); // Ordenados por nombre
```

### 2. **featured + name**  
```tsx
// Optimiza consultas como:
const featuredWines = await getFeaturedWines(); // Destacados ordenados por nombre
```

### 3. **region + vintage**
```tsx
// Optimiza consultas como:
const mendozaWines = await query(
  collection(db, 'wines'),
  where('region', '==', 'Mendoza'),
  orderBy('vintage', 'desc')
);
```

### 4. **price + category**
```tsx
// Optimiza consultas como:
const cheapTintos = await query(
  collection(db, 'wines'),
  where('category', '==', 'Tintos'),
  orderBy('price', 'asc')
);
```

## 🚨 Puntos Importantes

1. **Sin estos índices**: Las consultas complejas fallarán
2. **Orden importa**: El orden de los campos en el índice debe coincidir con el orden en la consulta
3. **Automático**: Firestore creará índices de campo único automáticamente
4. **Costo**: Los índices consumen espacio de almacenamiento (mínimo para este proyecto)

## 🔍 Solución de Problemas

### Error: "The query requires an index"
Si ves este error en la consola:
1. Copia el enlace que aparece en el error
2. Te llevará directamente a crear el índice faltante
3. O créalo manualmente siguiendo los pasos de arriba

### Índice no aparece
- Espera unos minutos, la creación puede tardar
- Refresca la página de Firebase Console
- Verifica que el Collection ID sea exactamente `wines`

## ✅ Próximo Paso
Una vez completados los índices, podrás continuar al **Paso 2: Configurar Reglas de Seguridad** 