import * as coordController from '../controllers/dashcordController'
import { Router } from 'express'
import {authenticaColaborador} from '../middlewares/authentication'

const coordRoutes = Router()

coordRoutes.post('/solicitacoes',authenticaColaborador, coordController.getSolicitacoes)
coordRoutes.put('/solicitacoes/aprovar',authenticaColaborador, coordController.aprovaSolicitacoes)
coordRoutes.put('/solicitacoes/reprovar',authenticaColaborador, coordController.reprovaSolicitacoes)
coordRoutes.delete("/:id",authenticaColaborador, coordController.deleteSolicitacoes)
coordRoutes.post("/solicitacoes/pendentes",authenticaColaborador, coordController.getSolicitacoesPendentes)

export default coordRoutes;