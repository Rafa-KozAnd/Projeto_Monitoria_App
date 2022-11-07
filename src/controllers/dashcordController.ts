import { RequestHandler } from 'express';
import { client } from '../../prisma/client'

const getSolicitacoes: RequestHandler  = async (req, res) => {

    try {
        const solicitacoesAlunos = await client.vaga_aluno_monitoria.findMany({
            where: {
                status: 0
            },
            select: {
                matricula_aluno: true,
                id: true,
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
                "id": solicitacaoAluno.id,
                "matriculaAluno": solicitacaoAluno.matricula_aluno,
                "disciplinaDesejada": solicitacaoAluno.vaga_monitoria.disciplina.nome,
                "emailAluno": solicitacaoAluno.aluno.email
            })
        }

        let solicitacoesAlunosFormat = {"solicitacoes": solicitacoesAlunosJson}
        
        return res.status(200).json(solicitacoesAlunosFormat)

    } catch(err) {
        return res.status(500).json({message: 'Ocorreu um erro.'})
    }
}

const aprovaSolicitacoes: RequestHandler = async (req, res) => {
    const { solicitacao_id } = req.body;

    try {
        const aprovaalunosolicit = await client.vaga_aluno_monitoria.update({
            where: {
                id: solicitacao_id
            },
            data: {
                status:1
            }
        })
        if(aprovaalunosolicit) {
            return res.status(200).json({message:"Solicitação aprovada com sucesso!"})
        }
        return res.status(500).json({message:"Solicitação não encontrada"})

    } catch(err) {
        return res.status(500).json({message: 'Houve um erro ao alterar os dados, tente novamente mais tarde.'})
    }
}

const reprovaSolicitacoes: RequestHandler = async (req, res) => {
    const { solicitacao_id } = req.body;
    try {
        const recusaalunosolicit = await client.vaga_aluno_monitoria.update({
            where: {
                id: solicitacao_id
            },
            data: {
                status:3
            }
        })
        if(recusaalunosolicit) {
            return res.status(200).json({message:"Recusado com sucesso"})
        }
        return res.status(500).json({message:"Solicitação não encontrada"})

    } catch(err) {
        return res.status(500).json({message: 'Houve um erro ao alterar os dados, tente novamente mais tarde.'})
    }
}

// Verificar oque é essa rota
const deleteSolicitacoes: RequestHandler = async (req, res) => {
    res.status(200).json({id_abertura_monitoria:"usahday8781"})
}

const getSolicitacoesPendentes: RequestHandler = async (req, res) => {
    
    try {
        const solicitacoesAlunos = await client.vaga_aluno_monitoria.findMany({
            where: {
                status: 1
            },
            select: {
                matricula_aluno: true,
                id: true,
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
                "id": solicitacaoAluno.id,
                "matriculaAluno": solicitacaoAluno.matricula_aluno,
                "disciplinaDesejada": solicitacaoAluno.vaga_monitoria.disciplina.nome,
                "emailAluno": solicitacaoAluno.aluno.email
            })
        }

        let solicitacoesAlunosFormat = {"solicitacoes": solicitacoesAlunosJson}
        
        return res.status(200).json(solicitacoesAlunosFormat)

    } catch(err) {
        return res.status(500).json({message: 'Ocorreu um erro.'})
    }
}

export {
    getSolicitacoes,
    aprovaSolicitacoes,
    reprovaSolicitacoes,
    deleteSolicitacoes,
    getSolicitacoesPendentes
}