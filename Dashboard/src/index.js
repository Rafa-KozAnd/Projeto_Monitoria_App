const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send("Projeto Monitoria Dashboard")
});

app.get("/professor", (req, res) => {
    res.send("Login Professor")
});

app.get("/professor/pendentes", (req, res) => {
    res.send("Professor | Pendentes")
});

app.get('/coordenador', (req, res) => {
    res.send("Login Coordenador")
});

app.get('/coordenador/pendentes', (req, res) => {
    res.send("Coordenador | Pendentes")
});

// Rota perfil professor/coordenador ???

// localhost:5500
app.listen(5500, ()=> {console.log("Dashboard Online!")});