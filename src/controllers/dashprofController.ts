import { RequestHandler } from 'express';
import { client } from '../../prisma/client'


const getSolicitacoes: RequestHandler  = async (req, res) => {
    const { cpfProfessor } = req.body;
    
    try {
        const solicitacoesAlunos = await client.vagaAlunoMonitoria.findMany({
            where: {
                VagaMonitoria: {
                    status: 1,
                    professor_requisitante: cpfProfessor
                }
            },
            select: {
                matricula_aluno: true,
                id_vaga: true,
                Aluno: {
                    select: {
                        email: true
                    }
                },
                VagaMonitoria: {
                    select: {
                        Disciplina: {
                            select: {
                                nome: true
                            }
                        }
                    }
                }
            }
        })

        var solicitacoesAlunosJson : any[] = []
        
        for (let solicitacaoAluno of solicitacoesAlunos) {
            solicitacoesAlunosJson.push
            ( {
                "id": solicitacaoAluno.id_vaga,
                "matriculaAluno": solicitacaoAluno.matricula_aluno,
                "disciplinaDesejada": solicitacaoAluno.VagaMonitoria.Disciplina.nome,
                "emailAluno": solicitacaoAluno.Aluno.email
            })
        }

        let solicitacoesAlunosFormat = {"solicitacoes": solicitacoesAlunosJson}
        
        res.status(200).json(solicitacoesAlunosFormat)

    }catch(err) {
        res.status(500).json({message: 'Houve um erro ao tentar pegar os dados, tente novamente mais tarde.'})
    }
}

const aprovaSolicitacoes: RequestHandler = (req, res) => {
    res.status(200).json({id_solicitacao:"gf34sezvoh6"})
}

const reprovaSolicitacoes: RequestHandler = (req, res) => {
    res.status(200).json({comentario:"aluno burro",id_solicitacao: "gf34sezvoh6"})
}


const getVagas: RequestHandler = async (req, res) => {
    const { cpfProfessor } = req.body;

    try {
        const solicitacoesMonitorias = await client.solicitacaoMonitoria.findMany({
            where: {
                status: 0,// verificar significado dos status
                Disciplina: {
                    Colaborador:{
                        cpf: cpfProfessor
                    }
                }
            },
            select: {
                id: true,
                matricula_aluno: true,
                codigo_disciplina: true,
                Disciplina: {
                    select: {
                        nome: true
                    }
                },
                monitorRecomendado: true,
                motivo: true
            }
        })
    
        var solicitacoesMonitoriaJson : any[] = []
            
        for (let solicitacaoMonitoria of solicitacoesMonitorias) {
            solicitacoesMonitoriaJson.push
            ({
                "id": solicitacaoMonitoria.id,
                "matriculaAluno": solicitacaoMonitoria.matricula_aluno,
                "disciplinaDesejada": solicitacaoMonitoria.Disciplina.nome,
                "monitorRecomendado": solicitacaoMonitoria.monitorRecomendado,
                "motivoSolicitacao": solicitacaoMonitoria.motivo
            })
            break
        }
    
        let solicitacoesMonitoriaFormat = {"solicitacoesAbertura": solicitacoesMonitoriaJson}

        res.status(200).json(solicitacoesMonitoriaFormat)

    } catch (error) {
        res.status(500).json({message: 'Houve um erro ao tentar pegar os dados, tente novamente mais tarde.'})
    }
}

const aprovaVaga: RequestHandler = (req, res) => {
    res.status(200).json({id_abertura_monitoria:"zvoresgo2v"})
}

const removeVaga: RequestHandler = (req, res) => {
    res.status(200).json({id_abertura_monitoria:"zvoresgo2v"})
}

const getMonitorias: RequestHandler = async (req, res) => {
    const { cpfProfessor } = req.body;

    try {
        const monitorias = await client.monitoria.findMany({
            where: {
                Colaborador: {
                    cpf: cpfProfessor
                }
            },
            select: {
                id: true,
                nome_disciplina: true,
                AlunoMonitoria: {
                    select: {
                        Aluno:{
                            select:{
                                nome: true,
                                email: true
                            }
                        }
                    }
                }
            }
        })
    
        var monitoriaJson : any[] = []
        var monitorJson : any[] = []
            
        for (let monitoria of monitorias) {
            var monitorJson : any[] = []
            for(let monitor of monitoria.AlunoMonitoria) {
                monitorJson.push
                ({
                    "nomeAluno": monitor.Aluno.nome,
                    "email": monitor.Aluno.email
                })
            }
            monitoriaJson.push
            ({
                "idDisciplina": monitoria.id,
                "nomeDisciplina": monitoria.nome_disciplina,
                "monitores": monitorJson,
            })
            break
        }
        
        let monitoriasFormat = {"disciplinas": monitoriaJson}

        res.status(200).json(monitoriasFormat)

    } catch (error) {
        res.status(500).json({message: 'Houve um erro ao tentar pegar os dados, tente novamente mais tarde.'})
    }
}

export {
    getSolicitacoes,
    aprovaSolicitacoes,
    reprovaSolicitacoes,
    getVagas,
    aprovaVaga,
    removeVaga,
    getMonitorias
}