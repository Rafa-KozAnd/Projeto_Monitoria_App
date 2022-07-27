const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send("Projeto Monitoria Aplicação")
});

app.get("/aluno", (req, res) => {
    res.send("Login Aluno")
});

app.get("/aluno/perfil", (req, res) => {
    res.send("Perfil Aluno")
});

app.get("/aluno/solicitacao", (req, res) => {
    res.send("Solicitação Aluno")
});

app.get("/aluno/monitoria", (req, res) => {
    res.send("Monitoria Aluno")
});

app.get('/monitor', (req, res) => {
    res.send("Login Monitor")
});

app.get('/monitor/perfil', (req, res) => {
    res.send("Perfil Monitor")
});

app.get('/monitor/disciplinas', (req, res) => {
    res.send("Disciplinas Monitor")
});

app.get('/monitor/solicitacao', (req, res) => {
    res.send("Solicitação Monitor")
});





// localhost:5000
app.listen(5000, ()=> {console.log("Aplicação Online!")});