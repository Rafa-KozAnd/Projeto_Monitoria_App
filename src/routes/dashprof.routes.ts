import { Router } from 'express'
import * as profController from '../controllers/dashprofController'

const profRoutes = Router();

profRoutes.get('/solicitacoes', profController.getSolicitacoes)
profRoutes.put('/solicitacoes/aprovar', profController.aprovaSolicitacoes)
profRoutes.put('/solicitacoes/reprovar', profController.reprovaSolicitacoes)

profRoutes.get('/aberturamonitoria', profController.getVagas)
profRoutes.put('/aberturamonitoria/aprovar', profController.aprovaVaga)
profRoutes.delete('/aberturamonitoria/remover', profController.removeVaga)

profRoutes.get('/monitorias', profController.getMonitorias)

export default profRoutes;