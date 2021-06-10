import express, { Request, Response } from 'express';
import { v4 as uuidGenerator } from 'uuid';
import cors from 'cors';
import dotenv from 'dotenv'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

dotenv.config();

const port = process.env.PORT || 8080;

const alunos: any = [
   { 
    id: uuidGenerator(),
    nome: 'Nei Fernando',
    idade: 32,
    turma: 'AAA',
    cidade: 'Sapucaia'
   },
   {
    id: uuidGenerator(),
    nome: 'Taise ',
    idade: 27,
    turma: 'AAA',
    cidade: 'Canoas'
   } 
];

app.get('/growdevers', (request: Request, response: Response) => {
    const { idade } = request.query;

    const resultado = alunos.filter((aluno: any) => {
        return idade ? aluno.idade == idade : true;
    });

    return response.json(resultado);
});

app.get('/growdevers/:id', (request: Request, response: Response) => {
    const { id } = request.params;

    if (!id) {
        return response.status(400).json({
            mensagem: 'ID inválido'
        });
    }

    const growdever = alunos.find((aluno: any) => aluno.id == id);

    if (!growdever) {
        return response.status(404).json({
            mensagem: 'Aluno não encontrado'
        });
    }

    return response.json(growdever);
});

app.post('/growdevers', (request: Request, response: Response) => {
    const { nome, turma, idade, cidade } = request.body;

    if (!nome || !turma || !idade || !cidade) {
        return response.status(400).json({
            mensagem: 'Dados inválidos'
        });
    }

    const growdever = {
        id: uuidGenerator(),
        nome,
        idade,
        turma,
        cidade
    };

    alunos.push(growdever);

    return response.json(growdever);
});

app.put('/growdevers/:id', (request: Request, response: Response) => {
    const { nome, turma, idade, cidade } = request.body;
    const { id } = request.params;

    if (!nome || !turma || !idade || !cidade || !id) {
        return response.status(400).json({
            mensagem: 'Dados inválidos'
        });
    }

    const index = alunos.findIndex((aluno: any) => aluno.id == id);

    if (index < 0) {
        return response.status(404).json({
            mensagem: 'Aluno não encontrado'
        });
    }

    alunos[index] = {
        id,
        nome, 
        turma,
        idade,
        cidade
    };

    return response.json(alunos[index]);
});

app.delete('/growdevers/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    // Code here
});

app.listen(port, () => {
    console.log('API rodando...');
});