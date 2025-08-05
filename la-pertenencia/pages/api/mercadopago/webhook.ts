/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";
import { MercadoPagoConfig, Payment } from "mercadopago";

import { reduceWineStockServerSide } from "@/lib/firestore-server";

// Detectar y configurar credenciales correctas
const useTestCredentials = !!process.env.MERCADOPAGO_ACCESS_TOKEN_TEST;
const accessToken = useTestCredentials
  ? process.env.MERCADOPAGO_ACCESS_TOKEN_TEST!
  : process.env.MERCADOPAGO_ACCESS_TOKEN!;

// Configurar Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: accessToken,
});

const payment = new Payment(client);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { type, data } = req.body;

    if (type === "payment") {
      const paymentId = data.id;

      // Obtener los detalles del pago
      const paymentInfo = await payment.get({ id: paymentId });

      console.log("Payment webhook received:", {
        id: paymentInfo.id,
        status: paymentInfo.status,
        external_reference: paymentInfo.external_reference,
        transaction_amount: paymentInfo.transaction_amount,
      });

      // Aquí puedes agregar lógica adicional como:
      // - Actualizar el estado del pedido en tu base de datos
      // - Enviar emails de confirmación
      // - Actualizar el stock de productos

      switch (paymentInfo.status) {
        case "approved":
          console.log("Payment approved:", paymentInfo.external_reference);

          // Reducir stock de los vinos comprados
          if (paymentInfo.metadata && paymentInfo.metadata.items) {
            console.log("Processing stock reduction for approved payment");

            try {
              const items = paymentInfo.metadata.items as Array<{
                wine_id: string;
                quantity: number;
              }>;

              // Procesar cada item para reducir stock
              for (const item of items) {
                const result = await reduceWineStockServerSide(
                  item.wine_id,
                  item.quantity
                );

                if (result.success) {
                  console.log(
                    `✅ Stock reduced for wine ${item.wine_id}: ${item.quantity} units. New stock: ${result.newStock}`
                  );
                } else {
                  console.error(
                    `❌ Failed to reduce stock for wine ${item.wine_id}: ${result.error}`
                  );

                  // En un caso real, aquí podrías implementar lógica adicional como:
                  // - Enviar notificación al administrador
                  // - Registrar el error en un sistema de logs
                  // - Intentar la operación nuevamente más tarde
                }
              }
            } catch (error) {
              console.error("Error processing stock reduction:", error);
            }
          } else {
            console.warn(
              "No metadata.items found in payment, cannot reduce stock"
            );
          }

          break;
        case "pending":
          console.log("Payment pending:", paymentInfo.external_reference);
          // Lógica para pago pendiente
          break;
        case "rejected":
          console.log("Payment rejected:", paymentInfo.external_reference);
          // Lógica para pago rechazado
          break;
        default:
          console.log("Payment status unknown:", paymentInfo.status);
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({
      message: "Error processing webhook",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
