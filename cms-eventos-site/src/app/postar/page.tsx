// src/app/postar/page.tsx
'use client';
import { useState } from 'react';

export default function Postar() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [data, setData] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImagem(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Criando o evento com os dados do formulário
    const evento = {
      titulo,
      descricao,
      localizacao,
      data,
      imagem: imagem?.name || ''
    };

    // Enviar os dados do evento para o backend para salvar
    const formData = new FormData();
    formData.append('evento', JSON.stringify(evento));
    if (imagem) formData.append('imagem', imagem);

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
          <label htmlFor="data" className="block text-sm font-medium">Data</label>
          <input
            type="date"
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imagem" className="block text-sm font-medium">Imagem</label>
          <input
            type="file"
            id="imagem"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded">
          Publicar Evento
        </button>
      </form>
    </div>
  );
}
