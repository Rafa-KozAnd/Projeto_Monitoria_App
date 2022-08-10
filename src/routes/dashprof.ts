import { Router } from 'express'
const router = Router()

import * as prof from '../controllers/dashprof'


router.get('/solicitacoes', prof.getSolicitacoes)
router.put('/solicitacoes/aprovar', prof.aprovaSolicitacoes)
router.put('/solicitacoes/reprovar', prof.reprovaSolicitacoes)

router.get('/aberturamonitoria', prof.getVagas)
router.put('/aberturamonitoria/aprovar', prof.aprovaVaga)
router.delete('/aberturamonitoria/remover', prof.removeVaga)

router.get('/monitorias', prof.getMonitorias)

export default router;