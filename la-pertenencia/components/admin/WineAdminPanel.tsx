"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card } from "@heroui/card";
import { Spacer } from "@heroui/spacer";

import { useAuth } from "@/hooks/useAuth";
import {
  useWines,
  useCreateWine,
  useUpdateWine,
  useDeleteWine,
} from "@/hooks/useWines";
import { uploadWineImage, validateImageFile } from "@/lib/storage";
import { Wine, CreateWineInput } from "@/types/wine";

interface WineForm {
  marca: string;
  bodega: string;
  tipo:
    | "Tinto"
    | "Blanco"
    | "Red"
    | "Blend"
    | "Rosado"
    | "Espumante"
    | "Naranjo";
  varietal: string;
  maridaje: string;
  description: string;
  price: number;
  cost: number;
  iva: number;
  region: string;
  vintage: number;
  alcohol: number;
  stock: number;
  image: string;
  featured: boolean;
  winery: string;
}

const WINE_TYPES = [
  "Tinto",
  "Blanco",
  "Red",
  "Blend",
  "Rosado",
  "Espumante",
  "Naranjo",
] as const;

const WINE_VARIETALS = [
  "Malbec",
  "Cabernet Sauvignon",
  "Merlot",
  "Pinot Noir",
  "Cabernet Franc",
  "Syrah",
  "Chardonnay",
  "Sauvignon Blanc",
  "Petit Verdot",
  "Pinot Gris",
  "Bonarda",
  "Criolla",
  "Moscatel",
  "Sangiovese",
  "Torrontés",
  "Otros...",
] as const;

export default function WineAdminPanel() {
  const { user, logout, loading } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingWine, setEditingWine] = useState<Wine | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // TanStack Query hooks
  const {
    data: wines = [],
    isLoading: winesLoading,
    error: winesError,
  } = useWines();
  const createWineMutation = useCreateWine();
  const updateWineMutation = useUpdateWine();
  const deleteWineMutation = useDeleteWine();

  const [wineForm, setWineForm] = useState<WineForm>({
    marca: "",
    bodega: "",
    tipo: "Tinto",
    varietal: "Malbec",
    maridaje: "",
    description: "",
    price: 0,
    cost: 0,
    iva: 21,
    region: "Mendoza",
    vintage: new Date().getFullYear(),
    alcohol: 14.0,
    stock: 0,
    image: "",
    featured: false,
    winery: "La Pertenencia",
  });

  // Validar formulario
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!wineForm.marca.trim()) {
      newErrors.marca = "La marca es requerida";
    }

    if (!wineForm.bodega.trim()) {
      newErrors.bodega = "La bodega es requerida";
    }

    if (!wineForm.tipo) {
      newErrors.tipo = "El tipo es requerido";
    }

    if (!wineForm.varietal) {
      newErrors.varietal = "El varietal es requerido";
    }

    if (wineForm.price <= 0) {
      newErrors.price = "El precio debe ser mayor a 0";
    }

    if (wineForm.cost <= 0) {
      newErrors.cost = "El costo debe ser mayor a 0";
    }

    if (wineForm.iva < 0 || wineForm.iva > 50) {
      newErrors.iva = "El IVA debe estar entre 0% y 50%";
    }

    if (wineForm.stock < 0) {
      newErrors.stock = "El stock no puede ser negativo";
    }

    if (!wineForm.region.trim()) {
      newErrors.region = "La región es requerida";
    }

    if (
      wineForm.vintage < 1900 ||
      wineForm.vintage > new Date().getFullYear() + 1
    ) {
      newErrors.vintage = "El año debe ser válido";
    }

    if (wineForm.alcohol <= 0 || wineForm.alcohol > 20) {
      newErrors.alcohol = "El alcohol debe estar entre 0 y 20%";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Función para calcular la ganancia
  const calculateProfit = () => {
    const priceWithTax = wineForm.price + (wineForm.price * wineForm.iva) / 100;
    const profit = wineForm.price - wineForm.cost;
    const profitPercentage =
      wineForm.cost > 0 ? (profit / wineForm.cost) * 100 : 0;

    return {
      profit: profit,
      profitPercentage: profitPercentage,
      priceWithTax: priceWithTax,
    };
  };

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

  // Resetear formulario
  const resetForm = () => {
    setWineForm({
      marca: "",
      bodega: "",
      tipo: "Tinto",
      varietal: "Malbec",
      maridaje: "",
      description: "",
      price: 0,
      cost: 0,
      iva: 21,
      region: "Mendoza",
      vintage: new Date().getFullYear(),
      alcohol: 14.0,
      stock: 0,
      image: "",
      featured: false,
      winery: "La Pertenencia",
    });
    setSelectedFile(null);
    setEditingWine(null);
    setShowForm(false);
    setErrors({});
  };

  // Manejar cambios en el formulario
  const handleInputChange = (field: keyof WineForm, value: any) => {
    setWineForm((prev) => ({ ...prev, [field]: value }));

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Manejar submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setUploading(true);

    try {
      let imageUrl = wineForm.image || "/images/default-wine.jpg";

      // Subir imagen si se seleccionó una
      if (selectedFile) {
        if (!validateImageFile(selectedFile)) {
          alert("Archivo de imagen no válido");
          setUploading(false);

          return;
        }

        const tempId = editingWine?.id || `wine-${Date.now()}`;
        const uploadedUrl = await uploadWineImage(selectedFile, tempId);

        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      } else if (editingWine) {
        imageUrl = editingWine.image;
      }

      const wineData: CreateWineInput = {
        marca: wineForm.marca,
        bodega: wineForm.bodega,
        tipo: wineForm.tipo,
        varietal: wineForm.varietal,
        maridaje: wineForm.maridaje.trim() || undefined,
        description: wineForm.description.trim() || undefined,
        price: wineForm.price,
        cost: wineForm.cost,
        iva: wineForm.iva,
        region: wineForm.region,
        vintage: wineForm.vintage,
        alcohol: wineForm.alcohol,
        stock: wineForm.stock,
        image: imageUrl,
        featured: wineForm.featured,
      };

      if (editingWine) {
        // Actualizar vino existente
        await updateWineMutation.mutateAsync({
          id: editingWine.id,
          ...wineData,
        });
        alert("Vino actualizado exitosamente");
      } else {
        // Crear nuevo vino
        await createWineMutation.mutateAsync(wineData);
        alert("Vino creado exitosamente");
      }

      resetForm();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar el vino");
    }

    setUploading(false);
  };

  // Editar vino
  const handleEdit = (wine: Wine) => {
    setWineForm({
      marca: wine.marca,
      bodega: wine.bodega,
      tipo: wine.tipo || "Tinto", // Valor por defecto si es undefined
      varietal: wine.varietal || "Malbec", // Valor por defecto si es undefined
      maridaje: wine.maridaje || "", // Valor por defecto si es undefined
      description: wine.description || "",
      price: wine.price,
      cost: wine.cost,
      iva: wine.iva || 21,
      region: wine.region,
      vintage: wine.vintage,
      alcohol: wine.alcohol,
      stock: wine.stock,
      image: wine.image,
      featured: wine.featured,
      winery: wine.winery || "La Pertenencia",
    });
    setEditingWine(wine);
    setShowForm(true);
  };

  // Eliminar vino
  const handleDelete = async (wine: Wine) => {
    if (confirm(`¿Estás seguro de eliminar "${wine.marca}"?`)) {
      try {
        await deleteWineMutation.mutateAsync(wine.id);
        alert("Vino eliminado exitosamente");
      } catch (error) {
        console.error("Error deleting wine:", error);
        alert("Error al eliminar el vino");
      }
    }
  };

  const profitData = calculateProfit();

  // Mostrar loading si están cargando los vinos
  if (winesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando vinos...</div>
      </div>
    );
  }

  // Mostrar error si hay error al cargar vinos
  if (winesError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Error al cargar vinos
          </h2>
          <p className="text-gray-600">
            Por favor, verifica tu conexión a Firebase.
          </p>
        </Card>
      </div>
    );
  }

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
              <p className="text-gray-600">La Pertenencia - Gestión de Vinos</p>
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

        {/* Botón agregar vino */}
        <div className="mb-6">
          <Button
            color="primary"
            size="lg"
            startContent={<span>+</span>}
            onPress={() => setShowForm(true)}
          >
            Agregar Nuevo Vino
          </Button>
        </div>

        {/* Formulario de vino */}
        {showForm && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingWine ? "Editar Vino" : "Agregar Nuevo Vino"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  isRequired
                  errorMessage={errors.marca}
                  isInvalid={!!errors.marca}
                  label="Marca"
                  placeholder="Ej: Casa de Toro"
                  value={wineForm.marca}
                  onChange={(e) => handleInputChange("marca", e.target.value)}
                />

                <Input
                  isRequired
                  errorMessage={errors.bodega}
                  isInvalid={!!errors.bodega}
                  label="Bodega"
                  placeholder="Ej: Bodega Finca Los Andes"
                  value={wineForm.bodega}
                  onChange={(e) => handleInputChange("bodega", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="varietal"
                  >
                    Varietal
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="varietal"
                    value={wineForm.varietal}
                    onChange={(e) =>
                      handleInputChange("varietal", e.target.value)
                    }
                  >
                    {WINE_VARIETALS.map((varietal) => (
                      <option key={varietal} value={varietal}>
                        {varietal}
                      </option>
                    ))}
                  </select>
                  {errors.varietal && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.varietal}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="tipo"
                  >
                    Tipo
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="tipo"
                    value={wineForm.tipo}
                    onChange={(e) =>
                      handleInputChange(
                        "tipo",
                        e.target.value as
                          | "Tinto"
                          | "Blanco"
                          | "Red"
                          | "Blend"
                          | "Rosado"
                          | "Espumante"
                          | "Naranjo",
                      )
                    }
                  >
                    {WINE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="maridaje"
                  >
                    Maridaje
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="maridaje"
                    placeholder="Ej: Ideal para carnes rojas, quesos curados..."
                    rows={3}
                    value={wineForm.maridaje}
                    onChange={(e) =>
                      handleInputChange("maridaje", e.target.value)
                    }
                  />
                  {errors.maridaje && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.maridaje}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="description"
                >
                  Descripción
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="description"
                  placeholder="Describe las características del vino..."
                  rows={3}
                  value={wineForm.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Sección de Costos y Precios */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  isRequired
                  errorMessage={errors.cost}
                  isInvalid={!!errors.cost}
                  label="Costo del Vino"
                  placeholder="1200"
                  startContent={<span className="text-gray-500">$</span>}
                  type="number"
                  value={wineForm.cost.toString()}
                  onChange={(e) =>
                    handleInputChange("cost", Number(e.target.value))
                  }
                />

                <Input
                  isRequired
                  endContent={<span className="text-gray-500">%</span>}
                  errorMessage={errors.iva}
                  isInvalid={!!errors.iva}
                  label="IVA (%)"
                  placeholder="21"
                  step="0.1"
                  type="number"
                  value={wineForm.iva.toString()}
                  onChange={(e) =>
                    handleInputChange("iva", Number(e.target.value))
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  isRequired
                  errorMessage={errors.price}
                  isInvalid={!!errors.price}
                  label="Precio de Venta"
                  placeholder="2500"
                  startContent={<span className="text-gray-500">$</span>}
                  type="number"
                  value={wineForm.price.toString()}
                  onChange={(e) =>
                    handleInputChange("price", Number(e.target.value))
                  }
                />

                <Input
                  isRequired
                  errorMessage={errors.stock}
                  isInvalid={!!errors.stock}
                  label="Stock"
                  placeholder="50"
                  type="number"
                  value={wineForm.stock.toString()}
                  onChange={(e) =>
                    handleInputChange("stock", Number(e.target.value))
                  }
                />

                <Input
                  isRequired
                  errorMessage={errors.vintage}
                  isInvalid={!!errors.vintage}
                  label="Año (Vintage)"
                  placeholder="2023"
                  type="number"
                  value={wineForm.vintage.toString()}
                  onChange={(e) =>
                    handleInputChange("vintage", Number(e.target.value))
                  }
                />
              </div>

              {/* Sección de Ganancia calculada */}
              {(wineForm.price > 0 || wineForm.cost > 0) && (
                <Card className="bg-gray-50 p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    💰 Análisis de Ganancia
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Precio con IVA:</span>
                      <div className="font-medium text-blue-600">
                        ${profitData.priceWithTax.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Ganancia:</span>
                      <div
                        className={`font-medium ${profitData.profit >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        ${profitData.profit.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Margen (%):</span>
                      <div
                        className={`font-medium ${profitData.profitPercentage >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {profitData.profitPercentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  isRequired
                  errorMessage={errors.region}
                  isInvalid={!!errors.region}
                  label="Región"
                  placeholder="Ej: Mendoza"
                  value={wineForm.region}
                  onChange={(e) => handleInputChange("region", e.target.value)}
                />

                <Input
                  isRequired
                  endContent={<span className="text-gray-500">%</span>}
                  errorMessage={errors.alcohol}
                  isInvalid={!!errors.alcohol}
                  label="Graduación Alcohólica (%)"
                  placeholder="14.5"
                  step="0.1"
                  type="number"
                  value={wineForm.alcohol.toString()}
                  onChange={(e) =>
                    handleInputChange("alcohol", Number(e.target.value))
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="URL de la Imagen"
                  placeholder="/images/wine.jpg"
                  value={wineForm.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                />

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="wine-image-file"
                  >
                    Subir Imagen
                  </label>
                  <input
                    accept="image/*"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    id="wine-image-file"
                    type="file"
                    onChange={(e) =>
                      setSelectedFile(e.target.files?.[0] || null)
                    }
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  checked={wineForm.featured}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  id="featured"
                  type="checkbox"
                  onChange={(e) =>
                    handleInputChange("featured", e.target.checked)
                  }
                />
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="featured"
                >
                  Vino destacado
                </label>
              </div>

              <Spacer y={1} />

              <div className="flex gap-2 justify-end">
                <Button color="default" variant="bordered" onPress={resetForm}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  isDisabled={
                    uploading ||
                    createWineMutation.isPending ||
                    updateWineMutation.isPending
                  }
                  isLoading={
                    uploading ||
                    createWineMutation.isPending ||
                    updateWineMutation.isPending
                  }
                  type="submit"
                >
                  {uploading
                    ? "Procesando..."
                    : editingWine
                      ? "Actualizar Vino"
                      : "Crear Vino"}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Lista de vinos */}
        <Card>
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Vinos ({wines.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Vino
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Costo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ganancia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Destacado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {wines.map((wine) => {
                  const profit = wine.price - wine.cost;
                  const profitPercentage =
                    wine.cost > 0 ? (profit / wine.cost) * 100 : 0;

                  return (
                    <tr key={wine.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            alt={wine.marca}
                            className="h-12 w-12 rounded object-cover mr-4"
                            src={wine.image}
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {wine.marca}
                            </div>
                            <div className="text-sm text-gray-500">
                              {wine.region} {wine.vintage}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {wine.tipo}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ${wine.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ${wine.cost}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div
                          className={`font-medium ${profit >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          ${profit.toFixed(2)}
                        </div>
                        <div
                          className={`text-xs ${profitPercentage >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {profitPercentage.toFixed(1)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {wine.stock}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {wine.featured ? (
                          <span className="text-yellow-500">⭐</span>
                        ) : (
                          <span className="text-gray-300">☆</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <Button
                          color="primary"
                          isDisabled={deleteWineMutation.isPending}
                          size="sm"
                          variant="light"
                          onPress={() => handleEdit(wine)}
                        >
                          Editar
                        </Button>
                        <Button
                          color="danger"
                          isDisabled={deleteWineMutation.isPending}
                          isLoading={deleteWineMutation.isPending}
                          size="sm"
                          variant="light"
                          onPress={() => handleDelete(wine)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
