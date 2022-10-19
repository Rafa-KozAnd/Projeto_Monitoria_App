import { Router } from 'express'
import * as profController from '../controllers/dashprofController'
import {authenticate} from '../middlewares/authentication'

const profRoutes = Router();

profRoutes.post('/solicitacoes',authenticate, profController.getSolicitacoes)
profRoutes.put('/solicitacoes/aprovar',authenticate, profController.aprovaSolicitacoes)
profRoutes.put('/solicitacoes/reprovar',authenticate, profController.reprovaSolicitacoes)

profRoutes.post('/aberturamonitoria',authenticate, profController.getVagas)
profRoutes.post('/abrirmonitoria',authenticate, profController.abrirVaga)
profRoutes.put('/aberturamonitoria/aprovar',authenticate, profController.aprovaVaga)
profRoutes.delete('/aberturamonitoria/remover',authenticate, profController.removeVaga)

profRoutes.post('/monitorias',authenticate, profController.getMonitorias)

export default profRoutes;