import { Router } from 'express'
import * as authController from '../controllers/authController'
const authRoutes = Router()


authRoutes.post('/login/aluno', authController.alunoLogin)
authRoutes.post('/login/colaborador', authController.colaboradorLogin)

export default authRoutes;