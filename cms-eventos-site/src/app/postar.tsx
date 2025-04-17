import { useState } from "react";

export default function PostarEvento() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("data", data);
    formData.append("localizacao", localizacao);
    if (imagem) {
      formData.append("imagem", imagem);
    }

    // Aqui você faria a requisição para o backend para salvar os dados
    fetch("/api/postar-evento", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Redirecionar ou mostrar sucesso
      })
      .catch((error) => {
        console.error("Erro ao postar evento:", error);
      });
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Postar Novo Evento</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            id="descricao"
            name="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="data" className="block text-sm font-medium text-gray-700">
            Data do Evento
          </label>
          <input
            type="datetime-local"
            id="data"
            name="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700">
            Localização
          </label>
          <input
            type="text"
            id="localizacao"
            name="localizacao"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="imagem" className="block text-sm font-medium text-gray-700">
            Imagem
          </label>
          <input
            type="file"
            id="imagem"
            name="imagem"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files ? e.target.files[0] : null)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md"
        >
          Postar Evento
        </button>
      </form>
    </main>
  );
}
