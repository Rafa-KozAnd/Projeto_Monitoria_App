
const express = require('express')
const router = express.Router()

const {
    getVagasMonitoria,
    getMinhasMonitorias,
    getAgendamentoMonitoria,
    finalizarSolicitacaoAgentamento,
    removerAgendamento,
    getAgendamentos,
    getPerfil,
    getMonitorias,
    getMonitoria,
    agendarMonitoria,
    solicitarVagaMonitoria
} = require('../controllers/aluno')

router.get('/aluno/vagasmonitoria',getVagasMonitoria)
router.get('/aluno/monitor/minhasmonitorias',getMinhasMonitorias)
router.get('/aluno/monitor/agendamento/monitoria',getAgendamentoMonitoria)
router.put('/aluno/monitor/agendamento/solicitacao/finalizar',finalizarSolicitacaoAgentamento) //PUT
router.delete('/aluno/monitor/agendamento/remover',removerAgendamento) // DELETE
router.get('/aluno/monitor/agendamentos',getAgendamentos)
router.get('/aluno/perfil',getPerfil)
router.get('/aluno/monitorias', getMonitorias)
router.get('/aluno/monitoria', getMonitoria)
router.post('/aluno/agendar/monitoria', agendarMonitoria) //post
router.post('/aluno/solicitar/vaga/monitoria', solicitarVagaMonitoria) //post

module.exports = router