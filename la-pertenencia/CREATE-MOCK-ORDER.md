# Crear Pedido de Prueba

## Método 1: Desde la Consola del Navegador

1. Abre tu sitio en el navegador: `http://localhost:3002`
2. Abre la consola del navegador (F12 o Cmd+Option+I en Mac)
3. Pega este código y presiona Enter:

```javascript
// Importar las funciones necesarias
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "/lib/firebase.js";

const mockOrder = {
  orderNumber: `ORD-${Date.now()}-001`,
  items: [
    {
      wine: {
        id: "test-wine-1",
        marca: "Luigi Bosca Malbec",
        bodega: "Luigi Bosca",
        winery: "Luigi Bosca",
        tipo: "Tinto",
        varietal: "Malbec",
        vintage: "2021",
        region: "Mendoza",
        description:
          "Vino tinto de alta gama con notas a frutas rojas y especias",
        price: 8500,
        stock: 50,
        image: "/images/vinos/luigi-bosca-malbec.png",
        featured: true,
        alcohol: "14.5%",
        temperatura: "16-18°C",
        maridaje: "Carnes rojas, pasta con salsas intensas",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      quantity: 2,
      priceAtTimeOfAdd: 8500,
    },
    {
      wine: {
        id: "test-wine-2",
        marca: "Trumpeter Chardonnay",
        bodega: "Rutini Wines",
        winery: "Rutini Wines",
        tipo: "Blanco",
        varietal: "Chardonnay",
        vintage: "2022",
        region: "Mendoza",
        description: "Vino blanco fresco y elegante con notas cítricas",
        price: 4200,
        stock: 75,
        image: "/images/vinos/trumpeter-chardonnay.png",
        featured: false,
        alcohol: "13%",
        temperatura: "8-10°C",
        maridaje: "Pescados, mariscos, ensaladas",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      quantity: 1,
      priceAtTimeOfAdd: 4200,
    },
  ],
  totalAmount: 21200,
  shippingCost: 300,
  finalAmount: 21500,
  shippingInfo: {
    address: "Av. Santa Fe 1234, Piso 5, Depto B, CABA",
    phone: "+54 9 11 5555-1234",
    postalCode: "1425",
  },
  mercadoPagoData: {
    preferenceId: "123456789-abc-def-ghi-987654321",
    paymentStatus: "approved",
    paymentType: "credit_card",
  },
  status: "pending",
  paymentMethod: "mercadopago",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const ordersCollection = collection(db, "orders");
const docRef = await addDoc(ordersCollection, mockOrder);
console.log("✅ Pedido creado:", docRef.id);
```

## Método 2: Compra Real de Prueba

1. Abre tu sitio: `http://localhost:3002/vinos`
2. Agrega cualquier vino al carrito
3. Abre el carrito
4. Completa la información de envío:
   - **Dirección**: Av. Santa Fe 1234, CABA
   - **Teléfono**: +54 9 11 5555-1234
   - **Código Postal**: 1425 (o cualquier CP válido)
5. Calcula el envío
6. Haz clic en **"PAGO PERSONALIZADO"** (no necesitas completar el pago)
7. Verás una alerta con el número de orden
8. Ve a `http://localhost:3002/admin` y verás el pedido en la pestaña "🛒 Pedidos"

## 🔥 Método 2: Firestore Console (RÁPIDO - 2 minutos)

1. Ve a: https://console.firebase.google.com/project/lapertenencia25-8ff11/firestore
2. Haz clic en "Start collection"
3. Collection ID: `orders`
4. Document ID: (Auto-ID)
5. Pega estos campos:

```json
{
  "orderNumber": "ORD-1234567890-001",
  "items": [
    {
      "wine": {
        "id": "test-wine-1",
        "marca": "Luigi Bosca Malbec",
        "bodega": "Luigi Bosca",
        "winery": "Luigi Bosca",
        "tipo": "Tinto",
        "varietal": "Malbec",
        "vintage": "2021",
        "region": "Mendoza",
        "description": "Vino tinto de alta gama",
        "price": 8500,
        "stock": 50,
        "image": "/images/vinos/luigi-bosca-malbec.png",
        "featured": true,
        "alcohol": "14.5%",
        "temperatura": "16-18°C",
        "maridaje": "Carnes rojas"
      },
      "quantity": 2,
      "priceAtTimeOfAdd": 8500
    }
  ],
  "totalAmount": 17000,
  "shippingCost": 300,
  "finalAmount": 17300,
  "shippingInfo": {
    "address": "Av. Santa Fe 1234, CABA",
    "phone": "+54 9 11 5555-1234",
    "postalCode": "1425"
  },
  "status": "pending",
  "paymentMethod": "mercadopago",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

## ¡Listo!

Ahora ve al panel de admin: `http://localhost:3002/admin` → Pestaña "🛒 Pedidos"
