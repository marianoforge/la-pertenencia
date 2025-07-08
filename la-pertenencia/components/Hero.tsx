import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full px-2.5 pt-10 pb-10 sm:pb-20 lg:pt-20 lg:pb-0 relative bg-white inline-flex flex-col justify-start items-center gap-2.5 lg:overflow-visible overflow-hidden">
      {/* Background Image */}
      <div className="w-full h-full absolute inset-0 overflow-hidden">
        <Image
          fill
          alt="Hero"
          className="object-cover"
          src="/images/bg-hero.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent lg:bg-gradient-to-l lg:from-black/90 lg:via-black/60 lg:to-transparent" />
      </div>

      {/* Content - Mobile/Tablet Layout */}
      <div className="relative z-10 w-full px-3 flex flex-col justify-start items-center gap-5 lg:hidden">
        {/* Logo */}
        <div className="w-32 h-48 md:w-40 md:h-60 relative overflow-hidden flex items-center justify-center">
          <Image
            alt="Logo"
            className="object-contain w-full h-full"
            height={192}
            src="/images/Logo-pertenencia.png"
            width={128}
          />
        </div>

        {/* Text Content */}
        <div className="w-full pt-2.5 md:pt-5 flex flex-col justify-start items-center gap-7">
          <div className="w-full text-center text-amber-300 text-xl md:text-2xl font-normal font-lora uppercase tracking-[10px] md:tracking-[12px]">
            Donde el vino une,
            <br />
            nace la pertenencia.
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2.5">
            <div className="w-full text-center text-white text-sm md:text-base font-normal font-lora leading-tight md:leading-normal tracking-wide">
              &quot;La Pertenencia es mucho más que un negocio: es el reflejo de
              nuestro proyecto de vida. Un lugar donde nos rodeamos de buena
              gente, compartimos buena energía y, por supuesto, disfrutamos del
              buen vino.&quot;
            </div>
            <div className="w-full text-center text-white text-sm md:text-base font-normal font-lora leading-tight md:leading-normal tracking-wide">
              Un proyecto que crece con cada persona que se suma, no es
              solamente vender vinos, es compartir historias, es atesorar
              experiencias que nos conectan con lo que nos gusta y nos hace
              bien.
            </div>
          </div>
        </div>
      </div>

      {/* Content - Desktop Layout (lg+) */}
      <div className="relative z-10 w-full max-w-[1300px] h-[550px] hidden lg:flex">
        {/* Text Column */}
        <div className="lg:w-[700px] xl:w-[780px] h-[356px] pt-14 pl-12 flex flex-col justify-start items-start gap-7">
          <div className="self-stretch justify-start text-amber-300 text-3xl font-normal font-lora uppercase tracking-[16px]">
            Donde el vino une,
            <br />
            nace la pertenencia.
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch justify-start">
              <span className="text-white text-xl font-normal font-lora xl:leading-loose tracking-tight">
                &quot;
              </span>
              <span className="text-white text-xl font-semibold font-lora leading-normal xl:leading-loose tracking-tight">
                La Pertenencia es mucho más que un negocio:
              </span>
              <span className="text-white text-xl font-normal font-lora leading-normal xl:leading-loose tracking-wide">
                {" "}
                es el reflejo de nuestro proyecto de vida. Un lugar donde nos
                rodeamos de buena gente, compartimos buena energía y, por
                supuesto, disfrutamos del buen vino.&quot;
              </span>
            </div>
            <div className="self-stretch justify-start text-white text-xl font-normal font-lora leading-normal xl:leading-loose tracking-wide">
              Un proyecto que crece con cada persona que se suma, no es
              solamente vender vinos, es compartir historias, es atesorar
              experiencias que nos conectan con lo que nos gusta y nos hace
              bien.
            </div>
          </div>
        </div>

        {/* Logo Column */}
        <div className="relative w-96 h-[550px] ml-auto flex items-center justify-center">
          <div className="w-96 h-[600px] lg:h-[460px] lg:w-[315px] xl:h-[523px] xl:w-[357px] absolute lg:top-32 lg:left-0 xl:top-16   z-50 overflow-visible flex items-center justify-center">
            <Image
              alt="Logo"
              className="object-contain w-full h-full"
              height={600}
              src="/images/Logo-pertenencia.png"
              width={384}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
