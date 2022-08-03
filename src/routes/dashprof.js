const express = require('express')
const router = express.Router()

const {
    getSolicitacoes,
    postSolicitacoes,
    deleteSolicitacoes,
    getMonitores,
    postMonitores,
    putMonitores,
    deleteMonitores,
    getAbrirVaga,
    postAbrirVaga
} = require('../controllers/dashprof')


router.get('/', getSolicitacoes)
router.post('/', postSolicitacoes)
router.delete('/:id', deleteSolicitacoes)

router.get('/meusmonitores', getMonitores)
router.post('/meusmonitores', postMonitores)
router.put('/meusmonitores/:id', putMonitores)
router.delete('/meusmonitores/:id', deleteMonitores)

router.get('/abrirvaga', getAbrirVaga)
router.post('/abrirvaga', postAbrirVaga)

module.exports = router