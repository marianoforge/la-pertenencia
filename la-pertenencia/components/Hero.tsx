import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full px-2.5 pt-20 pb-10 relative bg-white inline-flex flex-col justify-start items-center gap-2.5 overflow-hidden">
      {/* Background Image */}
      <div className="w-full h-full absolute inset-0 overflow-hidden">
        <Image
          fill
          alt="Hero"
          className="object-cover"
          src="/images/bg-hero.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-3 flex flex-col justify-start items-center gap-5">
        {/* Logo */}
        <div className="w-32 h-48 relative overflow-hidden flex items-center justify-center">
          <Image
            alt="Logo"
            className="object-contain w-full h-full"
            height={192}
            src="/images/Logo-pertenencia.png"
            width={128}
          />
        </div>

        {/* Text Content */}
        <div className="w-full pt-2.5 flex flex-col justify-start items-center gap-7">
          <div className="w-full text-center text-amber-300 text-xl font-normal font-lora uppercase tracking-[10px]">
            Donde el vino une, nace la pertenencia.
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2.5">
            <div className="w-full text-center text-white text-sm font-normal font-lora leading-tight tracking-wide">
              &quot;La Pertenencia es mucho más que un negocio: es el reflejo de
              nuestro proyecto de vida. Un lugar donde nos rodeamos de buena
              gente, compartimos buena energía y, por supuesto, disfrutamos del
              buen vino.&quot;
            </div>
            <div className="w-full text-center text-white text-sm font-normal font-lora leading-tight tracking-wide">
              Un proyecto que crece con cada persona que se suma, no es
              solamente vender vinos, es compartir historias, es atesorar
              experiencias que nos conectan con lo que nos gusta y nos hace
              bien.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
