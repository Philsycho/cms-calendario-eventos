export default function Navbar() {
    return (
      <header className="flex justify-between items-center px-6 py-4 bg-black shadow-md px-[5%]">
        <nav className="flex gap-6 text-sm font-medium ">
          <a href="#">Home</a>
          <a href="#">Eventos</a>
          <a href="#">Comunidade</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
        </nav>
        <div className="flex gap-4">
          <button className="text-sm px-4 py-2 border rounded">Entrar</button>
          <button className="text-sm px-4 py-2 bg-blue-600 text-white rounded">Registrar</button>
        </div>
      </header>
    );
  }
  