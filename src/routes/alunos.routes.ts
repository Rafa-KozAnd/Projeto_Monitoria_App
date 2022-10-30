import { Router } from 'express'
import  * as alunos from '../controllers/alunoController'
import {authenticateAluno} from '../middlewares/authentication'
const alunoRoutes = Router()

alunoRoutes.get('/vagasmonitoria', authenticateAluno ,alunos.getVagasMonitoria)
alunoRoutes.get('/monitor/minhasmonitorias',authenticateAluno, alunos.getMinhasMonitorias)
alunoRoutes.get('/monitor/agendamento/monitoria',authenticateAluno, alunos.getAgendamentoMonitoria)
alunoRoutes.put('/monitor/agendamento/solicitacao/finalizar',authenticateAluno, alunos.finalizarSolicitacaoAgentamento) //PUT
alunoRoutes.delete('/monitor/agendamento/remover',authenticateAluno, alunos.removerAgendamento) // DELETE
alunoRoutes.get('/monitor/agendamentos',authenticateAluno, alunos.getAgendamentos)
alunoRoutes.get('/perfil', authenticateAluno, alunos.getPerfil)
alunoRoutes.get('/monitorias',authenticateAluno, alunos.getMonitorias)
alunoRoutes.get('/monitoria',authenticateAluno, alunos.getMonitoria)
alunoRoutes.post('/agendar/monitoria',authenticateAluno, alunos.agendarMonitoria) //post
alunoRoutes.post('/solicitar/vaga/monitoria',authenticateAluno, alunos.sugerirMonitoria) //post

export default alunoRoutes;