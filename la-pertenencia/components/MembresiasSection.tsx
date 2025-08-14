import React from "react";

import { Section, SectionHeader } from "./ui";

export default function MembresiasSection() {
  return (
    <>
      {/* Hero Section with Background Image */}
      <Section className="!p-0" variant="default">
        <div
          className="w-full max-w-[1300px] h-96 relative bg-neutral-900 rounded-lg overflow-hidden"
          data-aos="fade-up"
        >
          <img
            alt="Membresías - Background"
            className="w-full h-full object-cover object-[87%_center] absolute inset-0"
            src="/images/membresia_headerbg.png"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
        </div>
        <div className="w-full max-w-[1300px] pt-10">
          <div data-aos="fade-up">
            <SectionHeader
              subtitle="Una caja. Tres vinos. Cada mes."
              title="Membresías"
            />
          </div>
        </div>
      </Section>

      {/* Content Section */}
      <Section className="lg:!px-0 lg:!py-16" variant="default">
        <div className="w-full max-w-[1300px] flex flex-col justify-start items-start gap-5 italic">
          <div className="w-full text-neutral-900 text-lg md:text-xl font-semibold font-['Lora'] leading-relaxed md:leading-loose tracking-wide">
            Una caja. Tres vinos. Cada mes.
          </div>
        </div>

        <div className="w-full max-w-[1300px] flex flex-col justify-start items-start gap-2.5 italic">
          <div className="w-full text-neutral-900 text-lg md:text-xl font-semibold font-['Lora'] leading-relaxed md:leading-loose tracking-tight">
            Vinos elegidos para vos, por quienes viven el vino como una
            experiencia de vida.
          </div>
          <div className="w-full text-neutral-900 text-lg md:text-xl font-normal font-['Lora'] leading-relaxed md:leading-loose tracking-tight">
            La membresía de La Pertenencia es más que una suscripción: es una
            forma de formar parte de una comunidad que celebra el vino como
            excusa para encontrarse, aprender y disfrutar.
            <br />
            Cada mes seleccionamos 3 etiquetas especialmente pensadas para vos.
            Vinos con historia, con alma, con algo para contarte. Algunos serán
            conocidos, otros tal vez los descubras por primera vez. Todos van a
            tener algo en común: te van a emocionar.
          </div>
        </div>

        <div className="w-full max-w-[1300px] py-5 flex flex-col lg:flex-row justify-center items-start gap-10 italic">
          {/* Left Content */}
          <div
            className="flex-1 w-full flex flex-col justify-start items-start gap-2.5"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <div className="w-full text-yellow-700 text-lg md:text-xl font-medium font-['Lora'] uppercase tracking-[3px] md:tracking-[5px]">
              Qué incluye:
            </div>
            <ul className="w-full text-neutral-900 text-base md:text-lg lg:text-xl font-normal font-['Lora'] leading-relaxed md:leading-loose tracking-tight list-disc pl-6 space-y-2">
              <li>
                3 botellas de vino seleccionadas por sommeliers y enólogos
              </li>
              <li>
                Notas de cata, maridajes sugeridos y detalles de cada bodega
              </li>
              <li>Descuentos exclusivos en catas y experiencias</li>
              <li>Acceso anticipado a lanzamientos y eventos de comunidad</li>
            </ul>

            <div className="w-full text-yellow-700 text-lg md:text-xl font-medium font-['Lora'] uppercase tracking-[3px] md:tracking-[5px] mt-4">
              Planes flexibles:
            </div>
            <ul className="w-full text-neutral-900 text-base md:text-lg lg:text-xl font-normal font-['Lora'] leading-relaxed md:leading-loose tracking-tight list-disc pl-6 space-y-2">
              <li>Suscripción mensual sin permanencia</li>
              <li>Envíos a todo el país</li>
              <li>Atención personalizada</li>
            </ul>

            <a
              className="px-8 md:px-12 py-4 bg-amber-300 rounded-sm outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-900 flex justify-center items-center gap-2.5 mt-6 hover:bg-amber-400 transition-colors"
              href="https://wa.me/5491161525562?text=Hola!%20Me%20interesa%20sumarme%20a%20la%20membresía%20de%20La%20Pertenencia.%20¿Podrían%20darme%20más%20información%20sobre%20los%20planes?"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="text-neutral-900 text-sm md:text-base font-medium font-['Lora'] uppercase tracking-[6px] md:tracking-[8px]">
                Quiero sumarme
              </div>
            </a>
          </div>

          {/* Right Image */}
          <div
            className="w-full lg:w-[674px] flex flex-col justify-center items-start gap-2.5 italic"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div className="w-full relative rounded-lg overflow-hidden flex justify-center items-center">
              <img
                alt="Membresía - Cajas de vino"
                className="w-[90%] h-[95%] object-cover rounded-lg"
                src="/images/membresia_cajas.png"
              />
            </div>
            <div className="w-full text-left pl-8">
              <span className="text-neutral-900 text-sm md:text-base font-semibold font-['Lora'] leading-tight tracking-tight">
                Una caja. Tres vinos. Cada mes.
              </span>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
