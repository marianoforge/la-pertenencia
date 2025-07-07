import { Head } from "./head";

import { Navbar } from "@/components/navbar";
import Cart from "@/components/Cart";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container 2xl:max-w-[1920px] xl:max-w-[1536px] lg:max-w-[1280px] md:max-w-[900px] sm:max-w-[600px] xs:max-w-[380px] mx-auto relative flex flex-col min-h-screen">
      <Head />
      <Navbar />
      <main className="flex-grow font-lora">{children}</main>
      <footer className="w-full flex items-center justify-center py-3">
        <div className="w-full self-stretch pt-12 bg-white inline-flex flex-col justify-center items-center gap-10 overflow-hidden">
          <div className="w-full max-w-[1536px] px-4 xs:px-6 sm:px-8 md:px-16 lg:px-20 xl:px-28 flex flex-col gap-6">
            {/* Primera fila: Logo | Productos | Experiencias */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
              {/* Logo */}
              <div className="flex justify-center sm:justify-start items-start">
                <img
                  alt="La Pertenencia"
                  className="w-24 sm:w-20 md:w-24 object-contain"
                  src="/images/logo-pertenencia.png"
                />
              </div>

              {/* Productos */}
              <div className="flex flex-col gap-2.5">
                <div className="text-yellow-700 text-base sm:text-sm md:text-lg lg:text-xl font-normal font-['Lora'] uppercase leading-normal tracking-[3px] sm:tracking-[2px] md:tracking-[3px] lg:tracking-[5px]">
                  Productos
                </div>
                <div className="text-black text-xs sm:text-xs md:text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                  Catalogo de Vinos
                  <br />
                  Regalos Empresariales
                  <br />
                  Membresías
                </div>
              </div>

              {/* Experiencias */}
              <div className="flex flex-col gap-2.5">
                <div className="text-yellow-700 text-base sm:text-sm md:text-lg lg:text-xl font-normal font-['Lora'] uppercase leading-normal tracking-[3px] sm:tracking-[2px] md:tracking-[3px] lg:tracking-[5px]">
                  experiencias
                </div>
                <div className="text-black text-xs sm:text-xs md:text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                  Crea tu vino
                  <br />
                  Catas y Maridajes
                </div>
              </div>
            </div>

            {/* Segunda fila: Vacío | Contactos | Vacío */}
            <div className="hidden sm:grid grid-cols-3 gap-4">
              {/* Columna vacía */}
              <div />

              {/* Contactos */}
              <div className="flex flex-col gap-2.5">
                <div className="text-yellow-700 text-sm md:text-lg lg:text-xl font-normal font-['Lora'] uppercase leading-normal tracking-[2px] md:tracking-[3px] lg:tracking-[5px]">
                  contactos
                </div>
                <div className="flex justify-start items-center gap-2.5">
                  <div className="w-5 h-5 relative">
                    <div className="w-4 h-3 left-[2.50px] top-[3.60px] absolute outline outline-[1.38px] outline-offset-[-0.69px] outline-yellow-700" />
                    <div className="w-4 h-1.5 left-[2.50px] top-[5.13px] absolute outline outline-[1.38px] outline-offset-[-0.69px] outline-yellow-700" />
                  </div>
                  <div className="text-black text-xs md:text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                    contacto@lapertenecia.com
                  </div>
                </div>
                <div className="flex justify-start items-center gap-2.5">
                  <div className="w-5 h-5 relative">
                    <div className="w-3.5 h-3.5 left-[2.43px] top-[2.50px] absolute outline outline-[1.38px] outline-offset-[-0.69px] outline-yellow-700" />
                  </div>
                  <div className="text-black text-xs md:text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                    +(54) 11-321-4567
                  </div>
                </div>
                <div className="flex justify-start items-center gap-2.5">
                  <div className="w-5 h-5 relative">
                    <div className="w-3 h-4 left-[4.09px] top-[2.50px] absolute outline outline-[1.38px] outline-offset-[-0.69px] outline-yellow-700" />
                    <div className="w-1 h-1 left-[7.86px] top-[6.27px] absolute outline outline-[1.38px] outline-offset-[-0.69px] outline-yellow-700" />
                  </div>
                  <div className="text-black text-xs md:text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                    Av. Sarasa 2542, Palermo - CABA
                  </div>
                </div>
              </div>

              {/* Columna vacía */}
              <div />
            </div>

            {/* Mobile: Contactos debajo */}
            <div className="sm:hidden flex flex-col gap-2.5">
              <div className="text-yellow-700 text-base font-normal font-['Lora'] uppercase leading-normal tracking-[3px]">
                contactos
              </div>
              <div className="flex justify-start items-center gap-2.5">
                <div className="w-5 h-5 relative">
                  <div className="w-4 h-3 left-[2.50px] top-[3.60px] absolute outline outline-[1.38px] outline-offset-[-0.69px] outline-yellow-700" />
                  <div className="w-4 h-1.5 left-[2.50px] top-[5.13px] absolute outline outline-[1.38px] outline-offset-[-0.69px] outline-yellow-700" />
                </div>
                <div className="text-black text-xs font-normal font-['Lora'] leading-loose tracking-wide">
                  contacto@lapertenecia.com
                </div>
              </div>
              <div className="flex justify-start items-center gap-2.5">
                <div className="w-5 h-5 relative">
                  <div className="w-3.5 h-3.5 left-[2.43px] top-[2.50px] absolute outline outline-[1.38px] outline-offset-[-0.69px] outline-yellow-700" />
                </div>
                <div className="text-black text-xs font-normal font-['Lora'] leading-loose tracking-wide">
                  +(54) 11-321-4567
                </div>
              </div>
              <div className="flex justify-start items-center gap-2.5">
                <div className="w-5 h-5 relative">
                  <div className="w-3 h-4 left-[4.09px] top-[2.50px] absolute outline outline-[1.38px] outline-offset-[-0.69px] outline-yellow-700" />
                  <div className="w-1 h-1 left-[7.86px] top-[6.27px] absolute outline outline-[1.38px] outline-offset-[-0.69px] outline-yellow-700" />
                </div>
                <div className="text-black text-xs font-normal font-['Lora'] leading-loose tracking-wide">
                  Av. Sarasa 2542, Palermo - CABA
                </div>
              </div>
            </div>

            {/* Seguinos en: centrado */}
            <div className="flex flex-col items-center gap-3 sm:gap-2 md:gap-4">
              <div className="text-yellow-700 text-base sm:text-sm md:text-lg lg:text-xl font-normal font-['Lora'] uppercase leading-normal tracking-[3px] sm:tracking-[2px] md:tracking-[3px] lg:tracking-[5px]">
                Seguinos en:
              </div>
              <div className="flex justify-center items-center gap-4 sm:gap-3 md:gap-4">
                <a
                  className="w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6 relative overflow-hidden hover:opacity-75 transition-opacity"
                  href="https://facebook.com/lapertenencia"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="Facebook"
                    className="w-full h-full object-contain"
                    src="/icons/ICO FB.svg"
                  />
                </a>
                <a
                  className="w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6 relative overflow-hidden hover:opacity-75 transition-opacity"
                  href="https://instagram.com/lapertenencia"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="Instagram"
                    className="w-full h-full object-contain"
                    src="/icons/ICON IG.svg"
                  />
                </a>
                <a
                  className="w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6 relative overflow-hidden hover:opacity-75 transition-opacity"
                  href="https://x.com/lapertenencia"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="X (Twitter)"
                    className="w-full h-full object-contain"
                    src="/icons/ICON X.svg"
                  />
                </a>
                <a
                  className="w-7 h-6 sm:w-6 sm:h-5 md:w-7 md:h-6 relative overflow-hidden hover:opacity-75 transition-opacity"
                  href="https://youtube.com/@lapertenencia"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="YouTube"
                    className="w-full h-full object-contain"
                    src="/icons/ICON YT.svg"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="self-stretch py-5 bg-black flex flex-col justify-start items-center gap-2.5">
            <div className="self-stretch text-center justify-start text-white text-xs font-normal font-['Lora'] tracking-wide">
              © 2025 La Pertenencia. Todos los derechos reservados
            </div>
          </div>
        </div>
      </footer>
      <Cart />
    </div>
  );
}
