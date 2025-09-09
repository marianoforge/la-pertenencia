import DefaultLayout from "@/layouts/default";
import Hero from "@/components/Hero";
import Recomendados from "@/components/Recomendados";
import ImaginaTuVino from "@/components/ImaginaTuVino";
import NewsLetterForm from "@/components/NewsLetterForm";
import CatasMaridajes from "@/components/CatasMaridajes";
import MembresiaMensual from "@/components/MembresiaMensual";
import EspacioLaPertenencia from "@/components/EspacioLaPertenencia";
import Contacto from "@/components/Contacto";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <Hero />
      <Recomendados />
      <ImaginaTuVino />
      <NewsLetterForm />
      {/* <Regalos /> */}
      <EspacioLaPertenencia />
      <CatasMaridajes />
      <MembresiaMensual />
      <Contacto />
    </DefaultLayout>
  );
}
