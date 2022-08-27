import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import {hash, compare } from 'bcryptjs';
//Rotas
import authRoutes from './routes/auth.routes';
import alunoRoutes from './routes/alunos.routes';
import coordRoutes from './routes/dashcoord.routes';
import profRoutes from './routes/dashprof.routes';
import facrotyRoutes from './routes/factory.routes';
import { client } from '../prisma/client';

dotenv.config()
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/professor', profRoutes);
app.use('/aluno', alunoRoutes);
app.use('/coordenador', coordRoutes);
app.use('/auth', authRoutes);
app.use('/factory', facrotyRoutes);

app.get('/', (req, res) => {
  res.send('Essa é a API do Projeto Monitoria.')
})

app.post('/create', async (req, res) => {
  const { cpf, nome, email, senha, role } = req.body;
  try {
    const senhaHash = await hash(senha, 8);
    await client.colaborador.create({
      data: {
        cpf,
        nome,
        email,
        senha: senhaHash,
        role,
      }
    });
    console.log(`Usuario ${cpf} criado com sucesso`);
    res.send('Usuário criado com sucesso!');

  } catch (error) {
    console.log("blubluyeyeyeyeye")
    console.log(error); 
    res.send("error")
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})