import React from "react";

import { Section, SectionHeader, Button } from "./ui";

const MembresiaMensual = () => {
  return (
    <Section variant="default">
      <SectionHeader
        subtitle="Una caja. Tres vinos. Un ritual."
        title="Membresía mensual"
      />

      <div className="w-full max-w-[1300px] pt-8 md:pt-12 pb-5 flex flex-col lg:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-10 sm:px-0">
        <div className="w-full lg:w-[670px] h-64 sm:h-80 md:h-96 lg:h-[464px] relative overflow-hidden flex-shrink-0">
          <img
            alt="Membresía mensual"
            className="w-full h-full object-cover"
            src="/images/membresia.png"
          />
        </div>
        <div className="flex-1 px-4 w-full lg:w-auto inline-flex flex-col justify-start items-start gap-4 md:gap-5">
          <div className="text-neutral-900 text-base sm:text-lg md:text-xl font-normal font-['Lora'] leading-relaxed md:leading-loose tracking-wide">
            Con nuestra membresía, cada mes recibís una selección de tres vinos
            especialmente elegidos para vos. Descubrí nuevas etiquetas
            recomendadas por sommeliers y enólogos que nos acompañan en este
            viaje. Una experiencia pensada para que disfrutes a tu manera:
            relajarte, compartir, regalar o brindar.
          </div>
          <div className="flex-1 text-neutral-900 text-sm sm:text-base md:text-lg lg:text-xl font-normal font-['Lora'] leading-relaxed md:leading-loose tracking-tight">
            <span className="font-semibold">
              Beneficios destacados:
              <br />
            </span>
            <span className="text-sm sm:text-base">
              Curaduría personalizada de vinos únicos
              <br />
              Envío mensual a domicilio
              <br />
              Acceso preferencial a catas, experiencias presenciales y on line.
              <br />
              Comunidad de miembros con acceso exclusivo
            </span>
          </div>
          <div className="w-full max-w-[1300px] pt-2.5 flex flex-col justify-center items-center gap-7 px-4 sm:px-0">
            <Button size="sm" variant="primary">
              Quiero ser parte
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default MembresiaMensual;
