import { Router } from 'express'
import  * as factoryController from '../controllers/factoryController'

const factoryRoutes = Router()

factoryRoutes.post('/aluno', factoryController.createAluno)

export default factoryRoutes;