import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { useCartStore } from "../stores/useCartStore";
import { useMercadoPago } from "../hooks/useMercadoPago";
import { createOrder, getSiteSettings } from "../lib/firestore";

import { Button } from "./ui/Button";

const Cart = () => {
  const {
    items,
    isOpen,
    totalItems,
    totalAmount,
    shippingInfo,
    toggleCart,
    updateQuantity,
    removeItem,
    clearCart,
    setShippingInfo,
  } = useCartStore();

  const {
    createPreference,
    redirectToCheckout,
    loading: mpLoading,
    error: mpError,
  } = useMercadoPago();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [shippingEnabled, setShippingEnabled] = useState(true);
  const [configuredShippingCost, setConfiguredShippingCost] = useState(500);
  const [loadingSettings, setLoadingSettings] = useState(true);

  // Load shipping settings
  useEffect(() => {
    const loadShippingSettings = async () => {
      try {
        const settings = await getSiteSettings();
        setShippingEnabled(settings.shippingEnabled ?? true);
        setConfiguredShippingCost(settings.shippingCost ?? 500);
      } catch (error) {
        console.error("Error loading shipping settings:", error);
        // Set defaults on error
        setShippingEnabled(true);
        setConfiguredShippingCost(500);
      } finally {
        setLoadingSettings(false);
      }
    };

    loadShippingSettings();
  }, []);

  const calculateShippingCost = (): number => {
    // If shipping is disabled, return 0 (free shipping)
    if (!shippingEnabled) return 0;

    // Return the configured fixed shipping cost
    return configuredShippingCost;
  };

  const handleCalculateShipping = () => {
    const cost = calculateShippingCost();
    setShippingCost(cost);
    // Guardar el código postal en el store
    setShippingInfo({ postalCode });
  };

  // Reset shipping cost when cart is closed or items change
  useEffect(() => {
    if (!isOpen) {
      setPostalCode("");
      setShippingCost(null);
    }
  }, [isOpen]);

  useEffect(() => {
    // Reset shipping when items change (quantity update, add, or remove)
    setShippingCost(null);
  }, [items.length]);

  const handleMercadoPagoCheckout = async () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);

    try {
      // Parsear el teléfono para area_code y number
      const phoneNumber = shippingInfo.phone.replace(/\D/g, "");
      const areaCode = phoneNumber.substring(0, 2) || "11";
      const number = phoneNumber.substring(2) || phoneNumber;

      // Preparar información del comprador
      const payerInfo = {
        phone: {
          area_code: areaCode,
          number: number,
        },
        address: {
          street_name: shippingInfo.address,
          zip_code: shippingInfo.postalCode,
        },
      };

      const preference = await createPreference(
        items,
        payerInfo,
        shippingCost || 0,
      );

      if (preference) {
        // Guardar la orden en Firestore
        const orderResult = await createOrder({
          items,
          totalAmount,
          shippingCost: shippingCost || 0,
          finalAmount: totalAmount + (shippingCost || 0),
          shippingInfo: {
            address: shippingInfo.address,
            phone: shippingInfo.phone,
            postalCode: shippingInfo.postalCode,
          },
          mercadoPagoData: {
            preferenceId: preference.preferenceId,
          },
          status: "pending",
          paymentMethod: "mercadopago",
        });

        if (orderResult.success) {
          // Orden guardada exitosamente
        }

        // El endpoint ya devuelve el initPoint correcto según las credenciales
        redirectToCheckout(preference.initPoint);
      } else {
        alert(
          "Error al crear la preferencia de pago. Por favor, intenta nuevamente.",
        );
      }
    } catch {
      alert("Error al procesar el pago. Por favor, intenta nuevamente.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleLegacyCheckout = async () => {
    setIsCheckingOut(true);

    try {
      // Guardar la orden en Firestore
      const orderResult = await createOrder({
        items,
        totalAmount,
        shippingCost: shippingCost || 0,
        finalAmount: totalAmount + (shippingCost || 0),
        shippingInfo: {
          address: shippingInfo.address,
          phone: shippingInfo.phone,
          postalCode: shippingInfo.postalCode,
        },
        status: "pending",
        paymentMethod: "custom",
      });

      if (orderResult.success) {
        alert(
          `¡Pedido realizado con éxito! Número de orden: ${orderResult.orderNumber}. Te contactaremos pronto.`,
        );
        clearCart();
        toggleCart();
      } else {
        alert("Error al procesar el pedido. Por favor, intenta nuevamente.");
      }
    } catch {
      alert("Error al procesar el pedido. Por favor, intenta nuevamente.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.button
            animate={{ opacity: 1 }}
            aria-label="Cerrar carrito"
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={toggleCart}
          />

          {/* Cart Panel */}
          <motion.div
            animate={{ x: 0 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col font-['Lora']"
            exit={{ x: "100%" }}
            initial={{ x: "100%" }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94], // easeOutCubic
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <h2 className="text-xl font-semibold font-['Lora'] text-neutral-900 uppercase tracking-[3px]">
                Carrito ({totalItems})
              </h2>
              <button
                className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
                onClick={toggleCart}
              >
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
                    <svg
                      fill="none"
                      height="32"
                      viewBox="0 0 24 24"
                      width="32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z"
                        stroke="#737373"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold font-['Lora'] text-neutral-900 mb-2 uppercase tracking-[2px]">
                    Tu carrito está vacío
                  </h3>
                  <p className="text-neutral-600 font-['Lora'] tracking-wide">
                    Agrega algunos vinos para comenzar
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.wine.id}
                      className="flex gap-4 p-4 bg-neutral-50 rounded-sm border border-neutral-200"
                    >
                      {/* Wine Image */}
                      <div className="w-20 h-20 bg-neutral-900 rounded-sm flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                        {item.wine.image ? (
                          <Image
                            alt={item.wine.marca}
                            className="w-full h-full object-cover"
                            height={80}
                            src={item.wine.image}
                            width={80}
                          />
                        ) : (
                          <svg
                            fill="none"
                            height="32"
                            viewBox="0 0 24 24"
                            width="32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2C12 2 8 6 8 12C8 16 10 20 12 22C14 20 16 16 16 12C16 6 12 2 12 2Z"
                              stroke="#D4AF37"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            />
                            <path
                              d="M12 8V16"
                              stroke="#D4AF37"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            />
                          </svg>
                        )}
                      </div>

                      {/* Wine Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm font-['Lora'] text-neutral-900 mb-1 truncate uppercase tracking-[1px]">
                          {item.wine.marca}
                        </h4>
                        <p className="text-xs text-neutral-600 font-['Lora'] mb-3 tracking-wide">
                          {item.wine.winery} • {item.wine.vintage}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mb-3">
                          <button
                            className="w-7 h-7 bg-neutral-900 rounded-sm outline outline-[0.50px] outline-offset-[-0.50px] outline-amber-300 flex items-center justify-center text-dorado-light text-sm font-bold font-['Lora'] hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              updateQuantity(item.wine.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span className="text-sm font-medium font-['Lora'] text-neutral-900 w-8 text-center tracking-wide">
                            {item.quantity}
                          </span>
                          <button
                            className="w-7 h-7 bg-neutral-900 rounded-sm outline outline-[0.50px] outline-offset-[-0.50px] outline-amber-300 flex items-center justify-center text-dorado-light text-sm font-bold font-['Lora'] hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={item.quantity >= item.wine.stock}
                            onClick={() =>
                              updateQuantity(item.wine.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        {/* Price and Remove */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold font-['Lora'] text-neutral-900 tracking-wide">
                            $
                            {(
                              item.priceAtTimeOfAdd * item.quantity
                            ).toLocaleString()}
                          </span>
                          <button
                            className="text-neutral-500 hover:text-red-600 transition-colors p-1"
                            onClick={() => removeItem(item.wine.id)}
                          >
                            <svg
                              fill="none"
                              height="16"
                              viewBox="0 0 24 24"
                              width="16"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3 6H5H21M8 6V4C8 3.4 8.4 3 9 3H15C15.6 3 16 3.4 16 4V6M19 6V20C19 20.6 18.6 21 18 21H6C5.4 21 5 20.6 5 20V6H19ZM10 11V17M14 11V17"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Shipping Information */}
                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <h3 className="text-sm font-semibold font-['Lora'] text-neutral-900 mb-3 uppercase tracking-[1px]">
                      Información de envío:
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label
                          className="block text-xs font-medium font-['Lora'] text-neutral-700 mb-1 tracking-wide"
                          htmlFor="address"
                        >
                          Dirección *
                        </label>
                        <input
                          required
                          className="w-full px-4 py-2 border border-neutral-300 rounded-sm font-['Lora'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-transparent"
                          id="address"
                          placeholder="Calle, número, piso, depto., localidad"
                          type="text"
                          value={shippingInfo.address}
                          onChange={(e) =>
                            setShippingInfo({ address: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block text-xs font-medium font-['Lora'] text-neutral-700 mb-1 tracking-wide"
                          htmlFor="phone"
                        >
                          Número de teléfono *
                        </label>
                        <input
                          required
                          className="w-full px-4 py-2 border border-neutral-300 rounded-sm font-['Lora'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-transparent"
                          id="phone"
                          placeholder="+54 9 11 XXXX-XXXX"
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) =>
                            setShippingInfo({ phone: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block text-xs font-medium font-['Lora'] text-neutral-700 mb-1 tracking-wide"
                          htmlFor="postalCode"
                        >
                          Código Postal *
                        </label>
                        <div className="flex gap-2">
                          <input
                            required
                            className="w-1/2 px-4 py-2 border border-neutral-300 rounded-sm font-['Lora'] text-sm focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-transparent"
                            id="postalCode"
                            placeholder="Código Postal"
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                          />
                          <button
                            className="flex-1 px-4 py-2 bg-neutral-900 text-dorado-light font-['Lora'] text-xs font-semibold uppercase tracking-[1px] rounded-sm hover:bg-neutral-800 transition-colors"
                            onClick={handleCalculateShipping}
                          >
                            Calcular envío
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-neutral-200 p-6 space-y-6">
                {/* Shipping Cost */}
                {shippingCost !== null && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold font-['Lora'] text-neutral-900 uppercase tracking-[2px]">
                      Costo de Envío:
                    </span>
                    {!shippingEnabled || shippingCost === 0 ? (
                      <span className="text-lg font-bold font-['Lora'] text-green-700 tracking-wide">
                        Envío Gratis
                      </span>
                    ) : (
                      <span className="text-lg font-bold font-['Lora'] text-neutral-900 tracking-wide">
                        ${(shippingCost || 0).toLocaleString()}
                      </span>
                    )}
                  </div>
                )}

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold font-['Lora'] text-neutral-900 uppercase tracking-[2px]">
                    Total:
                  </span>
                  <span className="text-xl font-bold font-['Lora'] text-yellow-700 tracking-wide">
                    ${(totalAmount + (shippingCost || 0)).toLocaleString()}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    className="w-full !max-w-none !tracking-[3px] disabled:bg-amber-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={
                      isCheckingOut ||
                      mpLoading ||
                      shippingCost === null ||
                      !shippingInfo.address.trim() ||
                      !shippingInfo.phone.trim() ||
                      !shippingInfo.postalCode.trim()
                    }
                    variant="primary"
                    onClick={handleMercadoPagoCheckout}
                  >
                    {isCheckingOut || mpLoading
                      ? "PROCESANDO..."
                      : "PAGAR CON MERCADO PAGO"}
                  </Button>

                  <Button
                    className="w-full !max-w-none !tracking-[3px] bg-neutral-100 hover:bg-neutral-200"
                    disabled={isCheckingOut}
                    variant="outline"
                    onClick={handleLegacyCheckout}
                  >
                    PAGO PERSONALIZADO
                  </Button>

                  <Button
                    className="w-full !max-w-none hover:bg-transparent text-sm font-medium font-['Lora'] text-neutral-600 hover:text-red-600 transition-colors py-2 uppercase tracking-[3px] disabled:opacity-50"
                    disabled={isCheckingOut}
                    variant="outline"
                    onClick={clearCart}
                  >
                    VACIAR CARRITO
                  </Button>
                </div>

                {/* Error Message */}
                {mpError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-sm">
                    <p className="text-red-700 text-xs font-['Lora'] tracking-wide">
                      {mpError}
                    </p>
                  </div>
                )}

                {/* Info */}
                <p className="text-xs text-center text-neutral-600 font-['Lora'] tracking-wide leading-relaxed">
                  Los precios incluyen IVA.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
