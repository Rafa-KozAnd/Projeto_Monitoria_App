
const express = require('express')
const router = express.Router()

const {
    getVagasMonitoria,
    getMinhasMonitorias,
    getAgendamentoMonitoria,
    finalizarSolicitacaoAgentamento,
    removerAgendamento,
    getAgendamentos,
    getPerfil
} = require('../controllers/monitor')

router.use('/aluno/vagasmonitoria',getVagasMonitoria)
router.use('/aluno/monitor/minhasmonitorias',getMinhasMonitorias)
router.use('/aluno/monitor/agendamento/monitoria',getAgendamentoMonitoria)
router.use('/aluno/monitor/agendamento/solicitacao/finalizar',finalizarSolicitacaoAgentamento) //PUT
router.use('/aluno/monitor/agendamento/remover',removerAgendamento) // DELETE
router.use('/aluno/monitor/agendamentos',getAgendamentos)
router.use('/aluno/perfil',getPerfil)