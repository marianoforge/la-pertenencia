"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";

import { useAuth } from "@/hooks/useAuth";
import WineAdminPanel from "./WineAdminPanel";
import ComboAdminPanel from "./ComboAdminPanel";

type TabType = "wines" | "combos";

export default function AdminPanel() {
  const { user, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("wines");

  // Manejar login si no está autenticado
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="max-w-md p-8">
          <h1 className="text-2xl font-bold mb-4">
            🍷 Admin Panel - La Pertenencia
          </h1>
          <p className="text-gray-600 mb-4">
            Debes iniciar sesión para acceder al panel de administración.
          </p>
          <div className="text-sm bg-blue-50 p-4 rounded">
            💡 <strong>Para obtener tu UID:</strong>
            <br />
            1. Inicia sesión en tu app
            <br />
            2. Usa el componente GetMyUID
            <br />
            3. Actualiza las reglas de Firebase con tu UID
          </div>
        </Card>
      </div>
    );
  }

  // Mostrar UID para configurar como admin
  const showUID = () => (
    <Card className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>Tu UID para configurar como admin:</strong>
          </p>
          <code className="text-xs bg-gray-800 text-green-400 p-2 rounded block mt-2">
            {user.uid}
          </code>
          <p className="text-xs text-yellow-600 mt-2">
            Copia este UID y úsalo en las reglas de Firebase para obtener
            permisos de administrador.
          </p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🍷 Panel de Administración
              </h1>
              <p className="text-gray-600">
                La Pertenencia - Gestión de Contenido
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {user.displayName || user.email}
              </span>
              <Button color="danger" size="sm" onClick={logout}>
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mostrar UID para configurar admin */}
        {showUID()}

        {/* Tabs de navegación */}
        <Card className="mb-6">
          <div className="px-6 py-4">
            <div className="flex space-x-1">
              <Button
                variant={activeTab === "wines" ? "solid" : "light"}
                color={activeTab === "wines" ? "primary" : "default"}
                onPress={() => setActiveTab("wines")}
                className="px-6"
              >
                🍷 Vinos
              </Button>
              <Button
                variant={activeTab === "combos" ? "solid" : "light"}
                color={activeTab === "combos" ? "primary" : "default"}
                onPress={() => setActiveTab("combos")}
                className="px-6"
              >
                📦 Combos
              </Button>
            </div>
          </div>
        </Card>

        {/* Contenido de las tabs */}
        {activeTab === "wines" && <WineAdminPanel />}
        {activeTab === "combos" && <ComboAdminPanel />}
      </div>
    </div>
  );
}

