import React from "react";

import { Section, SectionHeader, EventCard, Button } from "./ui";

const CatasMaridajes = () => {
  const events = [
    {
      id: 1,
      title: "MARIDAJE CARNES ROJAS",
      description:
        "Lorem ipsum dolor sit amet consectetur. Eget in scelerisque quis sit amet nulla.",
      date: "28 Junio, 2025",
      time: "20:30",
      location: "Palermo - CABA",
      image: "/images/maridajecarnesrojas.png",
      imageAlt: "Maridaje Carnes Rojas",
    },
    {
      id: 2,
      title: "Coctelería",
      description:
        "Lorem ipsum dolor sit amet consectetur. Eget in scelerisque quis sit amet nulla.",
      date: "28 Junio, 2025",
      time: "20:30",
      location: "Palermo - CABA",
      image: "/images/cocteleria.png",
      imageAlt: "Coctelería",
    },
    {
      id: 3,
      title: "catas temáticas",
      description:
        "Lorem ipsum dolor sit amet consectetur. Eget in scelerisque quis sit amet nulla.",
      date: "28 Junio, 2025",
      time: "20:30",
      location: "Palermo - CABA",
      image: "/images/catastematicas.png",
      imageAlt: "Categoría temática",
    },
  ];

  return (
    <Section id="catas-maridajes" variant="gray">
      <SectionHeader
        subtitle="Encuentros que conectan"
        title="Catas y maridajes"
      />

      <div className="w-full max-w-[1300px] pt-2.5 pb-5 md:pb-7 lg:pb-10 flex flex-col justify-center items-center gap-2.5 px-4 sm:px-0">
        <div className="text-center text-neutral-900 text-sm md:text-base lg:text-xl font-normal font-['Lora'] leading-tight md:leading-normal lg:leading-loose tracking-wide">
          Creemos que las degustaciones y catas son más que una prueba de
          productos; son experiencias sensoriales y sociales para disfrutar,
          aprender y compartir, acompañadas de buenos vinos, quesos y valiosos
          tips de maridaje.
        </div>
      </div>

      <div className="w-full max-w-[1300px] px-0 sm:px-2.5 md:px-5 lg:px-2.5 flex flex-col lg:flex-row justify-start items-start gap-10 lg:gap-10">
        <div className="w-full lg:flex-1 flex flex-col justify-start items-start gap-5 md:gap-12">
          {events.map((event) => (
            <EventCard
              key={event.id}
              date={event.date}
              description={event.description}
              image={event.image}
              imageAlt={event.imageAlt}
              location={event.location}
              time={event.time}
              title={event.title}
            />
          ))}
        </div>

        <div className="w-full lg:w-[510px] h-12 lg:h-full flex flex-col justify-between items-start gap-5 lg:gap-0">
          <div className="w-full hidden lg:flex flex-1 lg:flex-grow relative rounded-lg overflow-hidden">
            <img
              alt="Maridaje eventos"
              className="w-full h-full object-cover rounded-lg"
              src="/images/maridajeeventos.png"
            />
          </div>
          <div className="w-full flex justify-center items-center lg:items-stretch mt-4">
            <Button variant="primary">todos los eventos</Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CatasMaridajes;
