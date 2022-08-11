import { Router } from 'express'
import  * as alunos from '../controllers/aluno'

const router = Router()


router.get('/vagasmonitoria', alunos.getVagasMonitoria)
router.get('/monitor/minhasmonitorias', alunos.getMinhasMonitorias)
router.get('/monitor/agendamento/monitoria', alunos.getAgendamentoMonitoria)
router.put('/monitor/agendamento/solicitacao/finalizar', alunos.finalizarSolicitacaoAgentamento) //PUT
router.delete('/monitor/agendamento/remover', alunos.removerAgendamento) // DELETE
router.get('/monitor/agendamentos', alunos.getAgendamentos)
router.get('/perfil', alunos.getPerfil)
router.get('/monitorias', alunos.getMonitorias)
router.get('/monitoria', alunos.getMonitoria)
router.post('/agendar/monitoria', alunos.agendarMonitoria) //post
router.post('/solicitar/vaga/monitoria', alunos.solicitarVagaMonitoria) //post

export default router;