import React from "react";

const NewsLetterForm = () => {
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
        <div className="self-stretch flex flex-col justify-center items-center gap-6">
          <div className="self-stretch px-5 py-4 bg-white/10 border-b border-neutral-400 inline-flex justify-start items-center gap-16">
            <div className="justify-start text-white text-base font-normal font-['Lora'] tracking-wide">
              Email
            </div>
          </div>
          <div
            className="self-stretch px-12 py-4 bg-amber-300 rounded-sm outline outline-[0.50px] outline-offset-[-0.50px] outline-neutral-900 inline-flex justify-center items-center gap-2.5"
            data-property-1="Default"
          >
            <div className="justify-start text-neutral-900 text-base font-medium font-['Lora'] uppercase tracking-[8px]">
              suscribirse{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterForm;
