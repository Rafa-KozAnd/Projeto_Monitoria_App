import * as express from 'express';
import prof from './routes/dashprof';
import alunos from './routes/alunos';

const app = express();


app.use('/professor', prof);
app.use('/aluno', alunos);


// localhost:5000
app.listen(5000);