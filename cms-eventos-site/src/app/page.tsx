/*import Image from "next/image";
import Link from "next/link";
import { eventos } from "./data/eventos";

export default function Home() {
  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Próximos Eventos</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {eventos.map((evento) => (
          <Link
            key={evento.id}
            href={`/eventos/${evento.slug}`}
            className="block rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all bg-white"
          >
            <div className="w-full h-60 relative">
              <Image
                src={evento.imagem}
                alt={evento.titulo}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{evento.titulo}</h2>
              <p className="text-gray-500 text-sm">
                {new Date(evento.data).toLocaleDateString()} • {evento.local}
              </p>
              <p className="mt-2 text-gray-700">{evento.descricao}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}*/

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

