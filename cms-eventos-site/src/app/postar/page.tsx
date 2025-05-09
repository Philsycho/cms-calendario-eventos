'use client';

import { useEffect, useState } from 'react';

export default function Postar() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [descricao_curta, setDescricaoCurta] = useState('');
  const [data_postagem, setDataPostagem] = useState('');
  const [hora_postagem, setHoraPostagem] = useState('');
  const [data_evento, setDataEvento] = useState('');
  const [hora_evento, setHoraEvento] = useState('');
  const [hora_ini_evento, setHoraIniEvento] = useState('');
  const [hora_fim_evento, setHoraFimEvento] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState<{ id_categoria: number; desc_categoria: string }[]>([]);
  const [subcategorias, setSubcategorias] = useState<{ id_subcategoria: number; id_categoria: number; desc_subcategoria: string }[]>([]);
  const [subcategoria, setSubcategoria] = useState('');
  const [banner, setBanner] = useState<File | null>(null);
  const [video, setVideo] = useState('');
  const [publico, setPublico] = useState('');
  const [faixa_etaria, setFaixaEtaria] = useState('');
  const [vagas, setVagas] = useState('');
  const [gratuito, setGratuito] = useState('');
  const [valor, setValor] = useState('');
  const [compra_link, setCompraLink] = useState('');
  

  useEffect(() => {
    fetch('/api/categoria').then(res => res.json()).then(setCategorias);
    fetch('/api/sub_categoria').then(res => res.json()).then(setSubcategorias);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImagem(e.target.files[0]);
    }
  };

  const gerarSlug = (titulo: string) => {
    return titulo.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const formatarDataCompleta = (data: string) => {
    const date = new Date(data);
    return date.toISOString();
  };

  const getDataPostagem = () => {
    const date = new Date();
    return date.toISOString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const slug = gerarSlug(titulo);
    const data_postagem = getDataPostagem();

    const evento = {
      titulo,
      slug,
      descricao,
      descricao_curta,
      localizacao,
      data_evento: formatarDataCompleta(data_evento),
      data_postagem,
      categoria: parseInt(categoria),
      subcategoria: parseInt(subcategoria),
      banner: banner?.name || ''
    };

    const formData = new FormData();
    formData.append('evento', JSON.stringify(evento));
    if (banner) formData.append('banner', banner);

    const response = await fetch('/api/eventos', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa('admin:1234'),
      },
      body: formData,
    });

    if (response.ok) {
      alert('Evento criado com sucesso!');
    } else {
      alert('Falha ao criar o evento.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-4">Criar Novo Evento</h1> 
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-sm font-medium">Título</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="descricao" className="block text-sm font-medium">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="descricao_curta" className="block text-sm font-medium">Descrição</label>
          <textarea
            id="descricao_curta"
            value={descricao_curta}
            onChange={(e) => setDescricaoCurta(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="localizacao" className="block text-sm font-medium">Localização</label>
          <input
            type="text"
            id="localizacao"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="data_evento" className="block text-sm font-medium">Data e Hora do Evento</label>
          <input
            type="datetime-local"
            id="data_evento"
            value={data_evento}
            onChange={(e) => setDataEvento(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="categoria" className="block text-sm font-medium">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
              setSubcategoria('');
            }}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map(cat => (
              <option key={cat.id_categoria} value={cat.id_categoria}>{cat.desc_categoria}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="subcategoria" className="block text-sm font-medium">Subcategoria</label>
          <select
            id="subcategoria"
            value={subcategoria}
            onChange={(e) => setSubcategoria(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="">Selecione uma subcategoria</option>
            {subcategorias
              .filter(sub => sub.id_categoria === parseInt(categoria))
              .map(sub => (
                <option key={sub.id_subcategoria} value={sub.id_subcategoria}>{sub.desc_subcategoria}</option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="imagem" className="block text-sm font-medium">Imagem</label>
          <input
            type="file"
            id="imagem"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded">
          Publicar Evento
        </button>
      </form>
    </div>
  );
}
