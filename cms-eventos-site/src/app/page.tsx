//import Navbar from "@/components/Navbar"; (<Navbar />)
//import Footer from "@/components/Footer"; (<Footer />)
import BannerCarrossel from "@/components/BannerCarrossel";
import BarraPesquisa from "@/components/BarraPesquisa";
import ListaEventos from "@/components/ListaEventos";

export default function Home() {
  return (
    <>
      <BannerCarrossel />
      <BarraPesquisa />
      <ListaEventos />
    </>
  );
}

