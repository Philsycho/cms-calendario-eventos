import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const evento = JSON.parse(formData.get('evento') as string);
    const imagem = formData.get('imagem') as File;

    // Caminho correto para o arquivo de eventos
    const eventosFilePath = path.join(process.cwd(), 'src/data/eventos.ts');

    // Salvar a imagem na pasta public/img
    const imagemPath = path.join(process.cwd(), 'public/img', imagem.name);
    const buffer = Buffer.from(await imagem.arrayBuffer());
    fs.writeFileSync(imagemPath, buffer);

    // Ler o arquivo eventos.ts e adicionar o novo evento
    let eventos = [];
    try {
      const eventosFile = fs.readFileSync(eventosFilePath, 'utf-8');
      eventos = eval(eventosFile.replace('export const eventos = ', ''));
    } catch (error) {
      console.error('Erro ao ler o arquivo eventos.ts', error);
      return NextResponse.json({ error: 'Erro ao ler o arquivo de eventos.' }, { status: 500 });
    }

    // Adiciona o novo evento
    eventos.push(evento);

    // Escrever os novos dados de volta no arquivo
    const eventosData = `export const eventos = ${JSON.stringify(eventos, null, 2)};`;
    fs.writeFileSync(eventosFilePath, eventosData);

    return NextResponse.json({ message: 'Evento criado com sucesso!' }, { status: 200 });

  } catch (error) {
    console.error('Erro ao processar o evento:', error);
    return NextResponse.json({ error: 'Erro ao criar o evento.' }, { status: 500 });
  }
}
