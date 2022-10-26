import { RequestHandler } from 'express';
import { decode } from 'jsonwebtoken';
import { client } from '../../prisma/client'


const getSolicitacoes: RequestHandler  = async (req, res) => {
    const { cpf_professor } = req.body;
    
    try {
        const solicitacoesAlunos = await client.vaga_aluno_monitoria.findMany({
            where: {
                status: 1,
                vaga_monitoria: {
                    professor_requisitante: cpf_professor,
                    aprovado: false
                }
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
                        }
                    }
                }
            }
        })

        var solicitacoesAlunosJson : any[] = []
        
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

    }catch(err) {
        return res.status(500).json({message: 'Houve um erro ao tentar pegar os dados, tente novamente mais tarde.'})
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
                status:2
            }
        })
        if(aprovaalunosolicit) {
            const atualiza_vaga = await client.vaga_monitoria.update({
                where: {
                    id: aprovaalunosolicit.id_vaga
                },
                data: {
                    aprovado: true
                }
            })
            await client.aluno_monitoria.create({
                data: {
                    id_monitoria: atualiza_vaga.id_monitoria,
                    matricula_aluno: aprovaalunosolicit.matricula_aluno
                }
            })

            return res.status(200).json({message:"Solicitação aprovada com sucesso!"})
        }
        return res.status(500).json({message:"Solicitação não encontrada"})
        

    } catch(err) {
        return res.status(500).json({message: 'Houve um erro ao alterar os dados, tente novamente mais tarde.'})
    }
    
}

const reprovaSolicitacoes: RequestHandler = async (req, res) => {
    const { solicitacao_id, motivo} = req.body;
    console.log('solicitacao_id', motivo);
    try {
        const recusaalunosolicit = await client.vaga_aluno_monitoria.update({
            where: {
                id: solicitacao_id
            },
            data: {
                status:3,
                motivo: motivo
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

const getVagas: RequestHandler = async (req, res) => {
    const { cpf_professor } = req.body;

    try {
        const solicitacoesMonitorias = await client.sugestao_monitoria.findMany({
            where: {
                status: 0,// verificar significado dos status
                disciplina: {
                    colaborador:{
                        cpf: cpf_professor
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
            
        for (let sugestao_monitoria of solicitacoesMonitorias) {
            solicitacoesMonitoriaJson.push
            ({
                "id": sugestao_monitoria.id,
                "matriculaAluno": sugestao_monitoria.matricula_aluno,
                "disciplinaDesejada": sugestao_monitoria.disciplina.nome,
                "monitorRecomendado": sugestao_monitoria.monitorRecomendado,
                "motivoSolicitacao": sugestao_monitoria.motivo
            })
        }
        let solicitacoesMonitoriaFormat = {"solicitacoesAbertura": solicitacoesMonitoriaJson}

        res.status(200).json(solicitacoesMonitoriaFormat)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Houve um erro ao tentar pegar os dados, tente novamente mais tarde.', "erro": error})
    }
}

const aprovaVaga: RequestHandler = async (req, res) => {
    const { id_vaga, cpf_professor} = req.body;

    try {
        const aprovaalunovaga = await client.sugestao_monitoria.update({
            where: {
                id: id_vaga
            },
            data: {
                status: 1
            }
        })
        if(aprovaalunovaga) {
            let dateTime = new Date()

            const criamonitoria = await client.monitoria.create({
                data: {
                    codigo_disciplina: aprovaalunovaga.codigo_disciplina,
                    codigo_professor: cpf_professor,
                    horario: new Date(),
                }

            })
            if(criamonitoria) {
                return res.status(201).json({message:"Aprovado e monitoria criada com sucesso."})
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
        const removealunovaga = await client.sugestao_monitoria.delete({
            where: {
                id: id_vaga
            }
        })
        if(removealunovaga) {
            return res.status(200).json({message:"Excluido com sucesso"})
        }
        return res.status(500).json({message:"Vaga não encontrada"})
        

    } catch(err) {
        return res.status(500).json({message: 'Houve um erro ao alterar os dados, tente novamente mais tarde.'})
    }
}

const getMonitorias: RequestHandler = async (req, res) => {
    const { cpf_professor } = req.body;

    try {
        const monitorias = await client.monitoria.findMany({
            where: {
                colaborador: {
                    cpf: cpf_professor
                }
            },
            select: {
                id: true,
                disciplina: {
                    select: {
                        nome: true
                    }
                },
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
                "nomeDisciplina": monitoria.disciplina.nome,
                "monitores": monitorJson,
            })
        }
        
        let monitoriasFormat = {"disciplinas": monitoriaJson}

        res.status(200).json(monitoriasFormat)

    } catch (error) {
        res.status(500).json({message: 'Houve um erro ao tentar pegar os dados, tente novamente mais tarde.'})
    }
}

const abrirVaga : RequestHandler = async (req, res) => {
    const { authorization : token } = req.headers;
    const { vaga } = req.body;
    try {
        const result = decode(token);
        const nova_monitoria = await client.monitoria.create({
            data: {
                horario: new Date(),
                codigo_professor: result["user_id"],
                codigo_disciplina: vaga.codigo_disciplina,
            }
        })
        const abrir_vaga = await client.vaga_monitoria.create({
            data: {
                aprovado: false,
                codigo_disciplina: nova_monitoria.codigo_disciplina,
                professor_requisitante: nova_monitoria.codigo_professor,
                id_monitoria: nova_monitoria.id,
                pre_requisito: vaga.pre_requisitos[0],
            }
        })
        if(abrir_vaga) {
            res.status(200).json({message: 'Vaga aberta com sucesso.'})
        }
    }catch(err) {
        console.log(err);
        res.status(500).json({message: 'Houve um erro ao tentar abrir a vaga, tente novamente mais tarde.'})
    }
}

export {
    getSolicitacoes,
    aprovaSolicitacoes,
    reprovaSolicitacoes,
    getVagas,
    aprovaVaga,
    removeVaga,
    getMonitorias,
    abrirVaga
}