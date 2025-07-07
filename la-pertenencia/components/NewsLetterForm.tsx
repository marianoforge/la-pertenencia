import React, { useState } from "react";

const NewsLetterForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    // Aquí iría la lógica de suscripción
  };

  return (
    <div className="w-full relative flex items-center justify-center">
      <img
        alt="Newsletter"
        className="w-full h-80 sm:h-[262px] md:h-64 lg:h-72 object-cover"
        src="/images/newsletterSectionBG.png"
      />
      <div className="absolute sm:top-10 md:inset-12 lg:top-[15%] lg:right-[16%] lg:inset-auto">
        <div className="w-80 sm:w-96 px-7 pt-5 pb-10 bg-neutral-900 rounded outline outline-1 outline-offset-[-1px] outline-neutral-400 inline-flex flex-col justify-center items-center gap-5">
          <div className="self-stretch pt-2.5 flex flex-col justify-start items-center gap-1.5">
            <div className="self-stretch text-center justify-start text-amber-300 text-sm font-medium font-['Lora'] uppercase tracking-[7px]">
              newsletter
            </div>
            <div className="self-stretch text-center justify-start text-white text-sm font-normal font-['Lora'] leading-tight tracking-wide">
              Suscríbete a nuestro Newsletter y disfruta de experiencias únicas.
            </div>
          </div>
          <form
            className="self-stretch flex flex-col justify-center items-center gap-5"
            onSubmit={handleSubmit}
          >
            <div className="self-stretch px-4 py-2.5 bg-white/10 border-b border-neutral-400 inline-flex justify-start items-center gap-16">
              <input
                required
                className="flex-1 bg-transparent outline-none text-white text-sm font-normal font-['Lora'] tracking-wide placeholder:text-white/70"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="self-stretch h-9 px-7 py-3 bg-amber-300 rounded-sm outline outline-[0.36px] outline-offset-[-0.36px] outline-neutral-900 inline-flex justify-center items-center gap-2"
              type="submit"
            >
              <div className="justify-start text-neutral-900 text-sm font-medium font-['Lora'] uppercase tracking-[7px]">
                suscribirse
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterForm;
