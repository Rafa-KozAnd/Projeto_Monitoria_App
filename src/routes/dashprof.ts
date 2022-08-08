import { Router } from 'express'
const router = Router()

import { getSolicitacoes, aprovaSolicitacoes, reprovaSolicitacoes, getVagas, aprovaVaga, removeVaga, getMonitorias } from '../controllers/dashprof'


router.get('/solicitacoes', getSolicitacoes)
router.put('/solicitacoes/aprovar', aprovaSolicitacoes)
router.put('/solicitacoes/reprovar', reprovaSolicitacoes)

router.get('/aberturamonitoria', getVagas)
router.put('/aberturamonitoria/aprovar', aprovaVaga)
router.delete('/aberturamonitoria/remover', removeVaga)

router.get('/monitorias', getMonitorias)

export default router;