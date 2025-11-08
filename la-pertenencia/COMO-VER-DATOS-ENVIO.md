# 📦 Cómo Ver los Datos de Envío de las Compras

## 🎯 Resumen

Cuando un cliente realiza una compra, los datos de envío (dirección, teléfono, código postal) se envían a MercadoPago y puedes verlos en varios lugares.

---

## 📍 Dónde Aparecen los Datos

### 1. **En los Logs del Servidor (Desarrollo/Testing)**

#### Al crear la preferencia de pago:
Cuando el cliente hace click en "PAGAR CON MERCADO PAGO", verás en la terminal:

```
📦 Creando preferencia con información de envío: {
  shipping_info: {
    phone: '1145678901',
    address: 'Av. Corrientes 1234, Piso 5, Depto A, CABA',
    postal_code: '1043'
  },
  payer_info: {
    phone: { area_code: '11', number: '45678901' },
    address: {
      street_name: 'Av. Corrientes 1234, Piso 5, Depto A, CABA',
      zip_code: '1043'
    }
  }
}
```

#### Cuando se confirma el pago:
Cuando MercadoPago confirme el pago (webhook), verás:

```
📦 INFORMACIÓN DE ENVÍO: {
  dirección: 'Av. Corrientes 1234, Piso 5, Depto A, CABA',
  teléfono: '1145678901',
  códigoPostal: '1043'
}

👤 INFORMACIÓN DEL COMPRADOR: {
  email: 'cliente@email.com',
  teléfono: { area_code: '11', number: '45678901' },
  nombre: 'Juan Pérez'
}
```

---

### 2. **En el Panel de MercadoPago** 🌐

#### Opción A: Ver desde la lista de pagos
1. Ingresa a [MercadoPago](https://www.mercadopago.com.ar)
2. Ve a **"Ventas"** → **"Historial"**
3. Haz click en cualquier pago para ver los detalles
4. En la sección **"Datos del comprador"** verás:
   - ✅ **Email del comprador**
   - ✅ **Teléfono** (si lo completó en MercadoPago)
   - ✅ **Documento**

#### Opción B: Ver desde la API de MercadoPago
Los datos están en la respuesta del pago:
```json
{
  "id": 12345678,
  "status": "approved",
  "payer": {
    "email": "cliente@email.com",
    "phone": {
      "area_code": "11",
      "number": "45678901"
    },
    "address": {
      "street_name": "Av. Corrientes 1234, Piso 5, Depto A, CABA",
      "zip_code": "1043"
    }
  },
  "metadata": {
    "shipping_info": {
      "phone": "1145678901",
      "address": "Av. Corrientes 1234, Piso 5, Depto A, CABA",
      "postal_code": "1043"
    }
  }
}
```

---

### 3. **En Producción (Recomendado)** 🚀

Para tener un registro permanente de los datos de envío, te recomiendo:

#### ✅ **Guardar en Firestore**
Crear una colección `orders` que guarde:
- ID del pago de MercadoPago
- Productos comprados
- **Datos de envío completos**
- Fecha y hora
- Estado del pedido

Esto te permitirá:
- Ver todos los pedidos desde el panel de admin
- Imprimir etiquetas de envío
- Hacer seguimiento de entregas
- Tener reportes de ventas por zona

---

## 🧪 Cómo Testear

### Paso 1: Modo TEST
1. Asegúrate de tener `MERCADOPAGO_ACCESS_TOKEN_TEST` en tu `.env.local`
2. Inicia el servidor: `npm run dev`
3. Abre la consola/terminal donde corre tu servidor

### Paso 2: Hacer una compra de prueba
1. Agrega vinos al carrito
2. Ingresa un código postal y calcula el envío
3. Completa los datos:
   - **Dirección**: "Av. Santa Fe 1234, Piso 2, Depto B, CABA"
   - **Teléfono**: "11 5678-9012"
   - **CP**: Se llena automáticamente

### Paso 3: Ver los logs
En la terminal verás el log:
```
📦 Creando preferencia con información de envío: { ... }
```

### Paso 4: Pagar con tarjeta de prueba
Usa las [tarjetas de prueba de MercadoPago](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/test-cards):

**Tarjeta aprobada:**
- Número: `5031 7557 3453 0604`
- CVV: cualquier 3 dígitos
- Vencimiento: cualquier fecha futura
- Nombre: APRO

### Paso 5: Ver el webhook
Cuando se confirme el pago, verás en la terminal:
```
📦 INFORMACIÓN DE ENVÍO: { ... }
👤 INFORMACIÓN DEL COMPRADOR: { ... }
```

---

## 📊 Siguiente Paso Recomendado

### Crear un panel de pedidos

Te recomiendo crear un panel donde puedas ver todos los pedidos con sus datos de envío. 

**Beneficios:**
- ✅ Ver todos los pedidos en un solo lugar
- ✅ Filtrar por estado (pendiente, enviado, entregado)
- ✅ Imprimir etiquetas de envío
- ✅ Marcar pedidos como completados
- ✅ Búsqueda por código postal, teléfono, etc.

**¿Te gustaría que implementemos esto?**

---

## 🔧 Troubleshooting

### No veo los logs
- Revisa que el servidor esté corriendo: `npm run dev`
- Mira la terminal/consola donde ejecutaste el comando
- Si usas Vercel, ve a: Dashboard → Tu proyecto → "Logs"

### Los datos no aparecen en MercadoPago
- Verifica que el pago se haya completado
- Los datos del `payer` solo aparecen si el cliente los ingresa en MercadoPago
- Los datos de `metadata` siempre están disponibles

### ¿Puedo ver datos de compras antiguas?
- Solo si ya tenías implementado esto antes
- Las nuevas compras incluirán todos los datos

---

## 📞 Necesitas Ayuda?

Si tienes dudas o quieres implementar el panel de pedidos, solo dime! 🚀

