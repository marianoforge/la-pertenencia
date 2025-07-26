import { useRouter } from "next/router";

import DefaultLayout from "@/layouts/default";
import { useWine } from "@/hooks/useWines";
import WineDetail from "@/components/wines/WineDetail";
import Contacto from "@/components/Contacto";

export default function WineDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: wine, isLoading, error } = useWine(String(id));

  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-300 mx-auto mb-4" />
            <p className="text-neutral-700 font-['Lora'] tracking-wide">
              Cargando vino...
            </p>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  if (error || !wine) {
    return (
      <DefaultLayout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold font-['Lora'] tracking-wide text-neutral-900 mb-4">
              Vino no encontrado
            </h1>
            <p className="text-neutral-700 font-['Lora'] tracking-wide mb-6">
              Lo sentimos, no pudimos encontrar el vino que buscas.
            </p>
            <button
              className="px-6 py-3 bg-neutral-900 rounded-sm border border-amber-300 text-amber-300 font-medium font-['Lora'] uppercase tracking-[4px] hover:bg-neutral-800 transition-colors"
              onClick={() => router.push("/vinos")}
            >
              Volver a Vinos
            </button>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="bg-white min-h-screen">
        <WineDetail
          wine={wine}
          onAddToCart={(wine, quantity) => {
            console.log(
              "Vino agregado al carrito:",
              wine.marca,
              "Cantidad:",
              quantity,
            );
          }}
        />

        {/* Contact Form Section */}
        <Contacto />
      </div>
    </DefaultLayout>
  );
}
