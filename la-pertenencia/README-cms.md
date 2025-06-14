# La Pertenencia - CMS de Vinos

Este proyecto es un CMS (Content Management System) para gestionar vinos de la bodega "La Pertenencia". Está construido con Next.js, HeroUI, Zustand y TanStack Query.

## 🚀 Características

- **Backoffice completo** para gestión de vinos
- **CRUD completo**: Crear, leer, actualizar y eliminar vinos
- **API RESTful** con Next.js API routes
- **Estado global** con Zustand
- **Gestión de queries** con TanStack Query
- **UI moderna** con HeroUI
- **TypeScript** para type safety
- **Filtros y búsqueda** en tiempo real

## 📁 Estructura del Proyecto

```
├── data/
│   └── wines.json          # Base de datos JSON de vinos
├── types/
│   └── wine.ts            # Tipos TypeScript para vinos
├── pages/
│   ├── api/wines/         # API routes para CRUD
│   │   ├── index.ts       # GET /api/wines, POST /api/wines
│   │   └── [id].ts        # GET/PUT/DELETE /api/wines/[id]
│   ├── admin/
│   │   └── index.tsx      # Página principal del backoffice
│   └── index.tsx          # Página principal del sitio
├── components/admin/
│   └── WineForm.tsx       # Formulario para crear/editar vinos
├── hooks/
│   └── useWines.ts        # Hooks de TanStack Query
└── stores/
    └── useWineStore.ts    # Store de Zustand
```

## 🍷 Modelo de Datos

Cada vino tiene las siguientes propiedades:

```typescript
interface Wine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: 'Tintos' | 'Blancos' | 'Rosados' | 'Espumantes';
  region: string;
  vintage: number;
  alcohol: number;
  image: string;
  featured: boolean;
  winery: string;
  createdAt: string;
  updatedAt: string;
}
```

## 🔧 API Endpoints

### GET /api/wines
Obtiene la lista de vinos con filtros opcionales:
- `category`: Filtrar por categoría
- `region`: Filtrar por región
- `minPrice` / `maxPrice`: Filtrar por rango de precio
- `featured`: Filtrar por destacados
- `search`: Búsqueda de texto

### POST /api/wines
Crea un nuevo vino.

### GET /api/wines/[id]
Obtiene un vino específico por ID.

### PUT /api/wines/[id]
Actualiza un vino existente.

### DELETE /api/wines/[id]
Elimina un vino.

## 🎯 Funcionalidades del Backoffice

### Dashboard Principal (/admin)
- **Lista de vinos** en formato tabla
- **Filtro por búsqueda** en tiempo real
- **Indicadores de estado** (stock, destacado, categoría)
- **Acciones rápidas** (editar, eliminar)

### Gestión de Vinos
- **Formulario completo** con validaciones
- **Categorías predefinidas**
- **Campos numéricos** para precio, stock, alcohol, etc.
- **Toggle para vinos destacados**
- **Validaciones en tiempo real**

### UI/UX
- **Diseño responsivo** 
- **Componentes modernos** de HeroUI
- **Estados de carga** 
- **Manejo de errores**
- **Confirmaciones de eliminación**

## 🚀 Cómo usar

1. **Página principal**: Ve a `/` para ver la landing page
2. **Backoffice**: Ve a `/admin` para gestionar vinos
3. **API**: Ve a `/api/wines` para ver los datos JSON

### Crear un vino
1. Ve a `/admin`
2. Haz clic en "Agregar Vino"
3. Completa el formulario
4. Guarda los cambios

### Editar un vino
1. Ve a `/admin`
2. Haz clic en "Editar" en la fila del vino
3. Modifica los campos necesarios
4. Guarda los cambios

### Eliminar un vino
1. Ve a `/admin`
2. Haz clic en "Eliminar" en la fila del vino
3. Confirma la eliminación

## 📝 Próximas mejoras

- [ ] Subida de imágenes
- [ ] Autenticación de admin
- [ ] Exportación de datos
- [ ] Dashboard con métricas
- [ ] Sistema de categorías dinámico
- [ ] Historial de cambios
- [ ] API de búsqueda avanzada

## 🛠 Tecnologías utilizadas

- **Next.js 15** - Framework React
- **HeroUI** - Librería de componentes
- **TypeScript** - Tipado estático
- **Zustand** - Estado global
- **TanStack Query** - Gestión de server state
- **Tailwind CSS** - Estilos

---

¡El CMS está listo para usar! 🍷✨ 