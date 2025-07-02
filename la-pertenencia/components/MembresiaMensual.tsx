import React from "react";

type Props = {};

const MembresiaMensual = (props: Props) => {
  return (
    <div className="w-full self-stretch px-28 py-24 inline-flex flex-col justify-start items-center gap-2.5">
      <div className="w-[1300px] flex flex-col justify-start items-center gap-2.5">
        <div className="self-stretch text-center justify-start text-yellow-700 text-xl font-medium font-['Lora'] uppercase tracking-[10px]">
          Membresía mensual
        </div>
        <div className="self-stretch text-center justify-start text-neutral-900 text-4xl font-medium font-['Lora'] tracking-[10px]">
          Una caja. Tres vinos. Un ritual.
        </div>
      </div>
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
          <div
            className="px-12 py-4 bg-amber-300 rounded-sm outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-900 inline-flex justify-center items-center gap-2.5"
            data-property-1="Default"
          >
            <div className="justify-start text-neutral-900 text-base font-medium font-['Lora'] uppercase tracking-[8px]">
              Quiero ser parte
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembresiaMensual;
