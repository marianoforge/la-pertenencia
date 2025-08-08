import React, { useState } from "react";

import { Button, Section, SectionHeader } from "./ui";

const Regalos = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    kit1: 2,
    kit2: 2,
    kit3: 2,
  });

  const handleQuantityChange = (kitId: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [kitId]: Math.max(1, prev[kitId] + change),
    }));
  };

  const handleAddToCart = (productName: string, quantity: number) => {
    console.log(`Adding ${quantity} of ${productName} to cart`);
  };

  return (
    <Section className="!px-0" id="regalos" variant="default">
      <SectionHeader
        subtitle="Regalos empresariales"
        title="Regala momentos que se brindan"
      />

      <div className="w-full max-w-[1300px] pt-6 md:pt-10 flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 px-4 sm:px-0">
        {/* Kit "la pertenencia" - Large Card - Solo */}
        <div className="w-full mx-auto sm:justify-start h-96 relative flex justify-center items-start overflow-hidden">
          <div className="w-full h-96 relative rounded-lg">
            <img
              alt="Kit La Pertenencia"
              className="w-full h-full object-cover"
              src="/images/kitlapertenencia.png"
            />
          </div>
          <div className="w-80 p-5 absolute top-8 sm:left-6 bg-white inline-flex flex-col justify-start items-start gap-1">
            <div className="w-72 flex flex-col justify-start items-start gap-1">
              <div className="justify-start text-neutral-900 text-sm md:text-base font-semibold font-['Lora'] uppercase tracking-[3.50px] md:tracking-[4px]">
                Kit &quot;la pertenecia&quot;
              </div>
              <div className="w-72 pt-[5px] pb-2.5 inline-flex justify-start items-start gap-2.5">
                <div className="w-60 justify-start text-yellow-700 text-sm md:text-base font-normal font-['Lora'] tracking-wide">
                  La pertenencia Malbec
                  <br />
                  Set de 2 copas
                  <br />
                  Tapón hermético
                  <br />
                  Bomba de vacío
                </div>
              </div>
            </div>
            <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
            <div className="self-stretch py-[5px] inline-flex justify-center items-center gap-2.5">
              <div className="flex-1 text-center justify-start text-neutral-900 text-3xl font-medium font-['Lora'] tracking-wider">
                $ 35.990
              </div>
            </div>
            <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
            <div className="self-stretch pt-4 pb-2 inline-flex justify-center items-center gap-4">
              <div className="flex-1 h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
              <div className="flex justify-center items-center gap-2.5">
                <button
                  className="w-7 h-7 px-3 py-1.5 bg-neutral-900 rounded-[3px] outline outline-[0.50px] outline-offset-[-0.50px] outline-amber-300 flex justify-center items-center gap-16"
                  onClick={() => handleQuantityChange("kit1", -1)}
                >
                  <div className="justify-start text-amber-300 text-base font-bold font-['Lora']">
                    -
                  </div>
                </button>
                <div className="w-9 h-9 px-3 py-1.5 bg-white rounded-[3px] outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-16">
                  <div className="justify-start text-neutral-900 text-sm md:text-base font-normal font-['Lora'] tracking-wide">
                    {quantities.kit1}
                  </div>
                </div>
                <button
                  className="w-7 h-7 px-3 py-1.5 bg-neutral-900 rounded-[3px] outline outline-[0.50px] outline-offset-[-0.50px] outline-amber-300 flex justify-center items-center gap-16"
                  onClick={() => handleQuantityChange("kit1", 1)}
                >
                  <div className="justify-start text-amber-300 text-base font-bold font-['Lora']">
                    +
                  </div>
                </button>
              </div>
              <div className="flex-1 h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
            </div>
            <button
              className="self-stretch pl-9 pr-7 py-1.5 lg:pl-12 lg:pr-10 lg:py-2 bg-neutral-900 rounded-sm outline outline-[0.38px] lg:outline-[0.50px] outline-offset-[-0.38px] lg:outline-offset-[-0.50px] outline-amber-300 inline-flex justify-center items-center gap-3 lg:gap-4"
              onClick={() =>
                handleAddToCart('Kit "la pertenencia"', quantities.kit1)
              }
            >
              <div className="justify-start text-amber-300 text-base font-medium font-['Lora'] uppercase tracking-[8px]">
                agregar
              </div>
              <img
                alt="Carrito"
                className="w-5 h-5 lg:w-8 lg:h-8 object-contain"
                src="/icons/Add carrito.svg"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(71%) sepia(83%) saturate(1392%) hue-rotate(4deg) brightness(103%) contrast(103%)",
                }}
              />
            </button>
          </div>
        </div>

        {/* Los dos kits pequeños en la misma fila */}
        <div className="w-full flex flex-col sm:flex-row gap-6 md:gap-8 lg:gap-10">
          {/* Kit "1ra Copa" - Small Card */}
          <div className="w-full mx-auto bg-white inline-flex flex-col justify-start items-center">
            <img
              alt="Kit Primera Copa"
              className="w-full h-36 lg:h-32 rounded-tl-lg rounded-tr-lg border-b-[3px] border-neutral-900 object-cover"
              src="/images/kitprimeracopa.png"
            />
            <div className="self-stretch p-5 flex flex-col justify-start items-start gap-1">
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-neutral-900 text-sm md:text-base font-semibold font-['Lora'] uppercase tracking-[3.50px] md:tracking-[4px]">
                  Kit &quot;1ra Copa&quot;
                </div>
                <div className="self-stretch inline-flex justify-center items-center gap-2.5">
                  <div className="w-60 justify-start text-yellow-700 text-sm md:text-base font-normal font-['Lora'] tracking-wide">
                    1 copa premium grabada
                    <br />
                    Sacacorchos profesional
                  </div>
                </div>
              </div>
              <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
              <div className="self-stretch py-[5px] inline-flex justify-center items-center gap-2.5">
                <div className="flex-1 text-center justify-start text-neutral-900 text-3xl font-medium font-['Lora'] tracking-wider">
                  $ 30.990
                </div>
              </div>
              <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
              <div className="self-stretch pt-4 pb-2 inline-flex justify-center items-center gap-4">
                <div className="flex-1 h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
                <div className="flex justify-center items-center gap-2.5">
                  <button
                    className="w-7 h-7 px-3 py-1.5 bg-neutral-900 rounded-[3px] outline outline-[0.50px] outline-offset-[-0.50px] outline-amber-300 flex justify-center items-center gap-16"
                    onClick={() => handleQuantityChange("kit2", -1)}
                  >
                    <div className="justify-start text-amber-300 text-base font-bold font-['Lora']">
                      -
                    </div>
                  </button>
                  <div className="w-9 h-9 px-3 py-1.5 bg-white rounded-[3px] outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-16">
                    <div className="justify-start text-neutral-900 text-sm md:text-base font-normal font-['Lora'] tracking-wide">
                      {quantities.kit2}
                    </div>
                  </div>
                  <button
                    className="w-7 h-7 px-3 py-1.5 bg-neutral-900 rounded-[3px] outline outline-[0.50px] outline-offset-[-0.50px] outline-amber-300 flex justify-center items-center gap-16"
                    onClick={() => handleQuantityChange("kit2", 1)}
                  >
                    <div className="justify-start text-amber-300 text-base font-bold font-['Lora']">
                      +
                    </div>
                  </button>
                </div>
                <div className="flex-1 h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
              </div>
              <button
                className="self-stretch pl-9 pr-7 py-1.5 lg:pl-12 lg:pr-10 lg:py-2 bg-neutral-900 rounded-sm outline outline-[0.38px] lg:outline-[0.50px] outline-offset-[-0.38px] lg:outline-offset-[-0.50px] outline-amber-300 inline-flex justify-center items-center gap-3 lg:gap-4"
                onClick={() =>
                  handleAddToCart('Kit "1ra Copa"', quantities.kit2)
                }
              >
                <div className="justify-start text-amber-300 text-base font-medium font-['Lora'] uppercase tracking-[8px]">
                  agregar
                </div>
                <img
                  alt="Carrito"
                  className="w-5 h-5 lg:w-8 lg:h-8 object-contain"
                  src="/icons/Add carrito.svg"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(71%) sepia(83%) saturate(1392%) hue-rotate(4deg) brightness(103%) contrast(103%)",
                  }}
                />
              </button>
            </div>
          </div>

          {/* Kit "2da Copa" - Small Card */}
          <div className="w-full mx-auto bg-white inline-flex flex-col justify-start items-center">
            <img
              alt="Kit Segunda Copa"
              className="w-full h-36 lg:h-32 rounded-tl-lg rounded-tr-lg border-b-[3px] border-neutral-900 object-cover"
              src="/images/kitsegundacopa.png"
            />
            <div className="self-stretch p-5 flex flex-col justify-start items-start gap-1">
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-neutral-900 text-sm md:text-base font-semibold font-['Lora'] uppercase tracking-[3.50px] md:tracking-[4px]">
                  Kit &quot;2da Copa&quot;
                </div>
                <div className="self-stretch inline-flex justify-center items-center gap-2.5">
                  <div className="w-60 justify-start text-yellow-700 text-sm md:text-base font-normal font-['Lora'] tracking-wide">
                    1 copa premium grabada
                    <br />
                    Sacacorchos profesional
                  </div>
                </div>
              </div>
              <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
              <div className="self-stretch py-[5px] inline-flex justify-center items-center gap-2.5">
                <div className="flex-1 text-center justify-start text-neutral-900 text-3xl font-medium font-['Lora'] tracking-wider">
                  $ 30.990
                </div>
              </div>
              <div className="self-stretch h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
              <div className="self-stretch pt-4 pb-2 inline-flex justify-center items-center gap-4">
                <div className="flex-1 h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
                <div className="flex justify-center items-center gap-2.5">
                  <button
                    className="w-7 h-7 px-3 py-1.5 bg-neutral-900 rounded-[3px] outline outline-[0.50px] outline-offset-[-0.50px] outline-amber-300 flex justify-center items-center gap-16"
                    onClick={() => handleQuantityChange("kit3", -1)}
                  >
                    <div className="justify-start text-amber-300 text-base font-bold font-['Lora']">
                      -
                    </div>
                  </button>
                  <div className="w-9 h-9 px-3 py-1.5 bg-white rounded-[3px] outline outline-1 outline-offset-[-1px] outline-neutral-400 flex justify-center items-center gap-16">
                    <div className="justify-start text-neutral-900 text-sm md:text-base font-normal font-['Lora'] tracking-wide">
                      {quantities.kit3}
                    </div>
                  </div>
                  <button
                    className="w-7 h-7 px-3 py-1.5 bg-neutral-900 rounded-[3px] outline outline-[0.50px] outline-offset-[-0.50px] outline-amber-300 flex justify-center items-center gap-16"
                    onClick={() => handleQuantityChange("kit3", 1)}
                  >
                    <div className="justify-start text-amber-300 text-base font-bold font-['Lora']">
                      +
                    </div>
                  </button>
                </div>
                <div className="flex-1 h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-neutral-400" />
              </div>
              <button
                className="self-stretch pl-9 pr-7 py-1.5 lg:pl-12 lg:pr-10 lg:py-2 bg-neutral-900 rounded-sm outline outline-[0.38px] lg:outline-[0.50px] outline-offset-[-0.38px] lg:outline-offset-[-0.50px] outline-amber-300 inline-flex justify-center items-center gap-3 lg:gap-4"
                onClick={() =>
                  handleAddToCart('Kit "2da Copa"', quantities.kit3)
                }
              >
                <div className="justify-start text-amber-300 text-base font-medium font-['Lora'] uppercase tracking-[8px]">
                  agregar
                </div>
                <img
                  alt="Carrito"
                  className="w-5 h-5 lg:w-8 lg:h-8 object-contain"
                  src="/icons/Add carrito.svg"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(71%) sepia(83%) saturate(1392%) hue-rotate(4deg) brightness(103%) contrast(103%)",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1300px] pt-5 flex flex-col justify-center items-center gap-6 md:gap-7 px-4 sm:px-0">
        <div className="text-center text-neutral-900 text-sm sm:text-sm md:text-base lg:text-xl font-normal font-['Lora'] leading-tight md:leading-normal lg:leading-loose tracking-wide">
          Diseñamos experiencias en forma de regalo. Vinos seleccionados,
          presentaciones cuidadas y propuestas personalizadas para que vos, tu
          empresa o tu marca dejen una huella en cada obsequio.
        </div>

        <div className="w-full max-w-[1300px] pt-2.5 flex flex-col justify-center items-center gap-7 px-4 sm:px-0">
          <Button size="sm" variant="primary">
            quiero saber más
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Regalos;
