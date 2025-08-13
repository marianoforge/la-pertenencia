import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div
      className="w-full relative bg-white inline-flex flex-col justify-start items-center gap-2.5 fluid-hero-container"
      id="hero"
      style={{
        paddingLeft: "clamp(0.625rem, 2.5vw, 2.5rem)",
        paddingRight: "clamp(0.625rem, 2.5vw, 2.5rem)",
        paddingTop: "clamp(2.5rem, 8vw, 5rem)",
        paddingBottom: "clamp(2.5rem, 8vw, 0rem)",
      }}
    >
      {/* Background Image */}
      <div className="w-full h-full absolute inset-0 overflow-hidden">
        <Image
          fill
          alt="Hero"
          className="object-bottom object-cover"
          src="/images/bg-hero.png"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent lg:bg-gradient-to-l lg:from-black/70 lg:via-black/10 lg:to-transparent" />
      </div>

      {/* Content - Mobile/Tablet Layout */}
      <div
        className="relative z-10 w-full flex-col justify-start items-center fluid-hero-mobile"
        style={{
          paddingLeft: "clamp(0.75rem, 3vw, 1.5rem)",
          paddingRight: "clamp(0.75rem, 3vw, 1.5rem)",
          gap: "clamp(1.25rem, 4vw, 2rem)",
        }}
      >
        {/* Logo */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="relative overflow-hidden flex items-center justify-center"
          style={{
            width: "clamp(8rem, 25vw, 10rem)",
            height: "clamp(12rem, 35vw, 15rem)",
          }}
        >
          <Image
            alt="Logo"
            className="object-contain w-full h-full"
            height={240}
            src="/images/logo-pertenencia.png"
            width={160}
          />
        </div>

        {/* Text Content */}
        <div
          className="w-full flex flex-col justify-start items-center"
          style={{
            paddingTop: "clamp(0.625rem, 2vw, 1.25rem)",
            gap: "clamp(1.25rem, 4vw, 1.75rem)",
          }}
        >
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="w-full text-center text-amber-300 font-normal font-lora uppercase"
            style={{
              fontSize: "clamp(1.125rem, 4vw, 1.75rem)",
              letterSpacing: "clamp(0.25rem, 1vw, 0.75rem)",
              lineHeight: "1.2",
            }}
          >
            Donde el vino une,
            <br />
            nace la pertenencia.
          </div>
          <div
            className="w-full flex flex-col justify-start items-start"
            style={{ gap: "clamp(0.625rem, 2vw, 1rem)" }}
          >
            <div
              className="w-full text-center text-white font-normal font-lora tracking-wide"
              style={{
                fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
                lineHeight: "clamp(1.25, 1.5, 1.5)",
              }}
            >
              &quot;La Pertenencia es mucho más que un negocio: es el reflejo de
              nuestro proyecto de vida. Un lugar donde nos rodeamos de buena
              gente, compartimos buena energía y, por supuesto, disfrutamos del
              buen vino.&quot;
            </div>
            <div
              className="w-full text-center text-white font-normal font-lora tracking-wide"
              style={{
                fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
                lineHeight: "clamp(1.25, 1.5, 1.5)",
              }}
            >
              Un proyecto que crece con cada persona que se suma, no es
              solamente vender vinos, es compartir historias, es atesorar
              experiencias que nos conectan con lo que nos gusta y nos hace
              bien.
            </div>
          </div>
        </div>
      </div>

      {/* Content - Desktop Layout */}
      <div
        className="relative z-10 w-full max-w-[1300px] fluid-hero-desktop"
        style={{
          height: "clamp(25rem, 40vw, 35rem)",
        }}
      >
        {/* Text Column */}
        <div
          className="flex flex-col justify-start items-start"
          style={{
            width: "clamp(40rem, 60vw, 55rem)",
            height: "clamp(20rem, 30vw, 22.25rem)",
            paddingTop: "clamp(2rem, 4vw, 3.5rem)",
            paddingLeft: "clamp(1.5rem, 4vw, 3rem)",
            gap: "clamp(1.25rem, 2.5vw, 1.75rem)",
          }}
        >
          <div
            className="justify-start text-amber-300 font-normal font-lora uppercase"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              letterSpacing: "clamp(0.5rem, 1.2vw, 1rem)",
              lineHeight: "1.2",
            }}
          >
            Donde el vino une,
            <br />
            nace la pertenencia.
          </div>
          <div
            className="self-stretch flex flex-col justify-start items-start"
            style={{ gap: "clamp(0.625rem, 1.5vw, 1rem)" }}
          >
            <div className="self-stretch justify-start">
              <span
                className="text-white font-normal italic font-lora tracking-tight"
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  lineHeight: "clamp(1.4, 1.6, 1.6)",
                }}
              >
                &quot;
              </span>
              <span
                className="text-white font-semibold font-lora italic tracking-tight"
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  lineHeight: "clamp(1.4, 1.6, 1.6)",
                }}
              >
                La Pertenencia es mucho más que un negocio:
              </span>
              <span
                className="text-white font-normal font-lora italic tracking-wide"
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  lineHeight: "clamp(1.4, 1.6, 1.6)",
                }}
              >
                {" "}
                es el reflejo de nuestro proyecto de vida. Un lugar donde nos
                rodeamos de buena gente, compartimos buena energía y, por
                supuesto, disfrutamos del buen vino.&quot;
              </span>
            </div>
            <div
              className="self-stretch justify-start text-white font-normal italic font-lora tracking-wide"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                lineHeight: "clamp(1.4, 1.7, 1.7)",
              }}
            >
              Un proyecto que crece con cada persona que se suma, no es
              solamente vender vinos, es compartir historias, es atesorar
              experiencias que nos conectan con lo que nos gusta y nos hace
              bien.
            </div>
          </div>
        </div>

        {/* Logo Column */}
        <div
          className="relative ml-auto flex items-center justify-center"
          style={{
            width: "clamp(20rem, 30vw, 24rem)",
            height: "clamp(25rem, 40vw, 35rem)",
          }}
        >
          <div
            className="absolute overflow-visible flex items-center justify-center"
            style={{
              width: "clamp(18rem, 25vw, 22rem)",
              height: "clamp(28rem, 45vw, 40rem)",
              top: "clamp(2rem, 4vw, 4rem)",
              left: "0",
              zIndex: 50,
            }}
          >
            <Image
              alt="Logo"
              className="object-contain w-full h-full"
              height={640}
              src="/images/logo-pertenencia.png"
              width={440}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
