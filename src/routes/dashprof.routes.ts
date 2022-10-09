import { Router } from 'express'
import * as profController from '../controllers/dashprofController'
import {authenticateProfessor} from '../middlewares/authentication'

const profRoutes = Router();

profRoutes.post('/solicitacoes',authenticateProfessor, profController.getSolicitacoes)
profRoutes.put('/solicitacoes/aprovar',authenticateProfessor, profController.aprovaSolicitacoes)
profRoutes.put('/solicitacoes/reprovar',authenticateProfessor, profController.reprovaSolicitacoes)

profRoutes.post('/aberturamonitoria',authenticateProfessor, profController.getVagas)
profRoutes.put('/aberturamonitoria/aprovar',authenticateProfessor, profController.aprovaVaga)
profRoutes.delete('/aberturamonitoria/remover',authenticateProfessor, profController.removeVaga)

profRoutes.post('/monitorias',authenticateProfessor, profController.getMonitorias)

export default profRoutes;