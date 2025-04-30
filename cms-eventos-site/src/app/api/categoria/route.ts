import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const USERNAME = 'admin';
const PASSWORD = '1234';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/app/data/categoria.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const categorias = JSON.parse(data);

    return NextResponse.json(categorias);
  } catch (error) {
    console.error("Erro ao ler categorias:", error);
    return NextResponse.json({ error: "Erro ao ler categorias." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const [user, pass] = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  if (user !== USERNAME || pass !== PASSWORD) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { desc_categoria } = await req.json();

    const filePath = path.join(process.cwd(), 'src/app/data/categoria.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const categorias = JSON.parse(data);

    const novaCategoria = {
      id_categoria: categorias.length > 0 ? categorias[categorias.length - 1].id_categoria + 1 : 1,
      desc_categoria
    };

    categorias.push(novaCategoria);
    fs.writeFileSync(filePath, JSON.stringify(categorias, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Categoria criada com sucesso!' });
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return NextResponse.json({ error: 'Erro ao criar categoria.' }, { status: 500 });
  }
}
