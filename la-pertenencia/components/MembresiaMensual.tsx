import React from "react";

import { Section, SectionHeader, Button } from "./ui";

const MembresiaMensual = () => {
  return (
    <Section variant="default">
      <SectionHeader
        subtitle="Una caja. Tres vinos. Un ritual."
        title="Membresía mensual"
      />

      <div className="w-[1300px] pt-12 pb-5 inline-flex justify-center items-center gap-10">
        <div className="flex-1 w-[670px] h-[464px] relative overflow-hidden mt-2">
          <img
            alt="Membresía mensual"
            className="w-full h-full object-cover"
            src="/images/membresia.png"
          />
        </div>
        <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-5">
          <div className="self-stretch justify-start text-neutral-900 text-xl font-normal font-['Lora'] leading-loose tracking-wide">
            Con nuestra membresía, cada mes recibís una selección de tres vinos
            especialmente elegidos para vos. Descubrí nuevas etiquetas
            recomendadas por sommeliers y enólogos que nos acompañan en este
            viaje. Una experiencia pensada para que disfrutes a tu manera:
            relajarte, compartir, regalar o brindar.
          </div>
          <div className="self-stretch flex-1 justify-start">
            <span className="text-neutral-900 text-xl font-semibold font-['Lora'] leading-loose tracking-tight">
              Beneficios destacados:
              <br />
            </span>
            <span className="text-neutral-900 text-base font-normal font-['Lora'] leading-loose tracking-tight">
              Curaduría personalizada de vinos únicos
              <br />
              Envío mensual a domicilio
              <br />
              Acceso preferencial a catas, experiencias presenciales y on line.
              <br />
              Comunidad de miembros con acceso exclusivo
            </span>
          </div>
          <Button variant="primary">Quiero ser parte</Button>
        </div>
      </div>
    </Section>
  );
};

export default MembresiaMensual;
