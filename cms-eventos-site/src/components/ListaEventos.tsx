import Image from "next/image";
import Link from "next/link";
import { eventos } from "../app/data/eventos";

export default function ListaEventos() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-8">
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
  );
}
