import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

//Rotas
import authRoutes from './routes/auth.routes';
import alunoRoutes from './routes/alunos.routes';
import coordRoutes from './routes/dashcoord.routes';
import profRoutes from './routes/dashprof.routes';

dotenv.config()
const app = express();

app.use(cors());

app.use('/professor', profRoutes);
app.use('/aluno', alunoRoutes);
app.use('/coordenador', coordRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Essa é a API do Projeto Monitoria.')
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})