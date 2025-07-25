import { NextApiRequest, NextApiResponse } from "next";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { getReturnUrls } from "../../../lib/mercadopago";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { items, payer } = req.body;

    // Configurar Mercado Pago con un idempotencyKey único para cada request
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
      options: {
        timeout: 5000,
        idempotencyKey: `preference-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      },
    });

    const preference = new Preference(client);

    // Obtener URLs dinámicas
    const returnUrls = getReturnUrls();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Crear la preferencia de pago
    const preferenceData = {
      items: items.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description || "",
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: "ARS",
      })),
      payer: {
        name: payer?.name || "",
        surname: payer?.surname || "",
        email: payer?.email || "",
        phone: {
          area_code: payer?.phone?.area_code || "",
          number: payer?.phone?.number || "",
        },
        identification: {
          type: payer?.identification?.type || "DNI",
          number: payer?.identification?.number || "",
        },
        address: {
          street_name: payer?.address?.street_name || "",
          street_number: payer?.address?.street_number || "",
          zip_code: payer?.address?.zip_code || "",
        },
      },
      back_urls: {
        success: returnUrls.success,
        failure: returnUrls.failure,
        pending: returnUrls.pending,
      },
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12,
      },
      notification_url: `${baseUrl}/api/mercadopago/webhook`,
      statement_descriptor: "La Pertenencia Vinos",
      external_reference: `ORDER-${Date.now()}`,
      metadata: {
        items: items.map((item: any) => ({
          wine_id: item.id,
          quantity: item.quantity,
        })),
      },
    };

    const result = await preference.create({ body: preferenceData });

    res.status(200).json({
      preferenceId: result.id,
      initPoint: result.init_point,
      sandboxInitPoint: result.sandbox_init_point,
    });
  } catch (error) {
    console.error("Error creating preference:", error);
    res.status(500).json({
      message: "Error al crear la preferencia de pago",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
