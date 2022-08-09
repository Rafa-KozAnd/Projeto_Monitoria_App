const express = require('express');
import cord from './routes/dashcord';

const app = express();

app.use('/coordenador', cord);

// localhost:5000
app.listen(5000);