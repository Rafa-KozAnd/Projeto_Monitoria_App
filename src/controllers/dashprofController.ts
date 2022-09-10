import { RequestHandler } from 'express';
import { client } from '../../prisma/client'


const getSolicitacoes: RequestHandler  = async (req, res) => {
    const { cpfProfessor } = req.body;
    
    try {
        const solicitacoesAlunos = await client.vaga_aluno_monitoria.findMany({
            where: {
                status: 1,
               vaga_monitoria: {
                    professor_requisitante: cpfProfessor
                }
            },
            select: {
                matricula_aluno: true,
                id_vaga: true,
                aluno: {
                    select: {
                        email: true
                    }
                },
               vaga_monitoria: {
                    select: {
                        disciplina: {
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
                "disciplinaDesejada": solicitacaoAluno.vaga_monitoria.disciplina.nome,
                "emailAluno": solicitacaoAluno.aluno.email
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
        const solicitacoesMonitorias = await client.solicitacao_monitoria.findMany({
            where: {
                status: 0,// verificar significado dos status
                disciplina: {
                    colaborador:{
                        cpf: cpfProfessor
                    }
                }
            },
            select: {
                id: true,
                matricula_aluno: true,
                codigo_disciplina: true,
                disciplina: {
                    select: {
                        nome: true
                    }
                },
                monitorRecomendado: true,
                motivo: true
            }
        })
    
        var solicitacoesMonitoriaJson : any[] = []
            
        for (let solicitacao_monitoria of solicitacoesMonitorias) {
            solicitacoesMonitoriaJson.push
            ({
                "id": solicitacao_monitoria.id,
                "matriculaAluno": solicitacao_monitoria.matricula_aluno,
                "disciplinaDesejada": solicitacao_monitoria.disciplina.nome,
                "monitorRecomendado": solicitacao_monitoria.monitorRecomendado,
                "motivoSolicitacao": solicitacao_monitoria.motivo
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
                colaborador: {
                    cpf: cpfProfessor
                }
            },
            select: {
                id: true,
                nome_disciplina: true,
                aluno_monitoria: {
                    select: {
                        aluno:{
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
            for(let monitor of monitoria.aluno_monitoria) {
                monitorJson.push
                ({
                    "nomeAluno": monitor.aluno.nome,
                    "email": monitor.aluno.email
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