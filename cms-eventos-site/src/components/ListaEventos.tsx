"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Evento = {
  id: string;
  slug: string;
  titulo: string;
  descricao: string;
  descricao_curta: string;
  imagem: string;
  data_evento: string;
  data_postagem: string;
  local: string;
};

export default function ListaEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    fetch("/api/eventos")
      .then((res) => res.json())
      .then((data) => {
        const eventosOrdenados = data
          .sort(
            (a: Evento, b: Evento) =>
              new Date(b.data_postagem).getTime() - new Date(a.data_postagem).getTime()
          )
          .slice(0, 6); // Pega apenas os 6 mais recentes
        setEventos(eventosOrdenados);
      })
      .catch((err) => console.error("Erro ao buscar eventos:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 pb-8 px-[8%]">
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
            <h2 className="text-xl text-black font-semibold">{evento.titulo}</h2>
            <p className="text-gray-500 text-sm">
              {new Date(evento.data_evento).toLocaleDateString()} • {evento.local}
            </p>
            <p className="mt-2 text-gray-700">{evento.descricao_curta}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
