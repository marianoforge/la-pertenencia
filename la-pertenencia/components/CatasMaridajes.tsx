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
    <Section variant="gray">
      <SectionHeader
        subtitle="Encuentros que conectan"
        title="Catas y maridajes"
      />

      <div className="w-[1300px] pt-2.5 pb-10 flex flex-col justify-center items-center gap-2.5">
        <div className="w-[1300px] text-center justify-start text-neutral-900 text-xl font-normal font-['Lora'] leading-loose tracking-wide">
          Creemos que las degustaciones y catas son más que una prueba de
          productos; son experiencias sensoriales y sociales para disfrutar,
          aprender y compartir, acompañadas de buenos vinos, quesos y valiosos
          tips de maridaje.
        </div>
      </div>

      <div className="w-[1300px] px-14 inline-flex justify-start items-center gap-10">
        <div className="flex-1 self-stretch inline-flex flex-col justify-between items-start">
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

        <div className="inline-flex flex-col justify-center items-start gap-5">
          <div className="w-[400px] h-[384px] relative rounded-lg overflow-hidden">
            <img
              alt="Maridaje eventos"
              className="w-full h-full object-cover"
              src="/images/maridajeeventos.png"
            />
          </div>
          <Button className="w-full self-stretch" variant="primary">
            todos los eventos
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default CatasMaridajes;
