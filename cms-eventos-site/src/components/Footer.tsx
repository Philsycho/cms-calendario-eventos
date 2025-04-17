export default function Footer() {
    return (
      <footer className="bg-black text-sm mt-10 py-6 px-[5%]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Mapa do Site</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Eventos</a></li>
              <li><a href="#">Contato</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Redes Sociais</h4>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contato</h4>
            <p>Email: contato@eventos.com.br</p>
            <p>Endereço: Av. Principal, 123 - Centro</p>
          </div>
        </div>
      </footer>
    );
  }
  