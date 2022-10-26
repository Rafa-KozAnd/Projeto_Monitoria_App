import { Router } from 'express'
import  * as alunos from '../controllers/alunoController'
import {authenticate} from '../middlewares/authentication'
const alunoRoutes = Router()

alunoRoutes.get('/vagasmonitoria', authenticate ,alunos.getVagasMonitoria)
alunoRoutes.get('/monitor/minhasmonitorias',authenticate, alunos.getMinhasMonitorias)
alunoRoutes.get('/monitor/agendamento/monitoria',authenticate, alunos.getAgendamentoMonitoria)
alunoRoutes.put('/monitor/agendamento/solicitacao/finalizar',authenticate, alunos.finalizarSolicitacaoAgentamento) //PUT
alunoRoutes.delete('/monitor/agendamento/remover',authenticate, alunos.removerAgendamento) // DELETE
alunoRoutes.get('/monitor/agendamentos',authenticate, alunos.getAgendamentos)
alunoRoutes.get('/perfil', authenticate, alunos.getPerfil)
alunoRoutes.get('/monitorias',authenticate, alunos.getMonitorias)
alunoRoutes.get('/monitoria',authenticate, alunos.getMonitoria)
alunoRoutes.post('/agendar/monitoria',authenticate, alunos.agendarMonitoria) //post
alunoRoutes.post('/solicitar/vaga/monitoria',authenticate, alunos.sugerirMonitoria) //post

export default alunoRoutes;