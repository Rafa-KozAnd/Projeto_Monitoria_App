
const express = require('express')
const router = express.Router()

const {
    getSolicitacoes,
    postSolicitacoes,
    deleteSolicitacoes,
    getAlunos,
    postAlunos,
    putAlunos
} = require('../controllers/dashcord')

router.use('/aluno/vagasmonitoria',func)
router.use('/aluno/monitor/minhasmonitorias',func)
router.use('/aluno/monitor/agendamento/monitoria',func)
router.use('/aluno/monitor/agendamento/solicitacao/finalizar',func) //PUT
router.use('/aluno/monitor/agendamento/remover',func) // DELETE
router.use('/aluno/monitor/agendamentos',func)
router.use('/aluno/perfil',func)