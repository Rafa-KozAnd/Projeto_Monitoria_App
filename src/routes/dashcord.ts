const { Router } = require('express')
const router = Router()

import { getSolicitacoes, aprovaSolicitacoes, reprovaSolicitacoes, deleteSolicitacoes, getSolicitacoesPendentes } from '../controllers/dashcord'

router.get('/solicitacoes', getSolicitacoes)
router.put('/solicitacoes/aprovar', aprovaSolicitacoes)
router.put('/solicitacoes/reprovar', reprovaSolicitacoes)
router.delete("/:id", deleteSolicitacoes)
router.get("/solicitacoes/pendentes", getSolicitacoesPendentes)

export default router;