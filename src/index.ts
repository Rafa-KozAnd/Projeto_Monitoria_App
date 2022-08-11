import express from 'express';
import prof from './routes/dashprof';
import alunos from './routes/alunos';
import cord from './routes/dashcord';

const app = express();
let port = 5000

app.use('/professor', prof);
app.use('/aluno', alunos);
app.use('/coordenador', cord);


// localhost:5000
app.listen(port, () => {
    console.log(` App listening on port ${port}`)
  })