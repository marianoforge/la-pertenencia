"use client";

import { useState, useEffect } from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import Image from "next/image";

import { Order } from "@/types/order";
import { getAllOrders, deleteOrder, updateOrderStatus } from "@/lib/firestore";

export default function OrdersAdminPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const ordersData = await getAllOrders();

    setOrders(ordersData);
    setLoading(false);
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (
      !confirm(
        "¿Estás seguro de que quieres eliminar este pedido? Esta acción no se puede deshacer."
      )
    ) {
      return;
    }

    const success = await deleteOrder(orderId);

    if (success) {
      setOrders(orders.filter((order) => order.id !== orderId));
      setSelectedOrder(null);
      alert("Pedido eliminado exitosamente");
    } else {
      alert("Error al eliminar el pedido");
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: Order["status"]) => {
    const success = await updateOrderStatus(orderId, newStatus);

    if (success) {
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
      alert("Estado actualizado exitosamente");
    } else {
      alert("Error al actualizar el estado");
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "processing":
        return "Procesando";
      case "completed":
        return "Completado";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

  const getPaymentMethodLabel = (method: Order["paymentMethod"]) => {
    return method === "mercadopago" ? "Mercado Pago" : "Pago Personalizado";
  };

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    completed: orders.filter((o) => o.status === "completed").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
    revenue: orders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + o.finalAmount, 0),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="p-4 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Total</div>
          <div className="text-2xl font-bold text-gray-900">
            {orderStats.total}
          </div>
        </Card>
        <Card className="p-4 shadow-sm border-l-4 border-yellow-500">
          <div className="text-sm text-gray-600 mb-1">Pendientes</div>
          <div className="text-2xl font-bold text-yellow-700">
            {orderStats.pending}
          </div>
        </Card>
        <Card className="p-4 shadow-sm border-l-4 border-blue-500">
          <div className="text-sm text-gray-600 mb-1">Procesando</div>
          <div className="text-2xl font-bold text-blue-700">
            {orderStats.processing}
          </div>
        </Card>
        <Card className="p-4 shadow-sm border-l-4 border-green-500">
          <div className="text-sm text-gray-600 mb-1">Completados</div>
          <div className="text-2xl font-bold text-green-700">
            {orderStats.completed}
          </div>
        </Card>
        <Card className="p-4 shadow-sm border-l-4 border-red-500">
          <div className="text-sm text-gray-600 mb-1">Cancelados</div>
          <div className="text-2xl font-bold text-red-700">
            {orderStats.cancelled}
          </div>
        </Card>
        <Card className="p-4 shadow-sm bg-indigo-50">
          <div className="text-sm text-indigo-600 mb-1">Ingresos</div>
          <div className="text-2xl font-bold text-indigo-700">
            ${orderStats.revenue.toLocaleString()}
          </div>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <Button
            color={filterStatus === "all" ? "primary" : "default"}
            size="sm"
            variant={filterStatus === "all" ? "solid" : "flat"}
            onPress={() => setFilterStatus("all")}
          >
            Todos
          </Button>
          <Button
            color={filterStatus === "pending" ? "warning" : "default"}
            size="sm"
            variant={filterStatus === "pending" ? "solid" : "flat"}
            onPress={() => setFilterStatus("pending")}
          >
            Pendientes
          </Button>
          <Button
            color={filterStatus === "processing" ? "primary" : "default"}
            size="sm"
            variant={filterStatus === "processing" ? "solid" : "flat"}
            onPress={() => setFilterStatus("processing")}
          >
            Procesando
          </Button>
          <Button
            color={filterStatus === "completed" ? "success" : "default"}
            size="sm"
            variant={filterStatus === "completed" ? "solid" : "flat"}
            onPress={() => setFilterStatus("completed")}
          >
            Completados
          </Button>
          <Button
            color={filterStatus === "cancelled" ? "danger" : "default"}
            size="sm"
            variant={filterStatus === "cancelled" ? "solid" : "flat"}
            onPress={() => setFilterStatus("cancelled")}
          >
            Cancelados
          </Button>
        </div>
      </Card>

      {/* Lista de pedidos */}
      {filteredOrders.length === 0 ? (
        <Card className="p-8 shadow-sm">
          <div className="text-center text-gray-500">
            <p className="text-lg">No hay pedidos para mostrar</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {order.orderNumber}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleString("es-AR", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}
                  >
                    {getStatusLabel(order.status)}
                  </span>
                  <Button
                    color="primary"
                    size="sm"
                    variant="light"
                    onPress={() => setSelectedOrder(order)}
                  >
                    Ver detalles
                  </Button>
                </div>
              </div>

              {/* Resumen del pedido */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Productos</p>
                  <p className="text-sm font-semibold">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    items
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Método de pago</p>
                  <p className="text-sm font-semibold">
                    {getPaymentMethodLabel(order.paymentMethod)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total</p>
                  <p className="text-lg font-bold text-indigo-600">
                    ${order.finalAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Información de envío */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Información de Envío:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Dirección:</span>{" "}
                    <span className="font-medium">
                      {order.shippingInfo.address}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Teléfono:</span>{" "}
                    <span className="font-medium">
                      {order.shippingInfo.phone}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">CP:</span>{" "}
                    <span className="font-medium">
                      {order.shippingInfo.postalCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Acciones rápidas */}
              <div className="mt-4 flex flex-wrap gap-2">
                {order.status === "pending" && (
                  <Button
                    color="primary"
                    size="sm"
                    variant="flat"
                    onPress={() => handleUpdateStatus(order.id!, "processing")}
                  >
                    Marcar como Procesando
                  </Button>
                )}
                {order.status === "processing" && (
                  <Button
                    color="success"
                    size="sm"
                    variant="flat"
                    onPress={() => handleUpdateStatus(order.id!, "completed")}
                  >
                    Marcar como Completado
                  </Button>
                )}
                {order.status !== "cancelled" && (
                  <Button
                    color="danger"
                    size="sm"
                    variant="flat"
                    onPress={() => handleUpdateStatus(order.id!, "cancelled")}
                  >
                    Cancelar
                  </Button>
                )}
                <Button
                  color="danger"
                  size="sm"
                  variant="light"
                  onPress={() => handleDeleteOrder(order.id!)}
                >
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de detalles */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedOrder.orderNumber}
                </h2>
                <p className="text-sm text-gray-600">
                  {new Date(selectedOrder.createdAt).toLocaleString("es-AR", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <button
                className="text-gray-400 hover:text-gray-600 text-2xl"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Estado y método de pago */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Estado</p>
                  <span
                    className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(selectedOrder.status)}`}
                  >
                    {getStatusLabel(selectedOrder.status)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Método de pago</p>
                  <p className="text-lg font-semibold">
                    {getPaymentMethodLabel(selectedOrder.paymentMethod)}
                  </p>
                </div>
              </div>

              {/* Información de Mercado Pago */}
              {selectedOrder.mercadoPagoData && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-blue-900 mb-2">
                    Información de Mercado Pago
                  </p>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-blue-700">ID Preferencia:</span>{" "}
                      <span className="font-mono text-blue-900">
                        {selectedOrder.mercadoPagoData.preferenceId}
                      </span>
                    </div>
                    {selectedOrder.mercadoPagoData.paymentId && (
                      <div>
                        <span className="text-blue-700">ID Pago:</span>{" "}
                        <span className="font-mono text-blue-900">
                          {selectedOrder.mercadoPagoData.paymentId}
                        </span>
                      </div>
                    )}
                    {selectedOrder.mercadoPagoData.paymentStatus && (
                      <div>
                        <span className="text-blue-700">Estado del Pago:</span>{" "}
                        <span className="font-semibold text-blue-900">
                          {selectedOrder.mercadoPagoData.paymentStatus}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Información de envío */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Información de Envío
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div>
                    <span className="text-gray-600 text-sm">Dirección:</span>
                    <p className="font-medium">
                      {selectedOrder.shippingInfo.address}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Teléfono:</span>
                    <p className="font-medium">
                      {selectedOrder.shippingInfo.phone}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">
                      Código Postal:
                    </span>
                    <p className="font-medium">
                      {selectedOrder.shippingInfo.postalCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Productos */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Productos ({selectedOrder.items.length})
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 bg-gray-50 rounded-lg p-4"
                    >
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 relative overflow-hidden">
                        {item.wine.image ? (
                          <Image
                            alt={item.wine.marca}
                            className="object-cover"
                            fill
                            src={item.wine.image}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            🍷
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {item.wine.marca}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.wine.winery} • {item.wine.vintage}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.wine.tipo} • {item.wine.varietal}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          Cantidad: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          ${item.priceAtTimeOfAdd.toLocaleString()} c/u
                        </p>
                        <p className="font-semibold text-gray-900">
                          $
                          {(
                            item.priceAtTimeOfAdd * item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumen de costos */}
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span className="font-medium">
                      ${selectedOrder.totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Costo de Envío:</span>
                    <span className="font-medium">
                      ${selectedOrder.shippingCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-200 pt-2">
                    <span>Total:</span>
                    <span className="text-indigo-600">
                      ${selectedOrder.finalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex flex-wrap gap-2 border-t border-gray-200 pt-4">
                {selectedOrder.status === "pending" && (
                  <Button
                    color="primary"
                    onPress={() => {
                      handleUpdateStatus(selectedOrder.id!, "processing");
                      setSelectedOrder(null);
                    }}
                  >
                    Marcar como Procesando
                  </Button>
                )}
                {selectedOrder.status === "processing" && (
                  <Button
                    color="success"
                    onPress={() => {
                      handleUpdateStatus(selectedOrder.id!, "completed");
                      setSelectedOrder(null);
                    }}
                  >
                    Marcar como Completado
                  </Button>
                )}
                {selectedOrder.status !== "cancelled" && (
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={() => {
                      handleUpdateStatus(selectedOrder.id!, "cancelled");
                      setSelectedOrder(null);
                    }}
                  >
                    Cancelar Pedido
                  </Button>
                )}
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    handleDeleteOrder(selectedOrder.id!);
                  }}
                >
                  Eliminar Pedido
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

