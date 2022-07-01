const express = require('express');

const app = express();

app.get("/", (req, res) => res.send("Página Inicial - Teste"));

// localhost:5000
app.listen(5000);