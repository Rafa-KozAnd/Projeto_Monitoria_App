const express = require('express');

const app = express();

const prof = require('./routes/dashprof');
const cord = require('./routes/dashcord');
const login = require('./routes/login');
const alunos = require('./routes/')

app.use('/dashboard/dashprof', prof)
app.use('/dashboard/dashcord', cord)
app.use('/dashboard/', login)

//ALUNOS MONITORES
app.use('/aluno/vagasmonitoria ',func)
app.use('/aluno/monitor/minhasmonitorias ',func)
app.use('/aluno/monitor/agendamento/monitoria ',func)
app.use('/aluno/monitor/agendamento/solicitacao/finalizar ',func) //PUT
app.use('/aluno/monitor/agendamento/remover ',func) // DELETE
app.use('/aluno/monitor/agendamentos ',func)
app.use('/aluno/perfil ',func)

//ALUNO NAO MONITOR 

app.use('/aluno/monitorias ',func)
app.use('/aluno/monitoria ',func)
app.use('/aluno/agendar/monitoria ',func) //POST
app.use('/aluno/solicitar/vaga/monitoria ',func) //POST

app.all('*', (req, res) => {
    res.status(404).send('perdido?')
})

// localhost:5000
app.listen(5000);