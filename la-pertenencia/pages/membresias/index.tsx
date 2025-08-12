import Link from "next/link";

import DefaultLayout from "@/layouts/default";
import MembresiasSection from "@/components/MembresiasSection";
import Contacto from "@/components/Contacto";

export default function MembresiasPage() {
  return (
    <DefaultLayout>
      <div className="w-full mx-auto px-4 md:px-2 lg:px-2 bg-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-2.5 py-[5px] rounded-sm overflow-hidden">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="text-black text-sm md:text-base font-normal font-['Lora'] tracking-wide"
          >
            <ol className="flex items-center space-x-2">
              <li>
                <Link
                  className="hover:text-amber-600 transition-colors"
                  href="/"
                >
                  Inicio
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li aria-current="page" className="text-gray-600">
                Membresías
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <MembresiasSection />

      {/* Contact Section */}
      <Contacto />
    </DefaultLayout>
  );
}
