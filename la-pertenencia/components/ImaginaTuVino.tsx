import React from "react";

import { Section, SectionHeader, Button } from "./ui";

const ImaginaTuVino = () => {
  return (
    <Section variant="gray">
      <SectionHeader
        subtitle="Tu Propio Vino, Tu Propia Historia."
        title="imagina un vino"
      />

      <div className="w-full max-w-[1300px] pt-8 md:pt-12 pb-5 flex flex-col lg:flex-row justify-center items-start gap-6 md:gap-8 lg:gap-10 px-4 sm:px-0">
        <div className="w-full lg:w-[580px] h-64 sm:h-80 md:h-96 relative rounded-lg overflow-hidden flex-shrink-0">
          <img
            alt="Imagen de vino"
            className="w-full h-full object-cover rounded-lg shadow-[inset_0px_4px_36.099998474121094px_0px_rgba(0,0,0,0.25)]"
            src="/images/imagina.png"
          />
        </div>
        <div className="flex-1 w-full lg:w-auto inline-flex flex-col justify-start items-start lg:items-center gap-4 md:gap-5">
          <div className="text-neutral-900 text-base sm:text-lg md:text-xl font-semibold font-['Lora'] leading-relaxed md:leading-loose tracking-tight">
            ¿Alguna vez soñaste con tener tu propio vino, con tu sello personal?
          </div>
          <div className="flex-1 flex flex-col justify-start items-start gap-2 md:gap-2.5">
            <div className="text-neutral-900 text-sm sm:text-base md:text-lg lg:text-xl font-normal font-['Lora'] leading-relaxed md:leading-loose tracking-tight">
              <span className="font-semibold">
                &quot;Crea tu vino, viví tu experiencia&quot;
              </span>
              <span>
                {" "}
                es mucho más que una propuesta, es la invitación a sumergirse en
                el fascinante mundo de la enología y ser el protagonista de tu
                propia creación.
              </span>
            </div>
            <div className="text-neutral-900 text-sm sm:text-base md:text-lg lg:text-xl font-normal font-['Lora'] leading-relaxed md:leading-loose tracking-tight">
              <span className="font-semibold">En La Pertenencia </span>
              <span>
                te abrimos las puertas a un viaje sensorial inolvidable para
                conocer los viñedos donde nacerá tu vino, a sentir el aroma de
                la tierra y las hojas, y a conocer el cuidado artesanal con el
                que se cultivan las uvas.
              </span>
            </div>
            <div className="text-neutral-900 text-sm sm:text-base md:text-lg lg:text-xl font-normal font-['Lora'] leading-relaxed md:leading-loose tracking-tight">
              <span className="font-semibold">
                De la mano de Lucas Moschetti,{" "}
              </span>
              <span>
                nuestro enólogo experto y apasionado, cada paso de este viaje
                será una aventura enriquecedora.
              </span>
            </div>
          </div>
          <div className="w-full max-w-[1300px] pt-2.5 flex flex-col justify-center items-center gap-7 px-4 sm:px-0">
            <Button size="sm" variant="primary">
              Quiero saber más
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ImaginaTuVino;
