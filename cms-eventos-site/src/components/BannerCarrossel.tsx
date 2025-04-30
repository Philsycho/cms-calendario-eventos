"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type Evento = {
  id: string;
  titulo: string;
  imagem: string;
  data_evento: string;
  data_postagem: string;
  slug: string;
};

export default function BannerCarrossel() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const router = useRouter();


  useEffect(() => {
    fetch("/api/eventos")
      .then((res) => res.json())
      .then((dados: Evento[]) => {
        const eventosOrdenados = dados
          .sort((a, b) => new Date(b.data_postagem).getTime() - new Date(a.data_evento).getTime())
          .slice(0, 4);
        setEventos(eventosOrdenados);
        dados.forEach((evento) => {
          console.log(`Evento: ${evento.titulo}`);
          console.log(`Data do Evento: ${evento.data_evento}`);
          console.log(`Data da Postagem: ${evento.data_postagem}`);
        });
      })
      .catch((err) => console.error("Erro ao carregar eventos:", err));
      
  }, []);

  return (
    <div className="mt-4 h-[400px] overflow-hidden rounded-lg px-[8%]">
      <Carousel
        key={eventos.length}
        autoPlay
        interval={7000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        className="h-full"
      >
        {eventos.map((evento) => (
          <div key={evento.id}>
            <div
              onClick={() => router.push(`/eventos/${evento.slug}`)}
              className="cursor-pointer h-[400px] w-full"
              style={{ position: "relative" }}
            >
              <img
                src={evento.imagem}
                alt={evento.titulo}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-4 text-lg font-semibold"
              >
                {evento.titulo}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
