import express from 'express';
import prof from './routes/dashprof';

const app = express();


app.use('/professor', prof);


// localhost:5000
app.listen(5000);