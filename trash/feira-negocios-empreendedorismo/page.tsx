import { eventos } from "../../cms-eventos-site/src/app/data/eventos";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default function PaginaEvento({ params }: Props) {
  const evento = eventos.find((e) => e.slug === params.slug);

  if (!evento) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{evento.titulo}</h1>
      <img
        src={evento.imagem}
        alt={evento.titulo}
        className="w-full h-[300px] object-cover rounded-xl mb-6"
      />
      <p className="text-lg mb-2">{evento.descricao}</p>
      <p className="text-gray-600">📍 {evento.localizacao}</p>
      <p className="text-gray-600">📅 {evento.data}</p>
    </main>
  );
}
