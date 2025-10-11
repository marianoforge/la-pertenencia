# ✅ Mercado Pago - Configuración Completada

## 🎉 ¿Qué se ha configurado?

### 1. ✅ Credenciales Instaladas (TEST + Producción)

Se creó el archivo `.env.local` con ambas credenciales:

**Credenciales de TEST (usadas en local):**

- **Public Key TEST**: `APP_USR-24458177-6322-4c8c-af6d-4092194146aa`
- **Access Token TEST**: `APP_USR-98524767092614-101112-d4cebdf3be6fc5b31e47f14e28048a63-2919985115`

**Credenciales de PRODUCCIÓN (para cuando subas a producción):**

- **Public Key**: `APP_USR-0a422721-e85f-4d4b-99b0-bdb5a9c59842`
- **Access Token**: `APP_USR-4271422943587608-101112-39dfd49e6cdb7db7364a6099e1944c6d-2635395636`
- **Client ID**: `4271422943587608`
- **Aplicación**: [Ver en panel de Mercado Pago](https://www.mercadopago.com.ar/developers/panel/app/4271422943587608)

### 2. ✅ Detección Automática de Ambiente

El código de tu aplicación detecta automáticamente qué credenciales usar:

- 🧪 Si existen credenciales TEST → usa modo SANDBOX (sin cobros reales)
- 💳 Si NO existen credenciales TEST → usa modo PRODUCCIÓN (cobros reales)

**Actualmente**: Configurado para usar **TEST** en desarrollo local ✅

---

## 🚀 Próximos Pasos

### 1. Reiniciar el Servidor de Desarrollo

Para que las nuevas variables de entorno tomen efecto:

```bash
# Detén el servidor actual (Ctrl+C si está corriendo)
# Luego inícialo nuevamente:
npm run dev
# o
yarn dev
```

### 2. ⚠️ Configurar Webhook (IMPORTANTE)

Para recibir notificaciones de pagos en tiempo real:

1. Ve a: [Panel de tu aplicación](https://www.mercadopago.com.ar/developers/panel/app/4271422943587608)
2. Busca la sección **"Webhooks"** o **"Notificaciones"**
3. Haz clic en **"Configurar notificaciones"** o **"Nuevo webhook"**
4. Configura según tu ambiente:

#### Para Desarrollo Local (con ngrok):

```
URL: https://tu-ngrok-id.ngrok.io/api/mercadopago/webhook
```

#### Para Producción:

```
URL: https://tudominio.com/api/mercadopago/webhook
```

5. Selecciona estos eventos:
   - ✅ `payment` - Actualizaciones de pagos
   - ✅ `merchant_order` - Actualizaciones de órdenes

### 3. ⚠️ Actualizar URL Base para Producción

Cuando subas la app a producción, edita `.env.local`:

```env
NEXT_PUBLIC_BASE_URL=https://tudominio.com
```

---

## 🧪 Cómo Probar los Pagos

### En Desarrollo (Localhost) - Modo TEST:

1. Inicia el servidor: `npm run dev`
2. Agrega productos al carrito
3. Haz clic en "Pagar con Mercado Pago"
4. Serás redirigido a Mercado Pago en modo **SANDBOX**
5. ✅ **Los pagos NO son reales** - estás usando credenciales de TEST

### Tarjetas de Prueba de Mercado Pago (para modo TEST):

- **Visa aprobada**: 4509 9535 6623 3704

  - CVV: 123
  - Vencimiento: Cualquier fecha futura
  - Nombre: APRO

- **Mastercard rechazada**: 5031 7557 3453 0604
  - CVV: 123
  - Vencimiento: Cualquier fecha futura
  - Nombre: OTHE

[Más tarjetas de prueba aquí](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/test-cards)

---

## 🚀 Cómo Cambiar a PRODUCCIÓN

Cuando estés listo para aceptar pagos reales, sigue estos pasos:

### Paso 1: Edita `.env.local`

Comenta o elimina las líneas de TEST:

```env
# Comenta estas 2 líneas:
# MERCADOPAGO_ACCESS_TOKEN_TEST=APP_USR-98524767092614-101112-d4cebdf3be6fc5b31e47f14e28048a63-2919985115
# NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY_TEST=APP_USR-24458177-6322-4c8c-af6d-4092194146aa

# Las credenciales de producción ya están configuradas más abajo
# y se usarán automáticamente
```

### Paso 2: Actualiza la URL Base

```env
NEXT_PUBLIC_BASE_URL=https://tudominio.com
```

### Paso 3: Configura el Webhook en Mercado Pago

- URL: `https://tudominio.com/api/mercadopago/webhook`
- Eventos: `payment` y `merchant_order`

### Paso 4: Redeploya la Aplicación

```bash
# Reinicia el servidor o haz deploy
npm run build
npm start
```

✅ **Listo!** Ahora usarás automáticamente las credenciales de PRODUCCIÓN

---

## 📊 Estados de Pago

Tu aplicación maneja 3 estados de pago:

1. **Exitoso** → `/payment/success` - Pago aprobado
2. **Fallido** → `/payment/failure` - Pago rechazado
3. **Pendiente** → `/payment/pending` - Pago en revisión

---

## 🔒 Seguridad

### ✅ Configuración Segura

- Las credenciales están en `.env.local` (no se suben a git)
- El Access Token solo se usa en el servidor (nunca se expone al cliente)
- La Public Key es segura para usar en el frontend
- Los webhooks validan la autenticidad de las notificaciones

### ⚠️ NO HACER

- ❌ NO subas el archivo `.env.local` a git
- ❌ NO compartas tus credenciales públicamente
- ❌ NO pongas las credenciales directamente en el código

---

## 📝 Checklist Final

### Para Desarrollo:

- [x] Credenciales instaladas
- [x] Código configurado
- [ ] Servidor reiniciado
- [ ] Pago de prueba realizado

### Para Producción:

- [x] Credenciales de producción configuradas
- [ ] URL base actualizada en `.env.local`
- [ ] Webhook configurado con URL de producción
- [ ] Pruebas completas realizadas
- [ ] Verificar que el dominio esté configurado en Mercado Pago

---

## 🆘 Solución de Problemas

### Error: "NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY no está configurada"

**Solución**: Reinicia el servidor de desarrollo después de crear el `.env.local`

### El botón de pago no funciona

**Verifica**:

1. Las variables de entorno están bien configuradas
2. El servidor está corriendo
3. La consola del navegador para ver errores

### Los pagos no se procesan

**Verifica**:

1. Las credenciales son de producción (empiezan con `APP_USR-`)
2. La aplicación está activa en el panel de Mercado Pago
3. Tu cuenta de Mercado Pago está verificada

### Webhooks no llegan

**Verifica**:

1. La URL del webhook está correctamente configurada
2. La URL es accesible desde internet (no localhost, excepto con ngrok)
3. Los eventos correctos están seleccionados

---

## 📚 Recursos

- [Documentación de Checkout Pro](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/landing)
- [Panel de tu aplicación](https://www.mercadopago.com.ar/developers/panel/app/4271422943587608)
- [Tarjetas de prueba](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/test-cards)
- [Webhooks](https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks)

---

## 🎯 Resumen

**¡Todo está listo!** Solo necesitas:

1. Reiniciar el servidor
2. Configurar el webhook cuando tengas el dominio de producción
3. Probar que los pagos funcionan correctamente

**Tu aplicación ahora puede procesar pagos reales a través de Mercado Pago** 🎉
