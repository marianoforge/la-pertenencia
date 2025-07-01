import { Button } from "@/components/ui/Button";

export const ButtonExample = () => {
  return (
    <div className="p-8 space-y-6 bg-background">
      <div className="space-y-4">
        <h2 className="text-h2">Ejemplos de Botones</h2>

        {/* Default button - según especificaciones */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Default Button</h3>
          <Button onClick={() => alert("¡Botón clickeado!")}>
            BT GENÉRICO
          </Button>
        </div>

        {/* Outline variant */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Outline Button</h3>
          <Button variant="outline" onClick={() => alert("¡Botón outline!")}>
            COMPRAR AHORA
          </Button>
        </div>

        {/* Ghost variant */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Ghost Button</h3>
          <Button variant="ghost" onClick={() => alert("¡Botón ghost!")}>
            VER MÁS
          </Button>
        </div>

        {/* Disabled state */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Disabled Button</h3>
          <Button disabled>AGOTADO</Button>
        </div>
      </div>
    </div>
  );
};
