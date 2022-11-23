import { RequestHandler } from 'express';
import { client } from '../../prisma/client'


const getSolicitacoes: RequestHandler  = async (req, res) => {
    const { my } = req.body;
    
    try {
        const solicitacoesAlunos = await client.vaga_aluno_monitoria.findMany({
            where: {
                status: 1,
                vaga_monitoria: {
                    professor_requisitante: my,
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
    const { solicitacao_id, horario, dia } = req.body;
    const input_date = new Date();
    input_date.setHours(horario.slice(0,2));
    input_date.setMinutes(horario.slice(3,5));
    input_date.setSeconds(0);
    
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
            await client.aluno.update({
                where: {
                    matricula: aprovaalunosolicit.matricula_aluno
                },
                data: {
                    e_monitor: true
                }
            })
            await client.monitoria.update({
                where: {
                    id: atualiza_vaga.id_monitoria
                },
                data: {
                    horario: input_date,
                    dia: dia
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
    const { my } = req.body;

    try {
        const solicitacoesMonitorias = await client.sugestao_monitoria.findMany({
            where: {
                status: 1,
                disciplina: {
                    colaborador:{
                        cpf: my
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
    const { id_vaga, pre_requisitos, my} = req.body;

    try {
        const aprovaalunovaga = await client.sugestao_monitoria.update({
            where: {
                id: id_vaga
            },
            data: {
                status: 2
            }
        })
        if(aprovaalunovaga) {
            const nova_monitoria = await client.monitoria.create({
                data: {
                    codigo_professor: my,
                    codigo_disciplina: aprovaalunovaga.codigo_disciplina,
                    horario: new Date().getDate().toString()
                }
            })
            const abrir_vaga = await client.vaga_monitoria.create({
                data: {
                    aprovado: false,
                    codigo_disciplina: nova_monitoria.codigo_disciplina,
                    professor_requisitante: nova_monitoria.codigo_professor,
                    id_monitoria: nova_monitoria.id,
                    pre_requisito: pre_requisitos,
                }
            })
            if(nova_monitoria && abrir_vaga) {
                return res.status(201).json({message:"Monitoria criada com sucesso."})
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
    const { my } = req.body; 
    try {

        const monitorias = await client.monitoria.findMany({
            where: {
                colaborador: {
                    cpf: my
                }
            },
            select: {
                id: true,
                disciplina: {
                    select: {
                        codigo_disciplina: true,
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
            if(monitorJson.length != 0) {
                monitoriaJson.push
                ({
                    "idMonitoria": monitoria.id,
                    "idDisciplina": monitoria.disciplina.codigo_disciplina,
                    "nomeDisciplina": monitoria.disciplina.nome,
                    "monitores": monitorJson,
                })
            }
        }
        
        let monitoriasFormat = {"disciplinas": monitoriaJson}

        res.status(200).json(monitoriasFormat)

    } catch (error) {
        res.status(500).json({message: 'Houve um erro ao tentar pegar os dados, tente novamente mais tarde.'})
    }
}

const abrirVaga : RequestHandler = async (req, res) => {
    const { vaga, my } = req.body;
    try {
        const nova_monitoria = await client.monitoria.create({
            data: {
                horario: new Date(),
                codigo_professor: my,
                codigo_disciplina: vaga.codigo_disciplina,
            }
        })
        

        let preRequisito = ""
        vaga.pre_requisitos.map((e) => preRequisito = preRequisito.concat(`${e}, `))

        const abrir_vaga = await client.vaga_monitoria.create({

            data: {
                aprovado: false,
                codigo_disciplina: nova_monitoria.codigo_disciplina,
                professor_requisitante: nova_monitoria.codigo_professor,
                id_monitoria: nova_monitoria.id,
                pre_requisito: preRequisito,
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

const excluiMonitor: RequestHandler = async (req, res) => {
    const { id_monitoria } = req.body;

    try {
        const removemonitor = await client.aluno_monitoria.deleteMany({
            where: {
                monitoria: {
                    id: id_monitoria
                }
            }
        })
        if(removemonitor) {
            return res.status(200).json({message: 'Monitor removido com sucesso'})
        }
        return res.status(500).json({message: 'Monitor não encontrado'})

    } catch(err) {
        return res.status(500).json({message: 'Houve um erro ao alterar os dados, tente novamente mais tarde.'})
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
    abrirVaga,
    excluiMonitor
}