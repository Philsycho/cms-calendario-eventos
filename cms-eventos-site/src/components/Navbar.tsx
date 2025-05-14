export default function Navbar() {
  return (
    <header className="flex text-white justify-between items-center px-6 py-4 bg-black shadow-md px-[8%]">
      <nav className="flex gap-6 text-sm font-medium">
        {/* Usando o Link do Next.js para a navegação */}
        <a href="/">
          Home
        </a>
        <a href="/eventos">
          Eventos
        </a>
        <a href="#">Comunidade</a>
        <a href="#">Sobre</a>
        <a href="#">Contato</a>
      </nav>
      <div className="flex gap-4">
        <a href="/postar">
          <button className="text-sm px-4 py-2 border rounded cursor-pointer">Postar</button>
        </a>
        <button className="text-sm px-4 py-2 border rounded cursor-pointer">Entrar</button>
        <button className="text-sm px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">Registrar</button>
      </div>
    </header>
  );
}
