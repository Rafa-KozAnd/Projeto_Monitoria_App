import { Router } from 'express'
import  * as alunos from '../controllers/aluno'

const router = Router()


router.get('/aluno/vagasmonitoria', alunos.getVagasMonitoria)
router.get('/aluno/monitor/minhasmonitorias', alunos.getMinhasMonitorias)
router.get('/aluno/monitor/agendamento/monitoria', alunos.getAgendamentoMonitoria)
router.put('/aluno/monitor/agendamento/solicitacao/finalizar', alunos.finalizarSolicitacaoAgentamento) //PUT
router.delete('/aluno/monitor/agendamento/remover', alunos.removerAgendamento) // DELETE
router.get('/aluno/monitor/agendamentos', alunos.getAgendamentos)
router.get('/aluno/perfil', alunos.getPerfil)
router.get('/aluno/monitorias', alunos.getMonitorias)
router.get('/aluno/monitoria', alunos.getMonitoria)
router.post('/aluno/agendar/monitoria', alunos.agendarMonitoria) //post
router.post('/aluno/solicitar/vaga/monitoria', alunos.solicitarVagaMonitoria) //post

export default router;