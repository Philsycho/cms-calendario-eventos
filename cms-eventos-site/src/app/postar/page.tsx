'use client';

import { useEffect, useState } from 'react';

export default function Postar() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [descricao_curta, setDescricaoCurta] = useState('');
  const [data_postagem, setDataPostagem] = useState(''); //Data em que o evento foi criado pelo organizador
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

  //Leitura do JSONs para integração da categorias e subcategorias
  useEffect(() => {
    fetch('/api/categoria').then(res => res.json()).then(setCategorias);
    fetch('/api/sub_categoria').then(res => res.json()).then(setSubcategorias);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBanner(e.target.files[0]);
    }
  };
  // Função para gerar o slug
  const gerarSlug = (titulo: string) => {
    return titulo.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };


  const formatarDataCompleta = (data_postagem: string) => {
    const date = new Date(data_postagem);
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
      data_postagem,
      hora_postagem,
      hora_ini_evento,
      hora_fim_evento,
      localizacao,
      data_evento: formatarDataCompleta(data_evento),
      categoria: parseInt(categoria),
      subcategoria: parseInt(subcategoria),
      banner: banner?.name || '',
      video,
      publico,
      faixa_etaria,
      vagas,
      gratuito,
      valor,
      compra_link,
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

        {/* Correção do rótulo para titulo */}
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-sm font-medium">Título</label>
          <textarea
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            style={{ height: '42px' }}
            required
          />
        </div>

        {/* Correção do rótulo para descrição curta */}
        <div className="mb-4">
          <label htmlFor="descricao_curta" className="block text-sm font-medium">Descrição Curta</label>
          <textarea
            id="descricao_curta"
            value={descricao_curta}
            onChange={(e) => setDescricaoCurta(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
            maxLength={200}
          />
          <p className="text-sm text-gray-500">{descricao_curta.length}/200 caracteres</p>
        </div>


        {/* Correção do rótulo para descrição */}
        <div className="mb-4">
          <label htmlFor="descricao" className="block text-sm font-medium">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            style={{ height: '200px' }}
            required
          />
        </div>

        {/* Campos adicionais que estavam faltando */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Vídeo (URL)</label>
          <input
            type="text"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Público</label>
          <input
            type="text"
            value={publico}
            onChange={(e) => setPublico(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Faixa Etária</label>
          <input
            type="text"
            value={faixa_etaria}
            onChange={(e) => setFaixaEtaria(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Vagas</label>
          <input
            type="number"
            value={vagas}
            onChange={(e) => setVagas(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Gratuito? (sim/não)</label>
          <input
            type="text"
            value={gratuito}
            onChange={(e) => setGratuito(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Valor</label>
          <input
            type="text"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Link para Compra</label>
          <input
            type="text"
            value={compra_link}
            onChange={(e) => setCompraLink(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
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
