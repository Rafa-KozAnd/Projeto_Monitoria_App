import { Router } from 'express'
import  * as alunos from '../controllers/alunoController'

const alunoRoutes = Router()

alunoRoutes.get('/vagasmonitoria', alunos.getVagasMonitoria)
alunoRoutes.get('/monitor/minhasmonitorias', alunos.getMinhasMonitorias)
alunoRoutes.get('/monitor/agendamento/monitoria', alunos.getAgendamentoMonitoria)
alunoRoutes.put('/monitor/agendamento/solicitacao/finalizar', alunos.finalizarSolicitacaoAgentamento) //PUT
alunoRoutes.delete('/monitor/agendamento/remover', alunos.removerAgendamento) // DELETE
alunoRoutes.get('/monitor/agendamentos', alunos.getAgendamentos)
alunoRoutes.get('/perfil', alunos.getPerfil)
alunoRoutes.get('/monitorias', alunos.getMonitorias)
alunoRoutes.get('/monitoria', alunos.getMonitoria)
alunoRoutes.post('/agendar/monitoria', alunos.agendarMonitoria) //post
alunoRoutes.post('/solicitar/vaga/monitoria', alunos.solicitarVagaMonitoria) //post

export default alunoRoutes;