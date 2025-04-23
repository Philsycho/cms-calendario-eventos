import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const USERNAME = 'admin';
const PASSWORD = '1234';

export async function GET() {
  try {
    const eventosFilePath = path.join(process.cwd(), 'src/app/data/eventos.json');
    const data = fs.readFileSync(eventosFilePath, 'utf-8');
    const eventos = JSON.parse(data);

    return NextResponse.json(eventos);
  } catch (error) {
    console.error("Erro ao ler o arquivo de eventos:", error);
    return NextResponse.json({ error: "Erro ao ler os eventos." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8').split(':');
  const [user, pass] = credentials;

  if (user !== USERNAME || pass !== PASSWORD) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const formData = await req.formData();
    const eventoStr = formData.get("evento") as string;
    const imagem = formData.get("imagem") as File | null;

    const evento = JSON.parse(eventoStr);

    const eventosFilePath = path.join(process.cwd(), 'src/app/data/eventos.json');
    const eventosData = fs.readFileSync(eventosFilePath, 'utf-8');
    const eventos = JSON.parse(eventosData);

    const novoId = eventos.length > 0 ? eventos[eventos.length - 1].id + 1 : 1;
    const slug = evento.titulo
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');

    const imgDir = path.join(process.cwd(), 'public', 'img');
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }

    let imagemPath = '';
    if (imagem) {
      const buffer = Buffer.from(await imagem.arrayBuffer());
      const nomeArquivo = `${uuidv4()}_${imagem.name}`;
      const filePath = path.join(imgDir, nomeArquivo);
      await writeFile(filePath, buffer);
      imagemPath = `/img/${nomeArquivo}`;
    }

    const novoEvento = {
      id: novoId,
      titulo: evento.titulo,
      slug,
      descricao: evento.descricao,
      data: evento.data,
      localizacao: evento.localizacao,
      imagem: imagemPath,
    };

    eventos.push(novoEvento);
    fs.writeFileSync(eventosFilePath, JSON.stringify(eventos, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Evento criado com sucesso!' }, { status: 200 });

  } catch (error) {
    console.error('Erro ao processar o evento:', error);
    return NextResponse.json({ error: 'Erro ao criar o evento.' }, { status: 500 });
  }
}
