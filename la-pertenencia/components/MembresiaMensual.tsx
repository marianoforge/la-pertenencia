import React from "react";

import { Section, SectionHeader, Button } from "./ui";

const MembresiaMensual = () => {
  return (
    <Section id="membresia" variant="gray">
      <SectionHeader
        subtitle="Una caja. Tres vinos. Un ritual."
        title="Membresía mensual"
      />

      <div className="w-full max-w-[1300px] pt-5 md:pt-12 pb-5 flex flex-col justify-center items-center gap-7 md:gap-10 lg:gap-10 sm:px-0">
        {/* Desktop Layout (LG+) */}
        <div className="hidden lg:flex w-full justify-center items-center gap-10">
          <div className="w-[550px] h-96 relative overflow-hidden flex-shrink-0">
            <img
              alt="Membresía mensual"
              className="w-full h-full object-cover"
              src="/images/membresia.png"
            />
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-5">
            <div className="text-neutral-900 text-xl font-normal font-['Lora'] leading-loose tracking-wide">
              Con nuestra membresía, cada mes recibís una selección de tres
              vinos especialmente elegidos para vos. Descubrí nuevas etiquetas
              recomendadas por sommeliers y enólogos que nos acompañan en este
              viaje. Una experiencia pensada para que disfrutes a tu manera:
              relajarte, compartir, regalar o brindar.
            </div>
            <div className="flex-1 text-neutral-900 font-normal font-['Lora'] tracking-tight">
              <span className="text-xl font-semibold leading-loose">
                Beneficios destacados:
                <br />
              </span>
              <span className="text-base leading-loose">
                Curaduría personalizada de vinos únicos
                <br />
                Envío mensual a domicilio
                <br />
                Acceso preferencial a catas, experiencias presenciales y on
                line.
                <br />
                Comunidad de miembros con acceso exclusivo
              </span>
            </div>
            <Button variant="primary">Quiero ser parte</Button>
          </div>
        </div>

        {/* Mobile/Tablet Layout (up to LG) */}
        <div className="lg:hidden w-full flex flex-col justify-center items-center gap-7 md:gap-10">
          <div className="w-96 sm:w-[560px] md:w-[550px] h-60 sm:h-80 md:h-96 relative overflow-hidden">
            <img
              alt="Membresía mensual"
              className="w-full h-full object-cover"
              src="/images/membresia.png"
            />
          </div>
          <div className="w-full px-0 sm:px-5 md:px-7 flex flex-col justify-start items-center gap-5">
            <div className="w-full text-neutral-900 text-sm md:text-base font-normal font-['Lora'] leading-tight md:leading-normal tracking-wide">
              Con nuestra membresía, cada mes recibís una selección de tres
              vinos especialmente elegidos para vos. Descubrí nuevas etiquetas
              recomendadas por sommeliers y enólogos que nos acompañan en este
              viaje. Una experiencia pensada para que disfrutes a tu manera:
              relajarte, compartir, regalar o brindar.
            </div>
            <div className="w-full text-neutral-900 font-normal font-['Lora'] tracking-tight">
              <span className="text-sm md:text-base font-semibold leading-normal">
                Beneficios destacados:
                <br />
              </span>
              <span className="text-sm md:text-base leading-normal">
                Curaduría personalizada de vinos únicos
                <br />
                Envío mensual a domicilio
                <br />
                Acceso preferencial a catas, experiencias presenciales y on
                line.
                <br />
                Comunidad de miembros con acceso exclusivo
              </span>
            </div>
          </div>
          <Button variant="primary">Quiero ser parte</Button>
        </div>
      </div>
    </Section>
  );
};

export default MembresiaMensual;
