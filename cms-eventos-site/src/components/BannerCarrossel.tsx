"use client";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type Evento = {
  id: string;
  titulo: string;
  imagem: string;
  data: string;
};

export default function BannerCarrossel() {
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    fetch("/api/eventos")
      .then((res) => res.json())
      .then((dados: Evento[]) => {
        const eventosOrdenados = dados
          // Sort vai fucnionar como evento mais próximo da data.
          .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
          .slice(0, 4);
        setEventos(eventosOrdenados);
      })
      .catch((err) => console.error("Erro ao carregar eventos:", err));
  }, []);

  return (
    <div className="mt-4 h-[400px] overflow-hidden rounded-lg px-[5%]">
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
            <img
              src={evento.imagem}
              alt={evento.titulo}
              className="h-[400px] w-full object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
