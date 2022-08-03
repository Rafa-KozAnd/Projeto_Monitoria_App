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

router.get("/", getSolicitacoes)
router.post("/", postSolicitacoes)
router.delete("/:id", deleteSolicitacoes)

router.get("/alunospendentes", getAlunos)
router.post("/alunospendentes", postAlunos)
router.put("/alunospendentes/:id", putAlunos)

module.exports = router