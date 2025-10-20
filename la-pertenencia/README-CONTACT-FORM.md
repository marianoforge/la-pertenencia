# 📧 Sistema de Envío de Emails desde Formulario de Contacto

## Descripción

Sistema completo de envío de emails desde el formulario de contacto usando **Resend** y **Vercel Serverless Functions**. Los emails se envían directamente a `info@lapertenencia.com`.

## ✨ Características

- ✅ Envío de emails profesionales con diseño HTML
- ✅ Validación de datos en cliente y servidor
- ✅ Feedback visual (loading, éxito, error)
- ✅ Reply-to automático al email del cliente
- ✅ 3000 emails gratis por mes con Resend
- ✅ Serverless function optimizada para Vercel

## 🗂 Estructura de Datos

### Datos del formulario:

```typescript
{
  nombre: string;
  apellido: string;
  email: string;
  motivo: string; // "Consulta sobre vinos", "Membresía mensual", etc.
  consulta: string; // Mensaje del cliente
}
```

## 🚀 Implementación

### Archivos Creados/Modificados

1. **`pages/api/contact.ts`** (NUEVO)

   - API Route de Next.js
   - Integración con Resend
   - Validación de datos
   - Email HTML profesional

2. **`components/Contacto.tsx`** (MODIFICADO)
   - Integración con API
   - Estados de carga y mensajes
   - Limpieza de formulario post-envío

## 📦 Instalación

### 1. Instalar Resend

```bash
yarn add resend
```

### 2. Configurar cuenta en Resend

1. Ve a [https://resend.com](https://resend.com)
2. Crea una cuenta (gratis)
3. Ve a **API Keys** → **Create API Key**
4. Copia la API Key

### 3. Agregar variables de entorno

Crea o edita el archivo `.env.local`:

```bash
# Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

### 4. (Opcional) Verificar dominio personalizado

Para usar tu dominio `@lapertenencia.com`:

1. Ve a **Resend Dashboard** → **Domains**
2. Click en **Add Domain**
3. Ingresa: `lapertenencia.com`
4. Sigue las instrucciones para agregar registros DNS:
   - `TXT` record
   - `MX` records (si quieres recibir emails)
   - `DKIM` records (para autenticación)

**Mientras tanto:** Resend te da un dominio temporal `onboarding@resend.dev` que funciona perfectamente para testing.

## 📧 Email Template

El email enviado incluye:

- ✅ Header con branding de La Pertenencia
- ✅ Nombre completo del cliente
- ✅ Email del cliente (con reply-to automático)
- ✅ Motivo de la consulta
- ✅ Mensaje/consulta completo
- ✅ Footer con información
- ✅ Diseño responsive

### Vista previa del email:

```
┌────────────────────────────────────┐
│  🍷 LA PERTENENCIA                 │
│  Nuevo mensaje de contacto         │
├────────────────────────────────────┤
│  NOMBRE COMPLETO                   │
│  Juan Pérez                        │
│                                    │
│  EMAIL                             │
│  juan@ejemplo.com                  │
│                                    │
│  MOTIVO DE CONSULTA                │
│  Consulta sobre vinos              │
│                                    │
│  CONSULTA                          │
│  Hola, quisiera más información... │
├────────────────────────────────────┤
│  Este email fue enviado desde el   │
│  formulario de contacto            │
│  Para responder: juan@ejemplo.com  │
└────────────────────────────────────┘
```

## 🧪 Testing

### 1. Testing Local

```bash
# Asegúrate de tener las variables de entorno configuradas
yarn dev

# Ve a la sección de Contacto
# Completa el formulario
# Verifica que llegue el email a info@lapertenencia.com
```

### 2. Testing en Vercel

```bash
# Deploy a Vercel
vercel --prod

# Prueba en producción
```

### 3. Logs y Debugging

```typescript
// En pages/api/contact.ts hay console.logs para debugging:
console.log("✅ Email sent successfully:", data);
console.log("❌ Error sending email:", error);
```

También puedes ver los logs en:

- **Resend Dashboard** → **Logs** (emails enviados)
- **Vercel Dashboard** → **Functions** → **Logs**

## 🎨 Experiencia del Usuario

1. **Usuario completa el formulario:**

   - Nombre
   - Apellido
   - Email
   - Motivo (dropdown)
   - Consulta (textarea)

2. **Click en "ENVIAR"**

3. **Durante el proceso:**

   - Botón muestra "ENVIANDO..."
   - Botón se deshabilita

4. **Si es exitoso:**

   - Mensaje verde: "¡Mensaje enviado con éxito! Te responderemos pronto."
   - Formulario se limpia automáticamente

5. **Si hay error:**
   - Mensaje rojo con el error específico
   - Datos se mantienen para reintentar

## 🔒 Seguridad

### Validaciones implementadas:

**Cliente (Contacto.tsx):**

- ✅ Campos required en HTML
- ✅ Tipo `email` en input
- ✅ Validación antes de enviar

**Servidor (pages/api/contact.ts):**

- ✅ Solo acepta POST requests
- ✅ Valida que todos los campos estén presentes
- ✅ Valida formato de email con regex
- ✅ Rate limiting de Resend (previene spam)
- ✅ API Key nunca se expone al cliente

## 📊 Límites y Pricing

### Resend - Plan Gratuito:

- ✅ 3,000 emails/mes
- ✅ 100 emails/día
- ✅ 1 dominio verificado
- ✅ API completa
- ✅ Email tracking
- ✅ Webhooks

### Para más volumen:

- **Pro**: $20/mes - 50,000 emails/mes
- **Business**: Precio personalizado

[Ver pricing completo](https://resend.com/pricing)

## 🛠 Personalización

### Cambiar el destinatario:

```typescript
// En pages/api/contact.ts línea 57
to: ["info@lapertenencia.com"], // Cambia aquí
```

### Cambiar el remitente:

```typescript
// En pages/api/contact.ts línea 56
from: "La Pertenencia <contacto@lapertenencia.com>", // Cambia aquí
// Nota: Debe ser un dominio verificado en Resend
```

### Personalizar el template del email:

Edita el HTML en `pages/api/contact.ts` (líneas 61-165).

### Agregar copia (CC/BCC):

```typescript
const { data, error } = await resend.emails.send({
  from: "La Pertenencia <contacto@lapertenencia.com>",
  to: ["info@lapertenencia.com"],
  cc: ["ventas@lapertenencia.com"], // Copia
  bcc: ["admin@lapertenencia.com"], // Copia oculta
  // ... resto del email
});
```

## 🔍 Troubleshooting

### Error: "Failed to fetch" o "Network error"

**Causa:** Problemas de conectividad o CORS

**Solución:**

- Verifica que el servidor esté corriendo
- Revisa la consola del navegador
- Verifica que la ruta `/api/contact` funcione

### Error: "Missing API Key"

**Causa:** Variable de entorno no configurada

**Solución:**

```bash
# Verifica que existe en .env.local
cat .env.local | grep RESEND_API_KEY

# Si no existe, agrégala
echo "RESEND_API_KEY=re_xxxxxxxxxxxxx" >> .env.local

# Reinicia el servidor
yarn dev
```

### Error: "Invalid email"

**Causa:** Email del cliente mal formado

**Solución:** Ya está validado en el código, pero verifica el regex si necesitas ajustarlo.

### Error: "Domain not verified"

**Causa:** Intentas usar un dominio no verificado como remitente

**Solución:**

- Usa el dominio temporal de Resend: `onboarding@resend.dev`
- O verifica tu dominio en Resend Dashboard

### Emails no llegan

**Checklist:**

1. ✅ Verifica que el email se envió en Resend Dashboard → Logs
2. ✅ Revisa la carpeta de SPAM
3. ✅ Verifica que el email destino sea correcto
4. ✅ Prueba con otro email (Gmail, Outlook, etc.)

## 📚 Recursos

- [Resend Documentation](https://resend.com/docs)
- [Resend React Email](https://react.email) - Para templates más avanzados
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)

## 🎯 Próximos Pasos

### Opcional - Mejoras adicionales:

1. **Auto-respuesta al cliente:**

   - Enviar un email de confirmación al cliente
   - "Gracias por contactarnos, te responderemos pronto"

2. **Guardar consultas en Firestore:**

   - Tener un historial de todas las consultas
   - Panel de admin para gestionarlas

3. **Notificaciones:**

   - Webhook que notifique por Slack/WhatsApp
   - Push notifications

4. **Analytics:**
   - Tracking de cuántos formularios se envían
   - Motivos más consultados

## 💡 Ejemplo de código para mejoras

### Auto-respuesta al cliente:

```typescript
// Después de enviar el email principal
await resend.emails.send({
  from: "La Pertenencia <contacto@lapertenencia.com>",
  to: [email], // Email del cliente
  subject: "Recibimos tu consulta - La Pertenencia",
  html: `
    <p>Hola ${nombre},</p>
    <p>Recibimos tu consulta y te responderemos pronto.</p>
    <p>Gracias por contactar a La Pertenencia 🍷</p>
  `,
});
```

---

**Desarrollado para La Pertenencia** 🍷
