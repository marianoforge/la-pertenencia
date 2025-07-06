import React from "react";

import { Section, SectionHeader, ProductCard, Button } from "./ui";

const Regalos = () => {
  const handleAddToCart = (productName: string, quantity: number) => {
    console.log(`Adding ${quantity} of ${productName} to cart`);
  };

  const products = [
    {
      id: 1,
      title: 'Kit "la pertenecia"',
      price: 35990,
      image: "/images/kitlapertenencia.png",
      imageAlt: "Kit La Pertenencia",
      description: [
        "La pertenencia Malbec",
        "Set de 2 copas",
        "Tapón hermético",
        "Bomba de vacío",
      ],
      variant: "large" as const,
    },
    {
      id: 2,
      title: 'Kit "1ra Copa"',
      price: 30990,
      image: "/images/kitprimeracopa.png",
      imageAlt: "Kit Primera Copa",
      description: ["1 copa premium grabada", "Sacacorchos profesional"],
      variant: "small" as const,
    },
    {
      id: 3,
      title: 'Kit "2da Copa"',
      price: 30990,
      image: "/images/kitsegundacopa.png",
      imageAlt: "Kit Segunda Copa",
      description: ["1 copa premium grabada", "Sacacorchos profesional"],
      variant: "small" as const,
    },
  ];

  return (
    <Section className="pt-28" variant="default">
      <SectionHeader
        subtitle="Regala momentos que se brindan"
        title="Regalos empresariales"
      />

      <div className="w-[1292px] pt-10 inline-flex justify-between items-center">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            description={product.description}
            image={product.image}
            imageAlt={product.imageAlt}
            price={product.price}
            title={product.title}
            variant={product.variant}
            onAddToCart={(quantity) => handleAddToCart(product.title, quantity)}
          />
        ))}
      </div>

      <div className="w-[1300px] pt-5 flex flex-col justify-center items-center gap-7">
        <div className="self-stretch text-center justify-start text-neutral-900 text-xl font-normal font-['Lora'] leading-loose tracking-wide">
          Diseñamos experiencias en forma de regalo. Vinos seleccionados,
          presentaciones cuidadas y propuestas personalizadas para que vos, tu
          empresa o tu marca dejen una huella en cada obsequio.
        </div>
        <Button variant="primary">Quiero saber más</Button>
      </div>
    </Section>
  );
};

export default Regalos;
