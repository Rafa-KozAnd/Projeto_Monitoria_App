import { Router } from 'express'
import * as authController from '../controllers/authController'
const authRoutes = Router()


authRoutes.post('/login/aluno', authController.alunoLogin)
authRoutes.post('/login/colaborador', authController.colaboradorLogin)
authRoutes.post('/refresh', authController.refresh)
authRoutes.get('/me', authController.me)

export default authRoutes;