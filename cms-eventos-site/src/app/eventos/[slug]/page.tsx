import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

interface Evento {
  id: string;
  titulo: string;
  descricao: string;
  banner: string;
  localizacao: string;
  data_evento: string;
  slug: string;
}

export default async function PaginaEvento({ params }: Props) {
  // Caminho do arquivo JSON
  const filePath = path.join(process.cwd(), "src", "app", "data", "eventos.json");

  // Leitura síncrona porque estamos no lado do servidor
  const data = fs.readFileSync(filePath, "utf-8");
  const eventos: Evento[] = JSON.parse(data);

  const evento =  eventos.find((e) => e.slug === params.slug);

  if (!evento) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{evento.titulo}</h1>
      <img
        src={evento.banner}
        alt={evento.titulo}
        className="w-full h-[300px] object-cover rounded-xl mb-6"
      />
      <p className="text-gray-600">📅 {evento.data_evento}</p>
      <p className="text-gray-600">📍 {evento.localizacao}</p>
      <p className="text-lg mb-2">{evento.descricao}</p>

      <div>
        <p>Reembolso</p>
      </div>
    </main>
  );
}
