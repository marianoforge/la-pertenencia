import DefaultLayout from "@/layouts/default";
import Hero from "@/components/Hero";
import Recomendados from "@/components/Recomendados";
import ImaginaTuVino from "@/components/ImaginaTuVino";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <Hero />
      <Recomendados />
      <ImaginaTuVino />
    </DefaultLayout>
  );
}
