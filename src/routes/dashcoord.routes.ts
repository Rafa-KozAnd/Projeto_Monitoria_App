import * as coordController from '../controllers/dashcordController'
import { Router } from 'express'
import {authenticateAluno} from '../middlewares/authentication'

const coordRoutes = Router()

coordRoutes.get('/solicitacoes',authenticateAluno, coordController.getSolicitacoes)
coordRoutes.put('/solicitacoes/aprovar',authenticateAluno, coordController.aprovaSolicitacoes)
coordRoutes.put('/solicitacoes/reprovar',authenticateAluno, coordController.reprovaSolicitacoes)
coordRoutes.delete("/:id",authenticateAluno, coordController.deleteSolicitacoes)
coordRoutes.get("/solicitacoes/pendentes",authenticateAluno, coordController.getSolicitacoesPendentes)

export default coordRoutes;