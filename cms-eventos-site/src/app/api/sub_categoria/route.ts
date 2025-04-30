import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const USERNAME = 'admin';
const PASSWORD = '1234';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/app/data/sub_categoria.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const subcategorias = JSON.parse(data);

    return NextResponse.json(subcategorias);
  } catch (error) {
    console.error("Erro ao ler subcategorias:", error);
    return NextResponse.json({ error: "Erro ao ler subcategorias." }, { status: 500 });
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
    const { desc_subcategoria, id_categoria } = await req.json();

    const filePath = path.join(process.cwd(), 'src/app/data/sub_categoria.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const subcategorias = JSON.parse(data);

    const novaSub = {
      id_subcategoria: subcategorias.length > 0 ? subcategorias[subcategorias.length - 1].id_subcategoria + 1 : 1,
      id_categoria,
      desc_subcategoria
    };

    subcategorias.push(novaSub);
    fs.writeFileSync(filePath, JSON.stringify(subcategorias, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Subcategoria criada com sucesso!' });
  } catch (error) {
    console.error("Erro ao criar subcategoria:", error);
    return NextResponse.json({ error: 'Erro ao criar subcategoria.' }, { status: 500 });
  }
}
