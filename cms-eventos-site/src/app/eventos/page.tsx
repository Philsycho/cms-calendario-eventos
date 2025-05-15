"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Tipos dos dados

type Evento = {
  id: number;
  titulo: string;
  slug: string;
  descricao_curta: string;
  data_evento: string;
  categoria: number; // agora usamos ID numérico
  subcategoria: number; // agora usamos ID numérico
  localizacao: string;
  banner: string;
};

type Categoria = {
  id_categoria: number;
  desc_categoria: string;
};

type SubCategoria = {
  id_subcategoria: number;
  id_categoria: number;
  desc_subcategoria: string;
};

export default function PaginaEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [subcategorias, setSubcategorias] = useState<SubCategoria[]>([]);

  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroSubcategoria, setFiltroSubcategoria] = useState("");

  // Carrega os dados das APIs
  useEffect(() => {
    fetch("/api/eventos").then(res => res.json()).then(setEventos);
    fetch("/api/categoria").then(res => res.json()).then(setCategorias);
    fetch("/api/sub_categoria").then(res => res.json()).then(setSubcategorias);
  }, []);

  // Filtra os eventos conforme título, categoria e subcategoria
  const eventosFiltrados = eventos
    .filter(evento => {
      const matchTitulo = evento.titulo.toLowerCase().includes(filtroTitulo.toLowerCase());
      const matchCategoria = filtroCategoria ? evento.categoria === parseInt(filtroCategoria) : true;
      const matchSubcategoria = filtroSubcategoria ? evento.subcategoria === parseInt(filtroSubcategoria) : true;
      return matchTitulo && matchCategoria && matchSubcategoria;
    })
    .sort((a, b) => new Date(b.data_evento).getTime() - new Date(a.data_evento).getTime()); // Ordena da mais recente para mais antiga

  return (
    <div className="px-6 py-4 px-[8%]">
      <h1 className="text-2xl font-bold mb-4">Todos os Eventos</h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por título"
          value={filtroTitulo}
          onChange={e => setFiltroTitulo(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3 "
        />
        <select
          value={filtroCategoria}
          onChange={e => {
            setFiltroCategoria(e.target.value);
            setFiltroSubcategoria(""); // Limpa subcategoria se categoria mudar
          }}
          className="p-2 border rounded w-full md:w-1/4"
        >
          <option value="">Todas as categorias</option>
          {categorias.map(cat => (
            <option key={cat.id_categoria} value={cat.id_categoria}>
              {cat.desc_categoria}
            </option>
          ))}
        </select>
        <select
          value={filtroSubcategoria}
          onChange={e => setFiltroSubcategoria(e.target.value)}
          className="p-2 border rounded w-full md:w-1/4"
          disabled={!filtroCategoria}
        >
          <option value="">Todas as subcategorias</option>
          {subcategorias
            .filter(sub => filtroCategoria ? sub.id_categoria === parseInt(filtroCategoria) : true)
            .map(sub => (
              <option key={sub.id_subcategoria} value={sub.id_subcategoria}>
                {sub.desc_subcategoria}
              </option>
            ))}
        </select>
      </div>

      {/* Eventos filtrados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventosFiltrados.map(evento => (
          <Link
            key={evento.id}
            href={`/eventos/${evento.slug}`}
            className="block rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all bg-white"
          >
            <div className="block rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all bg-white">
              <img
                src={evento.banner}
                alt={evento.titulo}
                className="w-full h-50 object-cover rounded"
              />
              <h2 className="text-xl font-bold text-black mt-3 ml-3">
                {evento.titulo}
              </h2>
              <p className="text-sm text-black mt-1 ml-3">
                {evento.data_evento}
              </p>
              <p className="text-sm text-black mt-1 ml-3">
                {evento.localizacao}
              </p>
              <p className="mt-1 ml-3 mb-3 text-black min-h-[48px]">
                {evento.descricao_curta || ''}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}