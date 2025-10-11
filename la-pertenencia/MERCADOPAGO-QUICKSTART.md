# 🚀 Mercado Pago - Inicio Rápido

## ✅ Estado Actual

**Configuración**: ✅ Completada  
**Ambiente**: 🧪 TEST (desarrollo local)  
**Cobros reales**: ❌ No (sandbox)

---

## 🎯 Para Empezar a Probar AHORA

### 1. Reinicia el servidor

```bash
cd /Users/marianodesimone/Desktop/la-pertenencia/la-pertenencia
npm run dev
```

### 2. Prueba el flujo de pago

1. Abre: http://localhost:3000
2. Agrega vinos al carrito
3. Haz clic en "Pagar con Mercado Pago"
4. Usa esta tarjeta de prueba:
   - **Número**: `4509 9535 6623 3704`
   - **CVV**: `123`
   - **Vencimiento**: `12/25` (cualquier fecha futura)
   - **Nombre**: `APRO`

✅ **El pago NO es real** - Estás en modo TEST

---

## 🔄 Ambientes

### 🧪 Desarrollo (ACTUAL)

- **Credenciales**: TEST (sandbox)
- **Pagos**: Simulados, no reales
- **URL**: http://localhost:3000

### 💳 Producción (FUTURO)

Para cambiar a producción cuando estés listo:

1. Edita `.env.local` y **comenta estas 2 líneas**:

```bash
# MERCADOPAGO_ACCESS_TOKEN_TEST=...
# NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY_TEST=...
```

2. Actualiza la URL:

```bash
NEXT_PUBLIC_BASE_URL=https://tudominio.com
```

3. Reinicia el servidor

✅ Automáticamente usará las credenciales de PRODUCCIÓN

---

## 📋 Tarjetas de Prueba

| Resultado    | Número              | CVV | Vencimiento | Nombre |
| ------------ | ------------------- | --- | ----------- | ------ |
| ✅ Aprobado  | 4509 9535 6623 3704 | 123 | 12/25       | APRO   |
| ❌ Rechazado | 5031 7557 3453 0604 | 123 | 12/25       | OTHE   |

[Más tarjetas aquí](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/test-cards)

---

## 🆘 Solución Rápida de Problemas

### Error: "MERCADOPAGO_PUBLIC_KEY no está configurada"

**Solución**: Reinicia el servidor (Ctrl+C y luego `npm run dev`)

### El botón de pago no funciona

**Verifica**:

1. El servidor está corriendo
2. Abre la consola del navegador (F12) para ver errores

### No me redirige a Mercado Pago

**Verifica**:

1. Las variables de entorno están en `.env.local`
2. El archivo `.env.local` está en la raíz del proyecto

---

## 📚 Documentación Completa

Para más detalles, consulta: `MERCADOPAGO-SETUP-COMPLETO.md`

---

## 🎉 ¡Listo para Probar!

**Comando rápido**:

```bash
cd /Users/marianodesimone/Desktop/la-pertenencia/la-pertenencia && npm run dev
```

Luego abre http://localhost:3000 y prueba el carrito 🛒
