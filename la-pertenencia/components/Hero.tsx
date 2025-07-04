import Image from "next/image";

type Props = {};

const Hero = (props: Props) => {
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
            Donde el vino une, <br />
            nace la pertenencia.
          </h1>
          <p className="text-white text-xl leading-[32px] italic">
            &quot;<b>La Pertenenciaes mucho más que un negocio:</b> es el
            reflejo de nuestro proyecto de vida. Un lugar donde nos rodeamos de
            buena gente, compartimos buena energía y, por supuesto, disfrutamos
            del buen vino.&quot;
          </p>
          <p className="text-white text-xl leading-[32px] mt-2.5 italic">
            Un proyecto que crece con cada persona que se suma, no es solamente
            vender vinos, es compartir historias, es atesorar experiencias que
            nos conectan con la vida. Un lugar donde nos rodeamos de buena
            gente, compartimos buena energía y, por supuesto, disfrutamos del
            buen vino.
          </p>
        </div>
        <div className="w-[408px] h-[550px] flex items-center justify-center mt-[160px]">
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
