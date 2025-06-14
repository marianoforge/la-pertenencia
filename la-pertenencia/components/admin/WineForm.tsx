/* eslint-disable no-console */
import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Spacer } from "@heroui/spacer";

import { useCreateWine, useUpdateWine } from "../../hooks/useWines";
import { Wine, CreateWineInput } from "../../types/wine";

interface WineFormProps {
  wine?: Wine | null;
  onSuccess: () => void;
}

const WINE_CATEGORIES = ["Tintos", "Blancos", "Rosados", "Espumantes"] as const;

export default function WineForm({ wine, onSuccess }: WineFormProps) {
  const [formData, setFormData] = useState<CreateWineInput>({
    name: "",
    description: "",
    price: 0,
    cost: 0,
    iva: 21,
    stock: 0,
    category: "Tintos",
    region: "",
    vintage: new Date().getFullYear(),
    alcohol: 0,
    image: "",
    featured: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const createWineMutation = useCreateWine();
  const updateWineMutation = useUpdateWine();

  useEffect(() => {
    if (wine) {
      setFormData({
        name: wine.name,
        description: wine.description,
        price: wine.price,
        cost: wine.cost,
        iva: wine.iva,
        stock: wine.stock,
        category: wine.category,
        region: wine.region,
        vintage: wine.vintage,
        alcohol: wine.alcohol,
        image: wine.image,
        featured: wine.featured,
      });
    }
  }, [wine]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    }

    if (formData.price <= 0) {
      newErrors.price = "El precio debe ser mayor a 0";
    }

    if (formData.cost <= 0) {
      newErrors.cost = "El costo debe ser mayor a 0";
    }

    if (formData.iva < 0 || formData.iva > 50) {
      newErrors.iva = "El IVA debe estar entre 0% y 50%";
    }

    if (formData.stock < 0) {
      newErrors.stock = "El stock no puede ser negativo";
    }

    if (!formData.region.trim()) {
      newErrors.region = "La región es requerida";
    }

    if (
      formData.vintage < 1900 ||
      formData.vintage > new Date().getFullYear() + 1
    ) {
      newErrors.vintage = "El año debe ser válido";
    }

    if (formData.alcohol <= 0 || formData.alcohol > 20) {
      newErrors.alcohol = "El alcohol debe estar entre 0 y 20%";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (wine) {
      // Actualizar vino existente
      updateWineMutation.mutate(
        { ...formData, id: wine.id },
        {
          onSuccess: () => {
            onSuccess();
          },
          onError: (error) => {
            console.error("Error updating wine:", error);
          },
        },
      );
    } else {
      // Crear nuevo vino
      createWineMutation.mutate(formData, {
        onSuccess: () => {
          onSuccess();
        },
        onError: (error) => {
          console.error("Error creating wine:", error);
        },
      });
    }
  };

  const handleInputChange =
    (field: keyof CreateWineInput) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const value =
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : e.target.value;

      setFormData((prev) => ({ ...prev, [field]: value }));

      // Limpiar error cuando el usuario empiece a escribir
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

  const isLoading =
    createWineMutation.isPending || updateWineMutation.isPending;

  // Función para calcular la ganancia
  const calculateProfit = () => {
    const priceWithTax = formData.price + (formData.price * formData.iva) / 100;
    const profit = formData.price - formData.cost;
    const profitPercentage =
      formData.cost > 0 ? (profit / formData.cost) * 100 : 0;

    return {
      profit: profit,
      profitPercentage: profitPercentage,
      priceWithTax: priceWithTax,
    };
  };

  const profitData = calculateProfit();

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          isRequired
          errorMessage={errors.name}
          isInvalid={!!errors.name}
          label="Nombre del Vino"
          placeholder="Ej: Malbec Reserva"
          value={formData.name}
          onChange={handleInputChange("name")}
        />

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="category">
            Categoría
          </label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="category"
            value={formData.category}
            onChange={handleInputChange("category")}
          >
            {WINE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="description">
          Descripción
        </label>
        <textarea
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="description"
          placeholder="Describe las características del vino..."
          rows={3}
          value={formData.description}
          onChange={handleInputChange("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
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
          value={formData.cost.toString()}
          onChange={handleInputChange("cost")}
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
          value={formData.iva.toString()}
          onChange={handleInputChange("iva")}
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
          value={formData.price.toString()}
          onChange={handleInputChange("price")}
        />

        <Input
          isRequired
          errorMessage={errors.stock}
          isInvalid={!!errors.stock}
          label="Stock"
          placeholder="50"
          type="number"
          value={formData.stock.toString()}
          onChange={handleInputChange("stock")}
        />

        <Input
          isRequired
          errorMessage={errors.vintage}
          isInvalid={!!errors.vintage}
          label="Año (Vintage)"
          placeholder="2023"
          type="number"
          value={formData.vintage.toString()}
          onChange={handleInputChange("vintage")}
        />
      </div>

      {/* Sección de Ganancia calculada */}
      {(formData.price > 0 || formData.cost > 0) && (
        <div className="bg-gray-50 p-4 rounded-lg">
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
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          isRequired
          errorMessage={errors.region}
          isInvalid={!!errors.region}
          label="Región"
          placeholder="Ej: Mendoza"
          value={formData.region}
          onChange={handleInputChange("region")}
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
          value={formData.alcohol.toString()}
          onChange={handleInputChange("alcohol")}
        />
      </div>

      <Input
        label="URL de la Imagen"
        placeholder="/images/wine.jpg"
        value={formData.image}
        onChange={handleInputChange("image")}
      />

      <div className="flex items-center space-x-2">
        <input
          checked={formData.featured}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          id="featured"
          type="checkbox"
          onChange={handleInputChange("featured")}
        />
        <label className="text-sm font-medium text-gray-700" htmlFor="featured">
          Vino destacado
        </label>
      </div>

      <Spacer y={1} />

      <div className="flex gap-2 justify-end">
        <Button
          color="primary"
          disabled={isLoading}
          isLoading={isLoading}
          type="submit"
        >
          {wine ? "Actualizar Vino" : "Crear Vino"}
        </Button>
      </div>
    </form>
  );
}
