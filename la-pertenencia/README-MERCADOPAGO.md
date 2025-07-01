# Integración con Mercado Pago

Esta aplicación está integrada con Mercado Pago Checkout API para procesar pagos de manera segura.

## Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Mercado Pago Configuration (Test Environment)
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=TEST-13c97350-0e1b-481b-a250-f875d1cebddb
MERCADOPAGO_ACCESS_TOKEN=TEST-6184761466606372-061914-ab840461b0be4e079078ccde334a5bdd-5557772

# Base URL (opcional, por defecto usa localhost:3000)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 2. Instalación de Dependencias

Instala el SDK de Mercado Pago:

```bash
npm install mercadopago
```

## Funcionalidades

### Checkout API

- **Crear Preferencia**: Se crea una preferencia de pago con los items del carrito
- **Redirección**: El usuario es redirigido a Mercado Pago para completar el pago
- **URLs de Retorno**: Configuradas para manejar diferentes estados del pago:
  - `/payment/success` - Pago exitoso
  - `/payment/failure` - Pago fallido
  - `/payment/pending` - Pago pendiente

### Flujo de Pago

1. **Carrito**: El usuario agrega productos al carrito
2. **Checkout**: Al hacer clic en "Pagar con Mercado Pago" se crea una preferencia
3. **Redirección**: El usuario es redirigido a Mercado Pago
4. **Pago**: El usuario completa el pago en Mercado Pago
5. **Retorno**: El usuario regresa a la aplicación con el resultado
6. **Confirmación**: Se muestra el estado del pago

### Webhooks

La aplicación incluye un webhook para recibir notificaciones de Mercado Pago:

- **Endpoint**: `/api/mercadopago/webhook`
- **Función**: Actualizar el estado del pago en tiempo real
- **Seguridad**: Valida las notificaciones de Mercado Pago

## Archivos Principales

### APIs
- `pages/api/mercadopago/create-preference.ts` - Crear preferencias de pago
- `pages/api/mercadopago/webhook.ts` - Manejar notificaciones

### Páginas de Resultado
- `pages/payment/success.tsx` - Pago exitoso
- `pages/payment/failure.tsx` - Pago fallido
- `pages/payment/pending.tsx` - Pago pendiente

### Hooks y Utilities
- `hooks/useMercadoPago.ts` - Hook para manejar Mercado Pago
- `lib/mercadopago.ts` - Configuración y utilities

### Componentes
- `components/Cart.tsx` - Carrito actualizado con Mercado Pago

## Ambiente de Pruebas

Las credenciales proporcionadas son para el ambiente de **pruebas (sandbox)**:

- **Public Key**: `TEST-13c97350-0e1b-481b-a250-f875d1cebddb`
- **Access Token**: `TEST-6184761466606372-061914-ab840461b0be4e079078ccde334a5bdd-5557772`

### Tarjetas de Prueba

Para probar pagos, usa estas tarjetas de prueba:

- **Visa**: 4509 9535 6623 3704 (CVV: 123)
- **Mastercard**: 5031 7557 3453 0604 (CVV: 123)

## Producción

Para usar en producción:

1. Crea una cuenta en [Mercado Pago Developers](https://www.mercadopago.com.ar/developers)
2. Obtén tus credenciales de producción
3. Actualiza las variables de entorno removiendo el prefijo `TEST-`
4. Configura los webhooks en tu panel de Mercado Pago

## Seguridad

- Las credenciales privadas nunca se exponen al cliente
- Los webhooks validan la autenticidad de las notificaciones
- Los pagos se procesan en los servidores seguros de Mercado Pago

## Soporte

Para más información consulta la [documentación oficial de Mercado Pago](https://www.mercadopago.com.ar/developers/es/reference). 