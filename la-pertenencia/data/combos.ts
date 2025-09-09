import { Combo } from "@/types/combo";

export const combosData: Combo[] = [
  {
    id: "combo-alacran",
    name: "COMBO ALACRAN",
    description: [
      "Instinto Torrontes",
      "Seduccion Cabernet Franc",
      "Instinto Malbec",
    ],
    wines: [
      {
        id: "instinto-torrontes",
        marca: "Instinto Torrontes",
        image: "/images/wine-placeholder.svg", // Placeholder hasta tener las imágenes reales
      },
      {
        id: "seduccion-cabernet",
        marca: "Seduccion Cabernet Franc",
        image: "/images/wine-placeholder.svg",
      },
      {
        id: "instinto-malbec",
        marca: "Instinto Malbec",
        image: "/images/wine-placeholder.svg",
      },
    ],
    price: 72300,
    image: "/images/imagen-combos.png", // Imagen de los tres vinos juntos
    backgroundImage: "/images/fondo-combo.png",
  },
  {
    id: "combo-malbec",
    name: "COMBO MALBEC",
    description: ["Khalimera Reserva", "Enroscado Icono", "Gauchezco"],
    wines: [
      {
        id: "khalimera-reserva",
        marca: "Khalimera Reserva",
        image: "/images/wine-placeholder.svg",
      },
      {
        id: "enroscado-icono",
        marca: "Enroscado Icono",
        image: "/images/wine-placeholder.svg",
      },
      {
        id: "gauchezco",
        marca: "Gauchezco",
        image: "/images/wine-placeholder.svg",
      },
    ],
    price: 55990,
    image: "/images/imagen-combos.png", // Imagen de los tres vinos juntos
    backgroundImage: "/images/fondo-combo.png",
  },
  {
    id: "combo-premium",
    name: "COMBO PREMIUM",
    description: ["Reserva Especial", "Gran Selección", "Edición Limitada"],
    wines: [
      {
        id: "reserva-especial",
        marca: "Reserva Especial",
        image: "/images/wine-placeholder.svg",
      },
      {
        id: "gran-seleccion",
        marca: "Gran Selección",
        image: "/images/wine-placeholder.svg",
      },
      {
        id: "edicion-limitada",
        marca: "Edición Limitada",
        image: "/images/wine-placeholder.svg",
      },
    ],
    price: 89500,
    image: "/images/imagen-combos.png", // Imagen de los tres vinos juntos
    backgroundImage: "/images/fondo-combo.png",
  },
];
