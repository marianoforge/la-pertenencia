import DefaultLayout from "@/layouts/default";
import Hero from "@/components/Hero";
import Recomendados from "@/components/Recomendados";
import ImaginaTuVino from "@/components/ImaginaTuVino";
import NewsLetterForm from "@/components/NewsLetterForm";
import Regalos from "@/components/Regalos";
import CatasMaridajes from "@/components/CatasMaridajes";
import MembresiaMensual from "@/components/MembresiaMensual";
import Contacto from "@/components/Contacto";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <Hero />
      <Recomendados />
      <ImaginaTuVino />
      <NewsLetterForm />
      <Regalos />
      <CatasMaridajes />
      <MembresiaMensual />
      <Contacto />
    </DefaultLayout>
  );
}
