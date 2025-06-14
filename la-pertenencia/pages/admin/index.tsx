import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import { Input } from "@heroui/input";

// Componentes temporales que agregamos inline hasta que creemos los archivos separados
const Chip = ({
  children,
  color = "default",
  size = "md",
}: {
  children: React.ReactNode;
  color?: string;
  size?: string;
}) => (
  <span
    className={`px-2 py-1 rounded text-xs ${
      color === "danger"
        ? "bg-red-100 text-red-800"
        : color === "warning"
          ? "bg-yellow-100 text-yellow-800"
          : color === "secondary"
            ? "bg-purple-100 text-purple-800"
            : color === "primary"
              ? "bg-blue-100 text-blue-800"
              : color === "success"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
    }`}
  >
    {children}
  </span>
);

const Spinner = ({ size = "md" }: { size?: string }) => (
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
);

import { useWines, useDeleteWine } from "../../hooks/useWines";
import { useWineStore } from "../../stores/useWineStore";
import { Wine } from "../../types/wine";
import WineForm from "../../components/admin/WineForm";

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { filters, setFilters } = useWineStore();
  const {
    data: wines,
    isLoading,
    error,
  } = useWines({
    ...filters,
    search: searchTerm,
  });
  const deleteWineMutation = useDeleteWine();

  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (wine: Wine) => {
    setSelectedWine(wine);
    setIsEditing(true);
    onFormOpen();
  };

  const handleCreate = () => {
    setSelectedWine(null);
    setIsEditing(false);
    onFormOpen();
  };

  const handleDeleteConfirm = (wine: Wine) => {
    setSelectedWine(wine);
    onDeleteOpen();
  };

  const handleDelete = () => {
    if (selectedWine) {
      deleteWineMutation.mutate(selectedWine.id, {
        onSuccess: () => {
          onDeleteClose();
          setSelectedWine(null);
        },
      });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tintos":
        return "danger";
      case "Blancos":
        return "warning";
      case "Rosados":
        return "secondary";
      case "Espumantes":
        return "primary";
      default:
        return "default";
    }
  };

  const calculateProfit = (wine: Wine) => {
    const profit = wine.price - wine.cost;
    const profitPercentage = wine.cost > 0 ? (profit / wine.cost) * 100 : 0;
    const priceWithTax = wine.price + (wine.price * wine.iva) / 100;

    return {
      profit: profit,
      profitPercentage: profitPercentage,
      priceWithTax: priceWithTax,
    };
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card>
          <CardBody>
            <p className="text-danger">Error al cargar los vinos</p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Administración de Vinos</h1>
            <p className="text-gray-600">La Pertenencia - Backoffice</p>
          </div>
          <Button color="primary" onPress={handleCreate}>
            Agregar Vino
          </Button>
        </CardHeader>

        <CardBody>
          <div className="mb-4 flex gap-4">
            <Input
              className="max-w-xs"
              placeholder="Buscar vinos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table aria-label="Tabla de vinos">
            <TableHeader>
              <TableColumn>NOMBRE</TableColumn>
              <TableColumn>CATEGORÍA</TableColumn>
              <TableColumn>REGIÓN</TableColumn>
              <TableColumn>COSTO</TableColumn>
              <TableColumn>PRECIO</TableColumn>
              <TableColumn>PRECIO + IVA</TableColumn>
              <TableColumn>GANANCIA</TableColumn>
              <TableColumn>IVA</TableColumn>
              <TableColumn>STOCK</TableColumn>
              <TableColumn>DESTACADO</TableColumn>
              <TableColumn>ACCIONES</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No hay vinos disponibles">
              {wines?.map((wine) => (
                <TableRow key={wine.id}>
                  <TableCell>
                    <div>
                      <p className="font-semibold">{wine.name}</p>
                      <p className="text-sm text-gray-500">{wine.vintage}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip color={getCategoryColor(wine.category)} size="sm">
                      {wine.category}
                    </Chip>
                  </TableCell>
                  <TableCell>{wine.region}</TableCell>
                  <TableCell>${wine.cost.toLocaleString()}</TableCell>
                  <TableCell>${wine.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium text-blue-600">
                        ${calculateProfit(wine).priceWithTax.toFixed(0)}
                      </div>
                      <div className="text-xs text-gray-500">+{wine.iva}%</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const profit = calculateProfit(wine);

                      return (
                        <div className="text-center">
                          <div
                            className={`font-medium ${profit.profit >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            ${profit.profit.toFixed(0)}
                          </div>
                          <div
                            className={`text-xs ${profit.profitPercentage >= 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            {profit.profitPercentage.toFixed(1)}%
                          </div>
                        </div>
                      );
                    })()}
                  </TableCell>
                  <TableCell>
                    <Chip color="secondary" size="sm">
                      {wine.iva}%
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={
                        wine.stock > 10
                          ? "success"
                          : wine.stock > 0
                            ? "warning"
                            : "danger"
                      }
                      size="sm"
                    >
                      {wine.stock}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={wine.featured ? "success" : "default"}
                      size="sm"
                    >
                      {wine.featured ? "Sí" : "No"}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        color="primary"
                        size="sm"
                        onPress={() => handleEdit(wine)}
                      >
                        Editar
                      </Button>
                      <Button
                        color="danger"
                        size="sm"
                        variant="light"
                        onPress={() => handleDeleteConfirm(wine)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) || []}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Modal de formulario */}
      <Modal isOpen={isFormOpen} size="2xl" onClose={onFormClose}>
        <ModalContent>
          <ModalHeader>
            {isEditing ? "Editar Vino" : "Agregar Nuevo Vino"}
          </ModalHeader>
          <ModalBody>
            <WineForm
              wine={selectedWine}
              onSuccess={() => {
                onFormClose();
                setSelectedWine(null);
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          <ModalHeader>Confirmar Eliminación</ModalHeader>
          <ModalBody>
            <p>
              ¿Estás seguro de que quieres eliminar el vino &quot;
              {selectedWine?.name}&quot;?
            </p>
            <div className="flex gap-2 justify-end mt-4">
              <Button variant="light" onPress={onDeleteClose}>
                Cancelar
              </Button>
              <Button
                color="danger"
                isLoading={deleteWineMutation.isPending}
                onPress={handleDelete}
              >
                Eliminar
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
