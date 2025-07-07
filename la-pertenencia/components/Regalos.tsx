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
    <Section variant="default">
      <SectionHeader
        subtitle="Regala momentos que se brindan"
        title="Regalos empresariales"
      />

      <div className="w-full max-w-[1300px] pt-6 md:pt-10 flex flex-col gap-6 md:gap-8 lg:gap-10 px-4 sm:px-0">
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
              <div className="justify-start text-neutral-900 text-sm font-semibold font-['Lora'] uppercase tracking-[3.50px]">
                Kit &quot;la pertenecia&quot;
              </div>
              <div className="w-72 pt-[5px] pb-2.5 inline-flex justify-start items-start gap-2.5">
                <div className="w-60 justify-start text-yellow-700 text-sm font-normal font-['Lora'] tracking-wide">
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
                  <div className="justify-start text-neutral-900 text-sm font-normal font-['Lora'] tracking-wide">
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
              className="self-stretch pl-9 pr-7 py-1.5 bg-neutral-900 rounded-sm outline outline-[0.38px] outline-offset-[-0.38px] outline-amber-300 inline-flex justify-center items-center gap-3"
              onClick={() =>
                handleAddToCart('Kit "la pertenencia"', quantities.kit1)
              }
            >
              <div className="justify-start text-amber-300 text-base font-medium font-['Lora'] uppercase tracking-[8px]">
                agregar
              </div>
              <div className="w-6 h-6 relative rounded-sm">
                <div className="w-0.5 h-0.5 left-[8.97px] top-[15.71px] absolute bg-amber-300" />
                <div className="w-0.5 h-0.5 left-[14.94px] top-[15.71px] absolute bg-amber-300" />
                <div className="w-3.5 h-2.5 left-[5.25px] top-[5.62px] absolute bg-amber-300" />
              </div>
            </button>
          </div>
        </div>

        {/* Los dos kits pequeños en la misma fila */}
        <div className="w-full flex flex-col sm:flex-row gap-6 md:gap-8 lg:gap-10">
          {/* Kit "1ra Copa" - Small Card */}
          <div className="w-full mx-auto bg-white inline-flex flex-col justify-start items-center">
            <img
              alt="Kit Primera Copa"
              className="w-full h-36 rounded-tl-lg rounded-tr-lg border-b-[3px] border-neutral-900 object-cover"
              src="/images/kitprimeracopa.png"
            />
            <div className="self-stretch p-5 flex flex-col justify-start items-start gap-1">
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-neutral-900 text-sm font-semibold font-['Lora'] uppercase tracking-[3.50px]">
                  Kit &quot;1ra Copa&quot;
                </div>
                <div className="self-stretch inline-flex justify-center items-center gap-2.5">
                  <div className="w-60 justify-start text-yellow-700 text-sm font-normal font-['Lora'] tracking-wide">
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
                    <div className="justify-start text-neutral-900 text-sm font-normal font-['Lora'] tracking-wide">
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
                className="self-stretch pl-9 pr-7 py-1.5 bg-neutral-900 rounded-sm outline outline-[0.38px] outline-offset-[-0.38px] outline-amber-300 inline-flex justify-center items-center gap-3"
                onClick={() =>
                  handleAddToCart('Kit "1ra Copa"', quantities.kit2)
                }
              >
                <div className="justify-start text-amber-300 text-base font-medium font-['Lora'] uppercase tracking-[8px]">
                  agregar
                </div>
                <div className="w-6 h-6 relative rounded-sm">
                  <div className="w-0.5 h-0.5 left-[8.97px] top-[15.71px] absolute bg-amber-300" />
                  <div className="w-0.5 h-0.5 left-[14.94px] top-[15.71px] absolute bg-amber-300" />
                  <div className="w-3.5 h-2.5 left-[5.25px] top-[5.62px] absolute bg-amber-300" />
                </div>
              </button>
            </div>
          </div>

          {/* Kit "2da Copa" - Small Card */}
          <div className="w-full mx-auto bg-white inline-flex flex-col justify-start items-center">
            <img
              alt="Kit Segunda Copa"
              className="w-full h-36 rounded-tl-lg rounded-tr-lg border-b-[3px] border-neutral-900 object-cover"
              src="/images/kitsegundacopa.png"
            />
            <div className="self-stretch p-5 flex flex-col justify-start items-start gap-1">
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-neutral-900 text-sm font-semibold font-['Lora'] uppercase tracking-[3.50px]">
                  Kit &quot;2da Copa&quot;
                </div>
                <div className="self-stretch inline-flex justify-center items-center gap-2.5">
                  <div className="w-60 justify-start text-yellow-700 text-sm font-normal font-['Lora'] tracking-wide">
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
                    <div className="justify-start text-neutral-900 text-sm font-normal font-['Lora'] tracking-wide">
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
                className="self-stretch pl-9 pr-7 py-1.5 bg-neutral-900 rounded-sm outline outline-[0.38px] outline-offset-[-0.38px] outline-amber-300 inline-flex justify-center items-center gap-3"
                onClick={() =>
                  handleAddToCart('Kit "2da Copa"', quantities.kit3)
                }
              >
                <div className="justify-start text-amber-300 text-base font-medium font-['Lora'] uppercase tracking-[8px]">
                  agregar
                </div>
                <div className="w-6 h-6 relative rounded-sm">
                  <div className="w-0.5 h-0.5 left-[8.97px] top-[15.71px] absolute bg-amber-300" />
                  <div className="w-0.5 h-0.5 left-[14.94px] top-[15.71px] absolute bg-amber-300" />
                  <div className="w-3.5 h-2.5 left-[5.25px] top-[5.62px] absolute bg-amber-300" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1300px] pt-5 flex flex-col justify-center items-center gap-6 md:gap-7 px-4 sm:px-0">
        <div className="text-center text-neutral-900 text-base sm:text-lg md:text-xl font-normal font-['Lora'] leading-relaxed md:leading-loose tracking-wide">
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
