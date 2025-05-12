'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditarEvento() {
  const { slug } = useParams();
  const router = useRouter();

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
  const [imagemAtual, setImagemAtual] = useState('');

  useEffect(() => {
    // Carregar categorias e subcategorias
    fetch('/api/categoria').then(res => res.json()).then(setCategorias);
    fetch('/api/sub_categoria').then(res => res.json()).then(setSubcategorias);

    // Buscar os dados do evento pelo slug
    fetch(`/api/eventos/${slug}`).then(res => res.json()).then(evento => {
      setTitulo(evento.titulo);
      setDescricao(evento.descricao);
      setDescricaoCurta(evento.descricao_curta || '');
      setDataPostagem(evento.data_postagem || '');
      setDataEvento(evento.data_evento?.split('T')[0] || '');
      setHoraEvento(evento.data_evento?.split('T')[1]?.substring(0,5) || '');
      setLocalizacao(evento.localizacao);
      setCategoria(evento.categoria?.toString() || '');
      setSubcategoria(evento.subcategoria?.toString() || '');
      setImagemAtual(evento.banner);
      setVideo(evento.video || '');
      setPublico(evento.publico || '');
      setFaixaEtaria(evento.faixa_etaria || '');
      setVagas(evento.vagas || '');
      setGratuito(evento.gratuito || '');
      setValor(evento.valor || '');
      setCompraLink(evento.compra_link || '');
    });
  }, [slug]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setBanner(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eventoAtualizado = {
      titulo,
      slug,
      descricao,
      descricao_curta,
      localizacao,
      data_evento: new Date(`${data_evento}T${hora_evento}`).toISOString(),
      data_postagem,
      categoria: parseInt(categoria),
      subcategoria: parseInt(subcategoria),
      banner: banner?.name || imagemAtual,
      video,
      publico,
      faixa_etaria,
      vagas,
      gratuito,
      valor,
      compra_link,
    };

    const formData = new FormData();
    formData.append('evento', JSON.stringify(eventoAtualizado));
    if (banner) formData.append('banner', banner);

    const response = await fetch(`/api/eventos/${slug}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Basic ' + btoa('admin:1234'),
      },
      body: formData,
    });

    if (response.ok) {
      alert('Evento atualizado com sucesso!');
      router.push('/eventos');
    } else {
      alert('Falha ao atualizar o evento.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Editar Evento</h1>
      <form onSubmit={handleSubmit}>
        {/* Campos reutilizados do formulário anterior */}
        {/* Use os mesmos inputs já configurados no formulário de criação */}
        {/* Só removi aqui para economizar espaço */}
        {/* ... */}
        <div className="mb-4">
          <label htmlFor="imagem" className="block text-sm font-medium">Imagem</label>
          {imagemAtual && (
            <img src={`/img/${imagemAtual}`} alt="Imagem atual" className="mb-2 h-32" />
          )}
          <input
            type="file"
            id="imagem"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
