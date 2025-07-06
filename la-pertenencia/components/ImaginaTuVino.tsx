import React from "react";

import { Section, SectionHeader, Button } from "./ui";

const ImaginaTuVino = () => {
  return (
    <Section variant="gray">
      <SectionHeader
        subtitle="Tu Propio Vino, Tu Propia Historia."
        title="imagina un vino"
      />

      <div className="w-[1300px] pt-12 pb-5 inline-flex justify-center items-start gap-10">
        <div className="w-[580px] h-96 relative rounded-lg overflow-hidden">
          <img
            alt="Imagen de vino"
            className="w-[600px] h-96 left-[192px] top-[-1.90px] absolute rounded-lg shadow-[inset_0px_4px_36.099998474121094px_0px_rgba(0,0,0,0.25)]"
            src="https://placehold.co/600x430"
          />
          <img
            alt="Imagen de vino"
            className="w-[1200px] h-[800px] left-[102px] top-[-76.43px] absolute"
            src="https://placehold.co/1200x800"
          />
          <img
            alt="Imagen de vino"
            className="w-[1343px] h-[966px] left-[-305px] top-[-237.43px] absolute"
            src="https://placehold.co/1343x966"
          />
          <img
            alt="Imagen de vino"
            className="w-[891px] h-[594px] left-0 top-[-140.43px] absolute"
            src="/images/imagina.png"
          />
        </div>
        <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-5">
          <div className="self-stretch justify-start text-neutral-900 text-xl font-semibold font-['Lora'] leading-loose tracking-tight">
            ¿Alguna vez soñaste con tener tu propio vino, con tu sello personal?
          </div>
          <div className="self-stretch flex-1 flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch justify-start">
              <span className="text-neutral-900 text-xl font-semibold font-['Lora'] leading-loose tracking-tight">
                &quot;Crea tu vino, viví tu experiencia&quot;
              </span>
              <span className="text-neutral-900 text-xl font-normal font-['Lora'] leading-loose tracking-tight">
                es mucho más que una propuesta, es la invitación a sumergirse en
                el fascinante mundo de la enología y ser el protagonista de tu
                propia creación.
              </span>
            </div>
            <div className="self-stretch justify-start">
              <span className="text-neutral-900 text-xl font-semibold font-['Lora'] leading-loose tracking-tight">
                En La Pertenencia{" "}
              </span>
              <span className="text-neutral-900 text-xl font-normal font-['Lora'] leading-loose tracking-tight">
                te abrimos las puertas a un viaje sensorial inolvidable para
                conocer los viñedos donde nacerá tu vino, a sentir el aroma de
                la tierra y las hojas, y a conocer el cuidado artesanal con el
                que se cultivan las uvas.
              </span>
            </div>
            <div className="self-stretch justify-start">
              <span className="text-neutral-900 text-xl font-semibold font-['Lora'] leading-loose tracking-tight">
                De la mano de Lucas Moschetti,{" "}
              </span>
              <span className="text-neutral-900 text-xl font-normal font-['Lora'] leading-loose tracking-tight">
                nuestro enólogo experto y apasionado, cada paso de este viaje
                será una aventura enriquecedora.
              </span>
            </div>
          </div>
          <Button variant="primary">Quiero saber más</Button>
        </div>
      </div>
    </Section>
  );
};

export default ImaginaTuVino;
