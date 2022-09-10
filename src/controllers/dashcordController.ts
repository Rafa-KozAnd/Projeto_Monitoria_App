import { RequestHandler } from 'express';
import { client } from '../../prisma/client'

// Atualizar
export const getSolicitacoes: RequestHandler  = async (req, res) => {

    try {
        const solicitacoesAlunos = await client.vaga_aluno_monitoria.findMany({
            where: {
                status: 0
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
                        },
                        professor_requisitante: true,
                    }  
                }
            }
        })

        const solicitacoesAlunosJson : any[] = []
        
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

    } catch(err) {
        res.status(500).json({message: 'Ocorreu um erro.'})
    }
}

export const aprovaSolicitacoes: RequestHandler = (req, res) => {
    res.status(200).json({id_solicitacao:"usahday8781"})
}

export const reprovaSolicitacoes: RequestHandler = (req, res) => {
    res.status(200).json({comentario:"Aluno não foi aprovado na disciplina",id_solicitacao: "usahday8781"})
}

export const deleteSolicitacoes: RequestHandler = (req, res) => {
    res.status(200).json({id_abertura_monitoria:"usahday8781"})
}

// Atualizar
export const getSolicitacoesPendentes: RequestHandler = async (req, res) => {
    
    try {
        const solicitacoesAlunos = await client.vaga_aluno_monitoria.findMany({
            where: {
                status: 0
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
                        },
                        professor_requisitante: true,
                    }  
                }
            }
        })

        const solicitacoesAlunosJson : any[] = []
        
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

    } catch(err) {
        res.status(500).json({message: 'Ocorreu um erro.'})
    }
}

module.exports = {
    getSolicitacoes,
    aprovaSolicitacoes,
    reprovaSolicitacoes,
    deleteSolicitacoes,
    getSolicitacoesPendentes
}