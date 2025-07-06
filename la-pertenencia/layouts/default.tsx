import { Head } from "./head";

import { Navbar } from "@/components/navbar";
import Cart from "@/components/Cart";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container 2xl:max-w-[1920px] mx-auto relative flex flex-col h-screen">
      <Head />
      <Navbar />
      <main className="flex-grow font-lora">{children}</main>
      <footer className="w-full flex items-center justify-center py-3">
        <div className="w-full self-stretch pt-12 bg-white inline-flex flex-col justify-center items-center gap-10 overflow-hidden">
          <div className="w-[1536px] px-28 inline-flex justify-between items-start">
            <div className="w-24 h-36 relative overflow-hidden">
              <div className="w-24 h-32 left-[2.29px] top-[2.52px] absolute bg-zinc-500 outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-8 h-14 left-[13.96px] top-[55.67px] absolute bg-white" />
              <div className="w-7 h-14 left-[49.94px] top-[60.67px] absolute bg-white" />
              <div className="w-2.5 h-3 left-[21.98px] top-[65.29px] absolute bg-neutral-900" />
              <div className="w-2.5 h-3 left-[61.04px] top-[64.46px] absolute bg-neutral-900" />
              <div className="w-20 h-20 left-[10.40px] top-[21.48px] absolute bg-neutral-900" />
              <div className="w-3.5 h-5 left-[39.50px] top-[40.42px] absolute bg-white" />
              <div className="w-px h-px left-[44.27px] top-[43.35px] absolute bg-neutral-900" />
              <div className="w-1 h-2 left-[8.76px] top-[122.90px] absolute bg-white" />
              <div className="w-1 h-2 left-[30.59px] top-[122.90px] absolute bg-white" />
              <div className="w-1 h-2 left-[48.26px] top-[122.90px] absolute bg-white" />
              <div className="w-1 h-2 left-[60.57px] top-[122.90px] absolute bg-white" />
              <div className="w-1 h-2 left-[42.33px] top-[122.90px] absolute bg-white" />
              <div className="w-px h-2 left-[80.06px] top-[122.90px] absolute bg-white" />
              <div className="w-1.5 h-2 left-[13.69px] top-[122.88px] absolute bg-white" />
              <div className="w-1.5 h-2 left-[82.96px] top-[122.88px] absolute bg-white" />
              <div className="w-1 h-2 left-[24.59px] top-[122.90px] absolute bg-white" />
              <div className="w-1.5 h-2 left-[36.51px] top-[122.90px] absolute bg-white" />
              <div className="w-[4.87px] h-2 left-[53.99px] top-[122.90px] absolute bg-white" />
              <div className="w-[4.87px] h-2 left-[66.40px] top-[122.90px] absolute bg-white" />
              <div className="w-1.5 h-2 left-[72.56px] top-[122.86px] absolute bg-white" />
              <div className="w-1.5 h-2 left-[13.69px] top-[122.88px] absolute bg-white" />
            </div>
            <div className="inline-flex flex-col justify-start items-start gap-2.5">
              <div className="justify-start text-yellow-700 text-xl font-normal font-['Lora'] uppercase leading-normal tracking-[5px]">
                Productos
              </div>
              <div className="justify-start text-black text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                Catalogo de Vinos
                <br />
                Regalos Empresariales
                <br />
                Membresías
              </div>
            </div>
            <div className="inline-flex flex-col justify-start items-start gap-2.5">
              <div className="justify-start text-yellow-700 text-xl font-normal font-['Lora'] uppercase leading-normal tracking-[5px]">
                experiencias
              </div>
              <div className="justify-start text-black text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                Crea tu vino
                <br />
                Catas y Maridajes
              </div>
            </div>
            <div className="inline-flex flex-col justify-start items-start gap-2.5">
              <div className="justify-start text-yellow-700 text-xl font-normal font-['Lora'] uppercase leading-normal tracking-[5px]">
                contactos
              </div>
              <div className="inline-flex justify-start items-center gap-2.5">
                <div className="w-5 h-5 relative">
                  <div className="w-4 h-3 left-[2.50px] top-[3.60px] absolute outline outline-[1.38px] outline-offset-[-0.69px] outline-yellow-700" />
                  <div className="w-4 h-1.5 left-[2.50px] top-[5.13px] absolute outline outline-[1.38px] outline-offset-[-0.69px] outline-yellow-700" />
                </div>
                <div className="w-52 h-6 justify-center text-black text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                  contacto@lapertenecia.com
                </div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                <div className="w-5 h-5 relative">
                  <div className="w-3.5 h-3.5 left-[2.43px] top-[2.50px] absolute outline outline-[1.38px] outline-offset-[-0.69px] outline-yellow-700" />
                </div>
                <div className="w-32 h-6 justify-center text-black text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                  +(54) 11-321-4567
                </div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                <div className="w-5 h-5 relative">
                  <div className="w-3 h-4 left-[4.09px] top-[2.50px] absolute outline outline-[1.38px] outline-offset-[-0.69px] outline-yellow-700" />
                  <div className="w-1 h-1 left-[7.86px] top-[6.27px] absolute outline outline-[1.38px] outline-offset-[-0.69px] outline-yellow-700" />
                </div>
                <div className="w-64 h-6 justify-center text-black text-sm font-normal font-['Lora'] leading-loose tracking-wide">
                  Av. Sarasa 2542, Palermo - CABA
                </div>
              </div>
            </div>
            <div className="inline-flex flex-col justify-start items-start gap-5">
              <div className="justify-start text-yellow-700 text-xl font-normal font-['Lora'] uppercase leading-normal tracking-[5px]">
                Seguinos en:
              </div>
              <div className="self-stretch inline-flex justify-between items-center">
                <a
                  className="w-6 h-6 relative overflow-hidden hover:opacity-75 transition-opacity"
                  href="https://facebook.com/lapertenencia"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="Facebook"
                    className="w-6 h-6 object-contain"
                    src="/icons/ICO FB.svg"
                  />
                </a>
                <a
                  className="w-6 h-6 relative overflow-hidden hover:opacity-75 transition-opacity"
                  href="https://instagram.com/lapertenencia"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="Instagram"
                    className="w-6 h-6 object-contain"
                    src="/icons/ICON IG.svg"
                  />
                </a>
                <a
                  className="w-6 h-6 relative overflow-hidden hover:opacity-75 transition-opacity"
                  href="https://x.com/lapertenencia"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="X (Twitter)"
                    className="w-6 h-6 object-contain"
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
                    className="w-7 h-6 object-contain"
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
