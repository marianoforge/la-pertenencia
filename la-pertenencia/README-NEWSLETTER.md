# 📧 Sistema de Suscripción al Newsletter

## Descripción

Sistema completo de suscripción al newsletter integrado con Firebase Firestore. Los usuarios pueden suscribirse desde el formulario del sitio y los datos se guardan automáticamente en la base de datos.

## ✨ Características

- ✅ Suscripción pública desde el sitio web
- ✅ Validación de emails duplicados
- ✅ Feedback visual (loading, éxito, error)
- ✅ Almacenamiento seguro en Firestore
- ✅ Reglas de seguridad configuradas
- ✅ Gestión de suscripciones para admins

## 🗂 Estructura de Datos

### Colección: `suscriptos`

Cada documento en la colección tiene la siguiente estructura:

```typescript
{
  id: string; // ID auto-generado por Firestore
  email: string; // Email del suscriptor
  subscribedAt: string; // Fecha de suscripción (ISO 8601)
  active: boolean; // Estado de la suscripción (true = activo)
}
```

### Ejemplo de documento:

```json
{
  "email": "usuario@ejemplo.com",
  "subscribedAt": "2024-01-15T10:30:00.000Z",
  "active": true
}
```

## 🚀 Implementación

### Archivos Modificados

1. **`components/NewsLetterForm.tsx`**

   - Formulario con validación
   - Manejo de estados (loading, success, error)
   - Integración con Firestore

2. **`lib/firestore.ts`**

   - Función `addNewsletterSubscription()` - Agregar suscripción
   - Función `getAllNewsletterSubscriptions()` - Obtener todas las suscripciones
   - Función `unsubscribeFromNewsletter()` - Dar de baja suscripción
   - Validación de emails duplicados

3. **`firebase-rules/firestore.rules`**
   - Reglas de seguridad para la colección `suscriptos`
   - Validación de datos en el servidor

## 📋 Funciones Disponibles

### 1. Agregar Suscripción

```typescript
import { addNewsletterSubscription } from "@/lib/firestore";

const result = await addNewsletterSubscription("usuario@ejemplo.com");

if (result.success) {
  console.log("Suscripción exitosa");
} else {
  console.log("Error:", result.error);
}
```

### 2. Obtener Todas las Suscripciones (Solo Admin)

```typescript
import { getAllNewsletterSubscriptions } from "@/lib/firestore";

const suscripciones = await getAllNewsletterSubscriptions();
console.log(suscripciones);
```

### 3. Dar de Baja una Suscripción (Solo Admin)

```typescript
import { unsubscribeFromNewsletter } from "@/lib/firestore";

const success = await unsubscribeFromNewsletter("usuario@ejemplo.com");
console.log("Baja exitosa:", success);
```

## 🔒 Reglas de Seguridad

Las reglas de Firestore están configuradas para:

- ✅ Permitir que **cualquier usuario** pueda crear suscripciones (sin autenticación)
- ✅ Validar que el email tenga formato correcto
- ✅ Solo **administradores** pueden leer, editar o eliminar suscripciones
- ✅ Prevenir duplicados a nivel de aplicación

### Desplegar las Reglas

Para aplicar las reglas de seguridad actualizadas en Firebase:

```bash
# Desde la raíz del proyecto
firebase deploy --only firestore:rules

# O si quieres desplegar todo
firebase deploy
```

## 📊 Consultar Suscripciones en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a **Firestore Database**
4. Busca la colección `suscriptos`
5. Verás todos los documentos con las suscripciones

## 🎨 Experiencia del Usuario

1. **Usuario ingresa su email** en el formulario del newsletter
2. **Click en "SUSCRIBIRSE"**
3. **Durante el proceso:**
   - Botón muestra "SUSCRIBIENDO..."
   - Botón se deshabilita
4. **Si es exitoso:**
   - Mensaje verde: "¡Gracias por suscribirte! Pronto recibirás nuestras novedades."
   - Email se limpia
5. **Si hay error:**
   - Mensaje rojo con el error específico
   - Email se mantiene para que pueda intentar de nuevo

## 🛠 Crear Panel de Admin (Próximo paso)

Para visualizar y gestionar las suscripciones, puedes crear un panel de administración:

```typescript
// En una página de admin
import { getAllNewsletterSubscriptions } from '@/lib/firestore';

export default function NewsletterAdmin() {
  const [suscripciones, setSuscripciones] = useState([]);

  useEffect(() => {
    const loadSubscriptions = async () => {
      const data = await getAllNewsletterSubscriptions();
      setSuscripciones(data);
    };
    loadSubscriptions();
  }, []);

  return (
    <div>
      <h1>Suscriptores del Newsletter</h1>
      <p>Total: {suscripciones.length}</p>
      <ul>
        {suscripciones.map(sub => (
          <li key={sub.id}>
            {sub.email} - {sub.active ? '✅ Activo' : '❌ Inactivo'}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 📤 Exportar Emails

Para exportar los emails a un servicio de email marketing:

```typescript
const suscripciones = await getAllNewsletterSubscriptions();
const emailsActivos = suscripciones
  .filter((sub) => sub.active)
  .map((sub) => sub.email);

// Copiar al portapapeles o descargar como CSV
console.log(emailsActivos.join("\n"));
```

## ⚠️ Notas Importantes

1. **RGPD/Privacidad**: Asegúrate de tener una política de privacidad y términos que cubran el uso de emails.

2. **Límites de Firestore**:

   - 1 escritura por segundo por documento
   - Si esperas muchas suscripciones simultáneas, considera usar Cloud Functions

3. **Configurar Admin UID**:
   - Actualiza el UID de admin en `firestore.rules` (línea 158)
   - Usa el script `scripts/get-admin-uid.ts` para obtener tu UID

## 🔍 Troubleshooting

### Error: "Permission denied"

- Verifica que las reglas de Firestore estén desplegadas
- Revisa la configuración de Firebase

### Email duplicado

- La función valida automáticamente emails duplicados
- El usuario verá: "Este email ya está suscrito al newsletter"

### No se guarda en Firebase

- Verifica que Firebase esté inicializado correctamente
- Revisa la consola del navegador para errores
- Verifica que el proyecto de Firebase esté activo

## 📚 Referencias

- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)

---

**Desarrollado para La Pertenencia** 🍷



