import Navbar from "@/components/Navbar";
import BannerCarrossel from "@/components/BannerCarrossel";
import BarraPesquisa from "@/components/BarraPesquisa";
import ListaEventos from "@/components/ListaEventos";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <BannerCarrossel />
      <BarraPesquisa />
      <ListaEventos />
      <Footer />
    </>
  );
}

