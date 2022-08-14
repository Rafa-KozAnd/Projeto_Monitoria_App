import { Router } from 'express'
import * as authController from '../controllers/authController'
const authRoutes = Router()


authRoutes.post('/login', authController.logIn)

export default authRoutes;