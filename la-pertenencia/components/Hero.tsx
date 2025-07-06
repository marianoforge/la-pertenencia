import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative h-[584px] w-full">
      <Image
        fill
        alt="Hero"
        className="object-cover"
        src="/images/bg-hero.jpg"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />

      <div className="absolute inset-0 flex flex-row items-center justify-center gap-28 h-[550px]">
        <div className="w-[780px] h-[416px] mt-[140px]">
          <h1 className="text-[32px] text-primary mb-[30px] font-normal tracking-[16px] font-lora uppercase">
            Donde el vino une, nace la pertenencia.
          </h1>
          <p className="text-white text-xl leading-[32px] italic">
            &quot;La Pertenencia es mucho más que un negocio: es el reflejo de
            nuestro proyecto de vida. Un lugar donde nos rodeamos de buena
            gente, compartimos buena energía y, por supuesto, disfrutamos del
            buen vino.&quot;
          </p>
          <p className="text-white text-xl leading-[32px] mt-2.5 italic">
            Un proyecto que crece con cada persona que se suma, no es solamente
            vender vinos, es compartir historias, es atesorar experiencias que
            nos conectan con lo que nos gusta y nos hace bien.
          </p>
        </div>
        s
        <div className="lg:w-[317px] lg:h-[495px] xl:w-96 xl:h-[523px] flex items-center justify-center mt-[160px]">
          <Image
            alt="Logo"
            className="object-contain"
            height={523}
            src="/images/Logo-LaPertenencia.png"
            width={360}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
