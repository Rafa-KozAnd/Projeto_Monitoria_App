import * as coordController from '../controllers/dashcordController'
import { Router } from 'express'

const coordRoutes = Router()

coordRoutes.get('/solicitacoes', coordController.getSolicitacoes)
coordRoutes.put('/solicitacoes/aprovar', coordController.aprovaSolicitacoes)
coordRoutes.put('/solicitacoes/reprovar', coordController.reprovaSolicitacoes)
coordRoutes.delete("/:id", coordController.deleteSolicitacoes)
coordRoutes.get("/solicitacoes/pendentes", coordController.getSolicitacoesPendentes)

export default coordRoutes;