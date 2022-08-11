import express from 'express';
import prof from './routes/dashprof';
import cord from './routes/dashcord';

const app = express();
let port = 5000

app.use('/professor', prof);
app.use('/coordenador', cord);


// localhost:5000
app.listen(port, () => {
    console.log(` App listening on port ${port}`)
  })