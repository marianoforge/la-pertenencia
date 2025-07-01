/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";
import { MercadoPagoConfig, Payment } from "mercadopago";

// Configurar Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

const payment = new Payment(client);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
          // Lógica para pago aprobado
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
