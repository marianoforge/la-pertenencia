import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Order } from "../types/order";

async function createMockOrder() {
  try {
    console.log("🛒 Creando pedido de prueba...");

    const mockOrder: Omit<Order, "id"> = {
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
            description: "Vino tinto de alta gama con notas a frutas rojas y especias",
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
      totalAmount: 21200, // (8500 * 2) + 4200
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

    console.log("✅ Pedido de prueba creado exitosamente!");
    console.log("📦 ID del pedido:", docRef.id);
    console.log("🔢 Número de orden:", mockOrder.orderNumber);
    console.log("💰 Total:", `$${mockOrder.finalAmount.toLocaleString()}`);
    console.log(
      "📍 Dirección:",
      mockOrder.shippingInfo.address
    );
    console.log("\n🎉 Ahora puedes ver este pedido en el panel de admin!");
  } catch (error) {
    console.error("❌ Error al crear pedido de prueba:", error);
  }
}

createMockOrder();

