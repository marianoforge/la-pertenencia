"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card } from "@heroui/card";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

import { useAuth } from "@/hooks/useAuth";
import {
  useCombos,
  useCreateCombo,
  useUpdateCombo,
  useDeleteCombo,
} from "@/hooks/useCombos";
import { useWines } from "@/hooks/useWines";
import { uploadWineImage, validateImageFile } from "@/lib/storage";
import { Combo } from "@/types/combo";

interface ComboForm {
  name: string;
  selectedWineIds: string[];
  price: number;
  image: string; // Solo la imagen de los vinos, el fondo es fijo
  featured: boolean;
}

export default function ComboAdminPanel() {
  const { user, logout, loading } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingCombo, setEditingCombo] = useState<Combo | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBgFile, setSelectedBgFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Estados para paginación y búsqueda
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  // TanStack Query hooks
  const {
    data: combos = [],
    isLoading: combosLoading,
    error: combosError,
  } = useCombos();

  const { data: wines = [], isLoading: winesLoading } = useWines();

  const createComboMutation = useCreateCombo();
  const updateComboMutation = useUpdateCombo();
  const deleteComboMutation = useDeleteCombo();

  // Filtrar combos por término de búsqueda
  const filteredCombos = combos.filter((combo) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      combo.name.toLowerCase().includes(searchLower) ||
      combo.wines.some((wine) => wine.marca.toLowerCase().includes(searchLower))
    );
  });

  // Calcular paginación
  const totalPages = Math.ceil(filteredCombos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCombos = filteredCombos.slice(startIndex, endIndex);

  // Resetear página cuando cambia la búsqueda
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const [comboForm, setComboForm] = useState<ComboForm>({
    name: "",
    selectedWineIds: [],
    price: 0,
    image: "",
    featured: false,
  });

  // Validar formulario
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!comboForm.name.trim()) {
      newErrors.name = "El nombre del combo es requerido";
    }

    if (comboForm.selectedWineIds.length === 0) {
      newErrors.wines = "Debe seleccionar al menos un vino";
    }

    if (comboForm.price <= 0) {
      newErrors.price = "El precio debe ser mayor a 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        </Card>
      </div>
    );
  }

  // Resetear formulario
  const resetForm = () => {
    setComboForm({
      name: "",
      selectedWineIds: [],
      price: 0,
      image: "",
      featured: false,
    });
    setSelectedFile(null);
    setSelectedBgFile(null);
    setEditingCombo(null);
    setShowForm(false);
    setErrors({});
  };

  // Manejar cambios en el formulario
  const handleInputChange = (field: keyof ComboForm, value: any) => {
    setComboForm((prev) => ({ ...prev, [field]: value }));

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Manejar selección de vinos con cantidad
  const getWineQuantity = (wineId: string): number => {
    return comboForm.selectedWineIds.filter((id) => id === wineId).length;
  };

  const handleAddWine = (wineId: string) => {
    setComboForm((prev) => ({
      ...prev,
      selectedWineIds: [...prev.selectedWineIds, wineId],
    }));
    // Limpiar error cuando se selecciona un vino
    if (errors.wines) {
      setErrors((prev) => ({ ...prev, wines: "" }));
    }
  };

  const handleRemoveWine = (wineId: string) => {
    const index = comboForm.selectedWineIds.indexOf(wineId);
    if (index > -1) {
      const newSelectedWineIds = [...comboForm.selectedWineIds];
      newSelectedWineIds.splice(index, 1);
      setComboForm((prev) => ({
        ...prev,
        selectedWineIds: newSelectedWineIds,
      }));
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
      let imageUrl = comboForm.image || "/images/imagen-combos.png";
      const backgroundImageUrl = "/images/fondo-combo.png"; // Fondo fijo

      // Subir imagen de los vinos si se seleccionó una
      if (selectedFile) {
        if (!validateImageFile(selectedFile)) {
          alert("Archivo de imagen no válido");
          setUploading(false);
          return;
        }

        const tempId = editingCombo?.id || `combo-${Date.now()}`;
        const uploadedUrl = await uploadWineImage(selectedFile, tempId);

        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      // Obtener los vinos seleccionados (permitiendo duplicados)
      const selectedWines = comboForm.selectedWineIds.map((wineId) => {
        const wine = wines.find((w) => w.id === wineId);
        if (!wine) {
          throw new Error(`Vino con ID ${wineId} no encontrado`);
        }
        return {
          id: wine.id,
          marca: wine.marca,
          image: wine.image,
        };
      });

      // Crear objeto del combo
      const comboData = {
        name: comboForm.name,
        wines: selectedWines,
        description: selectedWines.map((wine) => wine.marca),
        price: comboForm.price,
        image: imageUrl,
        backgroundImage: backgroundImageUrl,
        featured: comboForm.featured,
      };

      if (editingCombo) {
        // Actualizar combo existente
        await updateComboMutation.mutateAsync({
          id: editingCombo.id,
          ...comboData,
        });
        alert("Combo actualizado exitosamente");
      } else {
        // Crear nuevo combo
        await createComboMutation.mutateAsync({
          ...comboData,
          wineIds: comboForm.selectedWineIds,
        });
        alert("Combo creado exitosamente");
      }

      resetForm();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar el combo");
    }

    setUploading(false);
  };

  // Editar combo
  const handleEdit = (combo: Combo) => {
    setComboForm({
      name: combo.name,
      selectedWineIds: combo.wines.map((wine) => wine.id),
      price: combo.price,
      image: combo.image,
      featured: combo.featured,
    });
    setEditingCombo(combo);
    setShowForm(true);
  };

  // Eliminar combo
  const handleDelete = async (combo: Combo) => {
    if (confirm(`¿Estás seguro de eliminar "${combo.name}"?`)) {
      try {
        await deleteComboMutation.mutateAsync(combo.id);
        alert("Combo eliminado exitosamente");
      } catch (error) {
        console.error("Error deleting combo:", error);
        alert("Error al eliminar el combo");
      }
    }
  };

  // Mostrar loading si están cargando los combos
  if (combosLoading || winesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando combos...</div>
      </div>
    );
  }

  // Mostrar error si hay error al cargar combos
  if (combosError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Error al cargar combos
          </h2>
          <p className="text-gray-600">
            Por favor, verifica tu conexión a Firebase.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Botón agregar combo */}
      <div className="mb-6">
        <Button
          color="primary"
          size="lg"
          startContent={<span>+</span>}
          onPress={() => setShowForm(true)}
        >
          Agregar Nuevo Combo
        </Button>
      </div>

      {/* Modal de formulario de combo */}
      <Modal
        isDismissable={false}
        isOpen={showForm}
        scrollBehavior="inside"
        size="3xl"
        onClose={resetForm}
      >
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              {editingCombo ? "Editar Combo" : "Agregar Nuevo Combo"}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                {/* Nombre del combo */}
                <Input
                  isRequired
                  errorMessage={errors.name}
                  isInvalid={!!errors.name}
                  label="Nombre del Combo"
                  placeholder="Ej: COMBO PREMIUM"
                  value={comboForm.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />

                {/* Selección de vinos con cantidad */}
                <div>
                  <div className="block text-sm font-medium mb-2">
                    Seleccionar Vinos *
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    Puedes agregar el mismo vino múltiples veces
                  </div>
                  <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-md p-4 space-y-3">
                    {wines.map((wine) => {
                      const quantity = getWineQuantity(wine.id);
                      return (
                        <div
                          key={wine.id}
                          className="flex items-center justify-between space-x-2 p-2 rounded hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <img
                              alt={wine.marca}
                              className="w-10 h-10 rounded object-cover flex-shrink-0"
                              src={wine.image}
                            />
                            <span className="text-sm truncate">
                              {wine.marca} - {wine.bodega} ({wine.tipo})
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            <Button
                              isIconOnly
                              color="danger"
                              isDisabled={quantity === 0}
                              size="sm"
                              variant="flat"
                              onPress={() => handleRemoveWine(wine.id)}
                            >
                              -
                            </Button>
                            <span className="text-sm font-semibold min-w-[2ch] text-center">
                              {quantity}
                            </span>
                            <Button
                              isIconOnly
                              color="primary"
                              size="sm"
                              variant="flat"
                              onPress={() => handleAddWine(wine.id)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.wines && (
                    <p className="text-red-500 text-xs mt-1">{errors.wines}</p>
                  )}
                </div>

                {/* Precio */}
                <Input
                  isRequired
                  errorMessage={errors.price}
                  isInvalid={!!errors.price}
                  label="Precio del Combo"
                  placeholder="55990"
                  startContent={<span className="text-gray-500">$</span>}
                  type="number"
                  value={comboForm.price.toString()}
                  onChange={(e) =>
                    handleInputChange("price", Number(e.target.value))
                  }
                />

                {/* Imagen de los vinos */}
                <div>
                  <Input
                    label="URL de la Imagen de los Vinos"
                    placeholder="/images/imagen-combos.png"
                    value={comboForm.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                  />
                  <div className="mt-2">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="combo-image-upload"
                    >
                      Subir Imagen de los Vinos
                    </label>
                    <input
                      accept="image/*"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      id="combo-image-upload"
                      type="file"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Esta imagen se mostrará en el combo. El fondo es fijo y
                      siempre será el mismo.
                    </p>
                  </div>
                </div>

                {/* Destacado */}
                <div className="flex items-center space-x-2">
                  <input
                    checked={comboForm.featured}
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
                    Mostrar en carousel de combos
                  </label>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="bordered" onPress={resetForm}>
                Cancelar
              </Button>
              <Button
                color="primary"
                isDisabled={
                  uploading ||
                  createComboMutation.isPending ||
                  updateComboMutation.isPending
                }
                isLoading={
                  uploading ||
                  createComboMutation.isPending ||
                  updateComboMutation.isPending
                }
                type="submit"
              >
                {uploading
                  ? "Procesando..."
                  : editingCombo
                    ? "Actualizar Combo"
                    : "Crear Combo"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Lista de combos */}
      <Card>
        <div className="px-6 py-4 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold">
              Combos ({filteredCombos.length} de {combos.length})
            </h2>

            {/* Buscador */}
            <div className="w-full sm:w-80">
              <Input
                isClearable
                placeholder="Buscar por nombre o vinos..."
                startContent={<span>🔍</span>}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onClear={() => handleSearchChange("")}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Combo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Vinos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Precio
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
              {paginatedCombos.length === 0 ? (
                <tr>
                  <td
                    className="px-6 py-8 text-center text-gray-500"
                    colSpan={5}
                  >
                    {searchTerm ? (
                      <>
                        No se encontraron combos que coincidan con &quot;
                        {searchTerm}&quot;
                        <br />
                        <Button
                          className="mt-2"
                          size="sm"
                          variant="light"
                          onPress={() => handleSearchChange("")}
                        >
                          Limpiar búsqueda
                        </Button>
                      </>
                    ) : (
                      "No hay combos registrados"
                    )}
                  </td>
                </tr>
              ) : (
                paginatedCombos.map((combo) => (
                  <tr key={combo.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          alt={combo.name}
                          className="h-12 w-12 rounded object-cover mr-4"
                          src={combo.image}
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {combo.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="space-y-1">
                        {combo.wines.slice(0, 3).map((wine, index) => (
                          <div key={index} className="text-xs">
                            {wine.marca}
                          </div>
                        ))}
                        {combo.wines.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{combo.wines.length - 3} más
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${combo.price}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {combo.featured ? (
                        <span className="text-yellow-500">⭐</span>
                      ) : (
                        <span className="text-gray-300">☆</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <Button
                        color="primary"
                        isDisabled={deleteComboMutation.isPending}
                        size="sm"
                        variant="light"
                        onPress={() => handleEdit(combo)}
                      >
                        Editar
                      </Button>
                      <Button
                        color="danger"
                        isDisabled={deleteComboMutation.isPending}
                        isLoading={deleteComboMutation.isPending}
                        size="sm"
                        variant="light"
                        onPress={() => handleDelete(combo)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Controles de paginación */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-700">
                Mostrando {startIndex + 1} a{" "}
                {Math.min(endIndex, filteredCombos.length)} de{" "}
                {filteredCombos.length} combos
              </div>

              <div className="flex items-center gap-2">
                <Button
                  isDisabled={currentPage === 1}
                  size="sm"
                  variant="bordered"
                  onPress={() => setCurrentPage(currentPage - 1)}
                >
                  Anterior
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        className="min-w-[40px]"
                        color={currentPage === page ? "primary" : "default"}
                        size="sm"
                        variant={currentPage === page ? "solid" : "light"}
                        onPress={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    )
                  )}
                </div>

                <Button
                  isDisabled={currentPage === totalPages}
                  size="sm"
                  variant="bordered"
                  onPress={() => setCurrentPage(currentPage + 1)}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
