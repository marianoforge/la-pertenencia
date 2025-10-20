import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-loading-skeleton/dist/skeleton.css";

import { Head } from "./head";

import { Navbar } from "@/components/navbar";
import Cart from "@/components/Cart";
import CartNotification from "@/components/CartNotification";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      duration: 800, // Duración de la animación
      easing: "ease-out-cubic", // Easing suave
      once: true, // Solo anima una vez
      offset: 100, // Offset desde el viewport
      delay: 0, // Sin delay por defecto
    });
  }, []);

  return (
    <div className="fluid-width mx-auto relative flex flex-col min-h-screen">
      <Head />
      <Navbar />
      <main className="flex-grow font-lora">{children}</main>
      <footer className="w-full flex items-center justify-center py-3">
        <div className="w-full self-stretch pt-12 bg-white inline-flex flex-col justify-center items-center gap-10 overflow-hidden">
          {/* Desktop LG+ Layout */}
          <div
            className="fluid-menu-hide w-full"
            style={{
              maxWidth: "min(100%, 1920px)",
              paddingLeft: "clamp(2rem, 7vw, 7rem)",
              paddingRight: "clamp(2rem, 7vw, 7rem)",
            }}
          >
            <div className="w-full inline-flex justify-between items-start">
              {/* Logo */}
              <div className="flex items-start">
                <img
                  alt="La Pertenencia"
                  className="w-24 object-contain"
                  src="/images/logo-pertenencia.png"
                />
              </div>

              {/* Productos */}
              <div className="inline-flex flex-col justify-start items-start gap-2.5">
                <div className="justify-start text-yellow-700 text-xl font-normal font-['Lora'] uppercase leading-normal tracking-[5px]">
                  Productos
                </div>
                <div className="justify-start text-black text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                  <Link
                    className="hover:text-yellow-700 transition-colors"
                    href="/vinos"
                  >
                    Catalogo de Vinos
                  </Link>
                  <br />
                  {/* <Link
                    className="hover:text-yellow-700 transition-colors"
                    href="/#regalos"
                  >
                    Regalos Empresariales
                  </Link>
                  <br /> */}
                  <Link
                    className="hover:text-yellow-700 transition-colors"
                    href="/membresias"
                  >
                    Membresías
                  </Link>
                  <br />
                  <Link
                    className="hover:text-yellow-700 transition-colors"
                    href="/crea-tu-vino"
                  >
                    Crea tu vino
                  </Link>
                  <br />
                  <Link
                    className="hover:text-yellow-700 transition-colors"
                    href="/catas"
                  >
                    Catas y Maridajes
                  </Link>
                </div>
              </div>

              {/* Ayuda */}
              <div className="inline-flex flex-col justify-start items-start gap-2.5">
                <div className="justify-start text-yellow-700 text-xl font-normal font-['Lora'] uppercase leading-normal tracking-[5px]">
                  Ayuda
                </div>
                <div className="justify-start text-black text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                  <Link
                    className="hover:text-yellow-700 transition-colors"
                    href="/preguntas-frecuentes"
                  >
                    Preguntas Frecuentes
                  </Link>
                  <br />
                  <Link
                    className="hover:text-yellow-700 transition-colors"
                    href="/terminos-y-condiciones"
                  >
                    Términos y Condiciones
                  </Link>
                  <br />
                  <Link
                    className="hover:text-yellow-700 transition-colors"
                    href="/politica-de-privacidad"
                  >
                    Política de Privacidad
                  </Link>
                </div>
              </div>

              {/* Contactos */}
              <div className="inline-flex flex-col justify-start items-start gap-2.5">
                <div className="justify-start text-yellow-700 text-xl font-normal font-['Lora'] uppercase leading-normal tracking-[5px]">
                  contactos
                </div>
                <div className="inline-flex justify-start items-center gap-2.5">
                  <div className="w-5 h-5 relative">
                    <svg
                      fill="none"
                      height="20"
                      viewBox="0 0 20 20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.33334 5.83333L10 10.8333L16.6667 5.83333M3.33334 5H16.6667C17.5872 5 18.3333 5.74619 18.3333 6.66667V13.3333C18.3333 14.2538 17.5872 15 16.6667 15H3.33334C2.41286 15 1.66667 14.2538 1.66667 13.3333V6.66667C1.66667 5.74619 2.41286 5 3.33334 5Z"
                        stroke="#B45309"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.38"
                      />
                    </svg>
                  </div>
                  <div className="text-black text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                    info@lapertenencia.com
                  </div>
                </div>
                <div className="inline-flex justify-start items-center gap-2.5">
                  <div className="w-4.5 h-4.5 relative">
                    <img
                      alt="WhatsApp"
                      className="w-full h-full object-contain"
                      src="/images/icon-wapp.svg"
                    />
                  </div>
                  <div className="text-black text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                    +(54) 9 11 6152-5562
                  </div>
                </div>
                <div className="inline-flex justify-start items-center gap-2.5">
                  <div className="w-5 h-5 relative">
                    <img
                      alt="Ubicación"
                      className="w-full h-full object-contain"
                      src="/icons/ICON_lugar.svg"
                    />
                  </div>
                  <div className="text-black text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                    Buenos Aires - Palermo - CABA
                  </div>
                </div>
              </div>

              {/* Seguinos en */}
              <div className="inline-flex flex-col justify-start items-start gap-5">
                <div className="justify-start text-yellow-700 text-xl font-normal font-['Lora'] uppercase leading-normal tracking-[5px]">
                  Seguinos en:
                </div>
                <div className="inline-flex justify-between items-center gap-4">
                  <a
                    className="w-6 h-6 relative overflow-hidden hover:opacity-75 transition-opacity"
                    href="https://facebook.com/lapertenenciaok"
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
                    className="w-6 h-6 relative overflow-hidden hover:opacity-75 transition-opacity"
                    href="@somoslapertenencia"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      alt="Instagram"
                      className="w-full h-full object-contain"
                      src="/icons/ICON IG.svg"
                    />
                  </a>
                  {/* <a
                    className="w-6 h-6 relative overflow-hidden hover:opacity-75 transition-opacity"
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
                    className="w-7 h-6 relative overflow-hidden hover:opacity-75 transition-opacity"
                    href="https://youtube.com/@lapertenencia"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      alt="YouTube"
                      className="w-full h-full object-contain"
                      src="/icons/ICON YT.svg"
                    />
                  </a> */}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Layout - 1000px down to mobile */}
          <div
            className="fluid-menu-show hide-at-fluid-breakpoint w-full flex-col max-[380px]:px-3 max-[480px]:px-4"
            style={{
              maxWidth: "min(100%, 1920px)",
              paddingLeft: "clamp(1rem, 4vw, 4rem)",
              paddingRight: "clamp(1rem, 4vw, 4rem)",
              gap: "clamp(1.5rem, 4vw, 2rem)",
            }}
          >
            {/* Primera fila: Logo | Productos | Experiencias */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
              {/* Logo */}
              <div className="flex justify-start sm:justify-start items-start">
                <img
                  alt="La Pertenencia"
                  className="w-24 sm:w-20 md:w-24 object-contain"
                  src="/images/logo-pertenencia.png"
                />
              </div>

              {/* Productos */}
              <div className="flex flex-col gap-2.5">
                <div className="text-yellow-700 text-base sm:text-sm md:text-lg font-normal font-['Lora'] uppercase leading-normal tracking-[3px] sm:tracking-[2px] md:tracking-[3px]">
                  Productos
                </div>
                <div className="text-black text-xs sm:text-xs md:text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                  <Link
                    className="hover:text-yellow-700 transition-colors"
                    href="/vinos"
                  >
                    Catalogo de Vinos
                  </Link>
                  <br />
                  <Link
                    className="hover:text-yellow-700 transition-colors"
                    href="/#regalos"
                  >
                    Regalos Empresariales
                  </Link>
                  <br />
                  <Link
                    className="hover:text-yellow-700 transition-colors"
                    href="/membresias"
                  >
                    Membresías
                  </Link>
                  <br />
                  <Link
                    className="hover:text-yellow-700 transition-colors"
                    href="/crea-tu-vino"
                  >
                    Crea tu vino
                  </Link>
                  <br />
                  <Link
                    className="hover:text-yellow-700 transition-colors"
                    href="/catas"
                  >
                    Catas y Maridajes
                  </Link>
                </div>
              </div>

              {/* Ayuda */}
              <div className="flex flex-col gap-2.5">
                <div className="text-yellow-700 text-base sm:text-sm md:text-lg font-normal font-['Lora'] uppercase leading-normal tracking-[3px] sm:tracking-[2px] md:tracking-[3px]">
                  Ayuda
                </div>
                <div className="text-black text-xs sm:text-xs md:text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                  <Link
                    className="hover:text-yellow-700 transition-colors"
                    href="/preguntas-frecuentes"
                  >
                    Preguntas Frecuentes
                  </Link>
                  <br />
                  <Link
                    className="hover:text-yellow-700 transition-colors"
                    href="/terminos-y-condiciones"
                  >
                    Términos y Condiciones
                  </Link>
                  <br />
                  <Link
                    className="hover:text-yellow-700 transition-colors"
                    href="/politica-de-privacidad"
                  >
                    Política de Privacidad
                  </Link>
                </div>
              </div>
            </div>

            {/* Segunda fila: Vacío | Contactos | Vacío */}
            <div className="hidden sm:grid grid-cols-3 gap-4">
              {/* Columna vacía */}
              <div />

              {/* Contactos */}
              <div className="flex flex-col gap-2.5">
                <div className="text-yellow-700 text-sm md:text-lg font-normal font-['Lora'] uppercase leading-normal tracking-[2px] md:tracking-[3px]">
                  contactos
                </div>
                <div className="flex justify-start items-center gap-2.5">
                  <div className="w-5 h-5 relative">
                    <svg
                      fill="none"
                      height="20"
                      viewBox="0 0 20 20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.33334 5.83333L10 10.8333L16.6667 5.83333M3.33334 5H16.6667C17.5872 5 18.3333 5.74619 18.3333 6.66667V13.3333C18.3333 14.2538 17.5872 15 16.6667 15H3.33334C2.41286 15 1.66667 14.2538 1.66667 13.3333V6.66667C1.66667 5.74619 2.41286 5 3.33334 5Z"
                        stroke="#B45309"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.38"
                      />
                    </svg>
                  </div>
                  <div className="text-black text-xs md:text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                    info@lapertenencia.com
                  </div>
                </div>
                <div className="flex justify-start items-center gap-2.5">
                  <div className="w-4.5 h-4.5 relative">
                    <img
                      alt="WhatsApp"
                      className="w-full h-full object-contain"
                      src="/images/icon-wapp.svg"
                    />
                  </div>
                  <div className="text-black text-xs md:text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                    +(54) 9 11 6152-5562
                  </div>
                </div>
                <div className="flex justify-start items-center gap-2.5">
                  <div className="w-5 h-5 relative">
                    <img
                      alt="Ubicación"
                      className="w-full h-full object-contain"
                      src="/icons/ICON_lugar.svg"
                    />
                  </div>
                  <div className="text-black text-xs md:text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                    Buenos Aires - Palermo - CABA
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
                  <svg
                    fill="none"
                    height="20"
                    viewBox="0 0 20 20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.33334 5.83333L10 10.8333L16.6667 5.83333M3.33334 5H16.6667C17.5872 5 18.3333 5.74619 18.3333 6.66667V13.3333C18.3333 14.2538 17.5872 15 16.6667 15H3.33334C2.41286 15 1.66667 14.2538 1.66667 13.3333V6.66667C1.66667 5.74619 2.41286 5 3.33334 5Z"
                      stroke="#B45309"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.38"
                    />
                  </svg>
                </div>
                <div className="text-black text-xs font-normal font-['Lora'] leading-loose tracking-wide">
                  info@lapertenencia.com
                </div>
              </div>
              <div className="flex justify-start items-center gap-2.5">
                <div className="w-4.5 h-4.5 relative">
                  <img
                    alt="WhatsApp"
                    className="w-full h-full object-contain"
                    src="/images/icon-wapp.svg"
                  />
                </div>
                <div className="text-black text-xs font-normal font-['Lora'] leading-loose tracking-wide">
                  +(54) 9 11 6152-5562
                </div>
              </div>
              <div className="flex justify-start items-center gap-2.5">
                <div className="w-5 h-5 relative">
                  <img
                    alt="Ubicación"
                    className="w-full h-full object-contain"
                    src="/icons/ICON_lugar.svg"
                  />
                </div>
                <div className="text-black text-xs font-normal font-['Lora'] leading-loose tracking-wide">
                  Buenos Aires - Palermo - CABA
                </div>
              </div>
            </div>

            {/* Seguinos en: centrado */}
            <div className="flex flex-col items-center gap-3 sm:gap-2 md:gap-4">
              <div className="text-yellow-700 text-base sm:text-sm md:text-lg font-normal font-['Lora'] uppercase leading-normal tracking-[3px] sm:tracking-[2px] md:tracking-[3px]">
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
                {/* <a
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
                </a> */}
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
      <CartNotification />
      <WhatsAppFloatingButton />
    </div>
  );
}
