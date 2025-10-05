/* eslint-disable no-console */
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
    const { items } = req.body;

    // Detectar si usar credenciales de TEST o producción
    const useTestCredentials = !!process.env.MERCADOPAGO_ACCESS_TOKEN_TEST;
    const accessToken = useTestCredentials
      ? process.env.MERCADOPAGO_ACCESS_TOKEN_TEST!
      : process.env.MERCADOPAGO_ACCESS_TOKEN!;

    // Configurar Mercado Pago con un idempotencyKey único para cada request
    const client = new MercadoPagoConfig({
      accessToken: accessToken,
      options: {
        timeout: 5000,
        idempotencyKey: `preference-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      },
    });

    const preference = new Preference(client);

    // Obtener URLs dinámicas
    const returnUrls = getReturnUrls();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Para testing con localhost, usar URLs de ejemplo válidas
    const isLocalhost = baseUrl.includes("localhost");
    const validReturnUrls = isLocalhost
      ? {
          success: "https://www.lapertenencia.com/payment/success",
          failure: "https://www.lapertenencia.com/payment/failure",
          pending: "https://www.lapertenencia.com/payment/pending",
        }
      : returnUrls;

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
      back_urls: validReturnUrls,
      // Solo agregar notification_url si no es localhost
      ...(isLocalhost
        ? {}
        : { notification_url: `${baseUrl}/api/mercadopago/webhook` }),
      metadata: {
        items: items.map((item: any) => ({
          wine_id: item.id,
          quantity: item.quantity,
        })),
      },
    };

    const result = await preference.create({ body: preferenceData });

    // Detectar si estamos usando credenciales de producción o test
    const isProduction = !useTestCredentials;

    // Usar el init_point correcto según el tipo de credenciales
    const initPoint = isProduction
      ? result.init_point
      : result.sandbox_init_point;

    res.status(200).json({
      preferenceId: result.id,
      initPoint: initPoint,
      isProduction: isProduction,
      // Mantener ambos por compatibilidad (opcional)
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });
  } catch (error) {
    console.error("Error creating preference:", error);
    res.status(500).json({
      message: "Error al crear la preferencia de pago",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
