import * as coordController from '../controllers/dashcordController'
import { Router } from 'express'
import {authenticate} from '../middlewares/authentication'

const coordRoutes = Router()

coordRoutes.get('/solicitacoes',authenticate, coordController.getSolicitacoes)
coordRoutes.put('/solicitacoes/aprovar',authenticate, coordController.aprovaSolicitacoes)
coordRoutes.put('/solicitacoes/reprovar',authenticate, coordController.reprovaSolicitacoes)
coordRoutes.delete("/:id",authenticate, coordController.deleteSolicitacoes)
coordRoutes.get("/solicitacoes/pendentes",authenticate, coordController.getSolicitacoesPendentes)

export default coordRoutes;