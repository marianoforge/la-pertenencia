import React, { useState } from "react";

import { Input, Button } from "./ui";

const NewsLetterForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    // Aquí iría la lógica de suscripción
  };

  return (
    <div className="w-full relative items-center justify-center">
      <img
        alt="Newsletter"
        className="w-[1920px] h-72 object-cover"
        src="/images/newsletterSectionBG.png"
      />
      <div className="absolute top-[15%] right-[16%] w-[600px] px-7 pt-7 pb-12 bg-neutral-900 rounded outline outline-1 outline-offset-[-1px] outline-neutral-400 inline-flex flex-col justify-start items-start gap-7">
        <div className="self-stretch pt-2.5 flex flex-col justify-start items-center gap-1.5">
          <div className="self-stretch text-center justify-start text-amber-300 text-xl font-medium font-['Lora'] uppercase tracking-[10px]">
            newsletter
          </div>
          <div className="self-stretch text-center justify-start text-white text-base font-normal font-['Lora'] tracking-wide">
            Suscríbete a nuestro Newsletter y disfruta de experiencias únicas.
          </div>
        </div>
        <form
          className="self-stretch flex flex-col justify-center items-center gap-6"
          onSubmit={handleSubmit}
        >
          <Input
            required
            className="self-stretch"
            label="Email"
            type="email"
            value={email}
            variant="newsletter"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="self-stretch" type="submit" variant="primary">
            suscribirse
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetterForm;
