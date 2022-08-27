import { RequestHandler } from 'express';
import { client } from '../../prisma/client'


const getSolicitacoes: RequestHandler  = async (req, res) => {
    const { cpf_professor } = req.body;
    
    try {
        const solicitacoesAlunos = await client.vagaAlunoMonitoria.findMany({
            where: {
                status: 1,
                VagaMonitoria: {
                    professor_requisitante: cpf_professor,
                    aprovado: false
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
        
        return res.status(200).json(solicitacoesAlunosFormat)

    }catch(err) {
        return res.status(500).json({message: 'Houve um erro ao tentar pegar os dados, tente novamente mais tarde.'})
    }
}

const aprovaSolicitacoes: RequestHandler = async (req, res) => {
    const { id_vaga, matricula_aluno, } = req.body;

    try {
        const aprovaalunosolicit = await client.vagaAlunoMonitoria.updateMany({
            where: {
                id_vaga: id_vaga,
                matricula_aluno: matricula_aluno,
                status:1
            },
            data: {
                status:2,
            }
        })
        if(aprovaalunosolicit.count == 1) {

            await client.vagaMonitoria.update({
                where: {
                    id: id_vaga
                },
                data: {
                    aprovado: true
                }
            })
            return res.status(200).json({message:"Alterado com sucesso"})
        }
        return res.status(200).json({message:"Solicitação não encontrada"})
        

    } catch(err) {
        return res.status(500).json({message: 'Houve um erro ao alterar os dados, tente novamente mais tarde.'})
    }
    
}

const reprovaSolicitacoes: RequestHandler = async (req, res) => {
    const { id_vaga, matricula_aluno, motivo} = req.body;

    try {
        const recusaalunosolicit = await client.vagaAlunoMonitoria.updateMany({
            where: {
                id_vaga: id_vaga,
                matricula_aluno: matricula_aluno,
                status: 1
            },
            data: {
                status:3,
                motivo: motivo
            }
        })
        if(recusaalunosolicit.count == 1) {
            return res.status(200).json({"msg":"Recusado com sucesso"})
        }
        return res.status(200).json({"msg":"Solicitação não encontrada"})
        

    } catch(err) {
        return res.status(500).json({message: 'Houve um erro ao alterar os dados, tente novamente mais tarde.'})
    }
}


const getVagas: RequestHandler = async (req, res) => {
    const { cpf_professor } = req.body;

    try {
        const solicitacoesMonitorias = await client.solicitacaoMonitoria.findMany({
            where: {
                status: 0,// verificar significado dos status
                Disciplina: {
                    Colaborador:{
                        cpf: cpf_professor
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
            
        for (const solicitacaoMonitoria of solicitacoesMonitorias) {
            solicitacoesMonitoriaJson.push
            ({
                "id": solicitacaoMonitoria.id,
                "matriculaAluno": solicitacaoMonitoria.matricula_aluno,
                "disciplinaDesejada": solicitacaoMonitoria.Disciplina.nome,
                "monitorRecomendado": solicitacaoMonitoria.monitorRecomendado,
                "motivoSolicitacao": solicitacaoMonitoria.motivo
            })
        }
    
        let solicitacoesMonitoriaFormat = {"solicitacoesAbertura": solicitacoesMonitoriaJson}

        res.status(200).json(solicitacoesMonitoriaFormat)

    } catch (error) {
        res.status(500).json({message: 'Houve um erro ao tentar pegar os dados, tente novamente mais tarde.'})
    }
}

const aprovaVaga: RequestHandler = async (req, res) => {
    const { id_vaga, cpf_professor, nome_disciplina } = req.body;

    try {
        const aprovaealunovaga = await client.solicitacaoMonitoria.update({
            where: {
                id: id_vaga
            },
            data: {
                status: 1
            }
        })
        if(aprovaealunovaga) {
            let dateTime = new Date()

            const achadisciplina = await client.disciplina.findFirst({
                where: {
                    professor_disciplina: cpf_professor,
                    nome: nome_disciplina
                },
                select: {
                    codigo_disciplina: true
                }
            })

            const criamonitoria = await client.monitoria.create({
                data: {
                    id:55555, //autoincrement
                    nome_disciplina:"testeeeeeee", //possivelmente apagar isto da tabela
                    codigo_disciplina: achadisciplina.codigo_disciplina,
                    codigo_professor: cpf_professor,
                    horario: dateTime
                }

            })
            if(criamonitoria) {
                return res.status(200).json({message:"Aprovado com sucesso"})
            }
            return res.status(500).json({message:"Erro ao criar monitoria"})
        }
        return res.status(500).json({message:"Vaga não encontrada"})
    } catch(err) {
        return res.status(500).json({message: 'Houve um erro ao alterar os dados, tente novamente mais tarde.'})
    }

}

const removeVaga: RequestHandler = async (req, res) => {
    const { id_vaga } = req.body;

    try {
        const removealunovaga = await client.solicitacaoMonitoria.delete({
            where: {
                id: id_vaga
            }
        })
        if(removealunovaga) {
            return res.status(200).json({"msg":"Excluido com sucesso"})
        }
        return res.status(200).json({"msg":"Vaga não encontrada"})
        

    } catch(err) {
        return res.status(500).json({message: 'Houve um erro ao alterar os dados, tente novamente mais tarde.'})
    }
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