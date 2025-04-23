import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const USERNAME = 'admin';
const PASSWORD = '1234';

/*export async function GET(req: Request){
  const authHeader = req.headers.get('authorization');

}*/

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
    const evento = JSON.parse(formData.get('evento') as string);

    const eventosFilePath = path.join(process.cwd(), 'src/app/data/eventos.ts');

    const eventosFile = fs.readFileSync(eventosFilePath, 'utf-8');
    let eventos = eval(eventosFile.replace('export const eventos = ', ''));

    eventos.push(evento);

    const eventosData = `export const eventos = ${JSON.stringify(eventos, null, 2)};`;
    fs.writeFileSync(eventosFilePath, eventosData);

    return NextResponse.json({ message: 'Evento criado com sucesso!' }, { status: 200 });

  } catch (error) {
    console.error('Erro ao processar o evento:', error);
    return NextResponse.json({ error: 'Erro ao criar o evento.' }, { status: 500 });
  }
}

console.log("Credenciais recebidas:", USERNAME, PASSWORD);
