import { Router } from 'express'
import * as profController from '../controllers/dashprofController'
import {authenticaColaborador} from '../middlewares/authentication'

const profRoutes = Router();

profRoutes.post('/solicitacoes',authenticaColaborador, profController.getSolicitacoes)
profRoutes.put('/solicitacoes/aprovar',authenticaColaborador, profController.aprovaSolicitacoes)
profRoutes.put('/solicitacoes/reprovar',authenticaColaborador, profController.reprovaSolicitacoes)

profRoutes.post('/aberturamonitoria',authenticaColaborador, profController.getVagas)
profRoutes.post('/abrirmonitoria',authenticaColaborador, profController.abrirVaga)
profRoutes.put('/aberturamonitoria/aprovar',authenticaColaborador, profController.aprovaVaga)
profRoutes.delete('/aberturamonitoria/remover',authenticaColaborador, profController.removeVaga)

profRoutes.delete('/excluimonitor', authenticaColaborador, profController.excluiMonitor)

profRoutes.post('/monitorias',authenticaColaborador, profController.getMonitorias)

export default profRoutes;