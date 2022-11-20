import { Router } from 'express'
import  * as alunos from '../controllers/alunoController'
import {authenticateAluno} from '../middlewares/authentication'
const alunoRoutes = Router()

alunoRoutes.post('/monitor/prerequisitos', alunos.getPreRequisitos)
alunoRoutes.get('/vagasmonitoria', authenticateAluno ,alunos.getVagasMonitoria)
alunoRoutes.post('/vagasmonitoria/candidatar',authenticateAluno, alunos.postVagaCandidatar)
alunoRoutes.get('/monitor/minhasmonitorias',authenticateAluno, alunos.getMinhasMonitorias)
alunoRoutes.get('/agendamento/monitoria',authenticateAluno, alunos.getAgendamentoMonitoriaAluno)
alunoRoutes.get('/monitor/agendamento/:id_monitoria',authenticateAluno, alunos.getAgendamentoMonitoriaMonitor)
alunoRoutes.put('/monitor/agendamento/aprovar',authenticateAluno, alunos.aprovarSolicitacaoAgentamento)
alunoRoutes.put('/monitor/agendamento/cancelar',authenticateAluno, alunos.cancelarAgendamento)
alunoRoutes.get('/agendamento/horarios/:id_monitoria',authenticateAluno, alunos.getHorariosDisponiveis)
alunoRoutes.get('/monitor/agendamentos',authenticateAluno, alunos.getAgendamentos)
alunoRoutes.get('/agendamentos',authenticateAluno, alunos.getAgendamentosAluno)
alunoRoutes.post('/perfil', authenticateAluno, alunos.getPerfil)
alunoRoutes.get('/monitorias',authenticateAluno, alunos.getMonitorias)
alunoRoutes.post('/monitoria',authenticateAluno, alunos.getMonitoria)
alunoRoutes.post('/agendar/monitoria',authenticateAluno, alunos.agendarMonitoria)
alunoRoutes.post('/solicitar/vaga/monitoria',authenticateAluno, alunos.sugerirMonitoria)
alunoRoutes.post('/candidaturas',authenticateAluno, alunos.getCandidaturas)

export default alunoRoutes;