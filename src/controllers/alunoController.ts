import { randomUUID } from 'crypto';
import { RequestHandler } from 'express';
import { client } from '../../prisma/client'
import { decode } from 'jsonwebtoken';
import {Aluno, User} from '../services/Aluno'
import {Authenticator} from '../services/Authenticator'
const { time } = require("console")

const getPreRequisitos : RequestHandler = async (req, res) => {
    const { id_solicitacao } = req.body;
    try {
        const pre_requisito = await client.vaga_monitoria.findFirst({
            where: {
                id: id_solicitacao
            },
            select: {
                pre_requisito: true
            }
        })
        console.log(pre_requisito)
        res.status(200).json({pre_requisito})
    }catch(err) {
        res.status(403).json({message: err.message})
    }
}

const getVagasMonitoria: RequestHandler = async (req, res) => {
    const {matricula} = req.body;

    const vagasMonitorias = await client.vaga_monitoria.findMany({
        select: {
            id:true,
            pre_requisito: true,
            monitoria: {
                select: {
                    disciplina: {
                        select: {
                            nome: true,
                            codigo_disciplina: true,
                            colaborador: {
                                select: {
                                    nome:true
                                }
                            }
                            
                        }
                    }
                }
            }
        }
    })

    var monitoriasmap : any[] = []
    for  ( let vaga_monitoria of vagasMonitorias){
        monitoriasmap.push(
            {
                "id": vaga_monitoria.id,
                "nome_disciplina" : vaga_monitoria.monitoria.disciplina.nome,
                "nome_professor": vaga_monitoria.monitoria.disciplina.colaborador.nome,
                "codigo_disciplina" : vaga_monitoria.monitoria.disciplina.codigo_disciplina,
                "pre_requisito": vaga_monitoria.pre_requisito
            }
        )
    }

    let monitoriasJson = {"vagas_monitorias": monitoriasmap}

    res.status(200).send(monitoriasJson)
}

const postVagaCandidatar: RequestHandler = async (req, res) => {
    const { vaga, matricula } = req.body;
    try {
        const nova_candidatura = await client.vaga_aluno_monitoria.create({
            data: {
                id_vaga: vaga,
                matricula_aluno: matricula,
                status: 0,
            }
        })
        if(nova_candidatura) {
            return res.status(200).json({message: 'Candidatura realizada com sucesso.'})
        }
    }catch(err) {
        console.log(err);
        return res.status(500).json({message: 'Houve um erro ao tentar realizar a candidatura, tente novamente mais tarde.'})
    }
}

// TODO: Arrumar esse endpoint foi feito para receber as monitorias de um monitor
const getMinhasMonitorias: RequestHandler  = async (req, res) => {
    const {matricula} = req.body;
    const monitorias = await client.monitoria.findMany({
        select: {
            id: true,
            disciplina:{
                select:{
                    nome:true,
                    codigo_disciplina: true,
                    colaborador: {
                        select: {
                            nome:true
                        }
                    }
                }
            }
        }
    });

    var monitoriasmap : any[] = []
    for (let monitoria of monitorias){
        monitoriasmap.push(
            {
                "nome_disciplina" : monitoria.disciplina.nome,
                "nome_professor": monitoria.disciplina.colaborador.nome,
                "codigo_disciplina" : monitoria.disciplina.codigo_disciplina,
            }
        )
    };

    res.status(201).send(monitorias);
}

const getAgendamentos: RequestHandler = async (req, res) => {
    const { matricula_aluno } = req.body;

    const agendamentos = await client.agendamento.findMany({
        where: { matricula_aluno: matricula_aluno},
        select: {
            horario:true,
            aluno: {
                select:{
                    nome: true
                }
            },
            monitoria:{
                select: {
                    disciplina:{
                        select: {
                            nome: true
                        }
                    }
                }
            }
            
        }   
    })

    var agendamentosMap : any[] = []
    for  ( let agendamento of agendamentos){
        agendamentosMap.push(
            {
                "horario" : agendamento.horario,
                "nome_aluno": agendamento.aluno.nome,
                "nome_disciplina" : agendamento.monitoria.disciplina.nome           }
        )
    }

    let monitoriasJson = {"vagas_monitorias": agendamentosMap}

    res.status(201).send(monitoriasJson)
}

const getPerfil: RequestHandler = async (req, res) => {
    const { matricula} = req.body;

    const aluno = await client.aluno.findFirst({
        where:  {matricula : matricula }
    });
    if (aluno == null ){
        res.status(404);
    };
    let perfil = {
        "nome_aluno": aluno?.nome,
        "email": aluno?.email,
        "matricula": aluno?.matricula,
        "e_monitor": aluno?.e_monitor
    };
    res.status(201).send(perfil);
}


const getMonitorias: RequestHandler = async (req, res) => {
    const monitorias = await client.monitoria.findMany({
        select: {
            id: true,
            disciplina: {
                select: {
                    nome: true,
                    codigo_disciplina: true
                }
            },
            aluno_monitoria : {
                select : {
                    id: true,
                    aluno: {
                        select: {
                            nome: true,
                            matricula: true
                        }
                    }
                }
            } 
        },
        where: {aluno_monitoria: {some: {}}}
    }).then((res) => {
        return res.map((monitoria) => {
            return monitoria.aluno_monitoria.map((aluno_monitor) => ({
                id: randomUUID(),
                id_monitoria: monitoria.id,
                id_monitor: aluno_monitor.aluno.matricula,
                nome_disciplina: monitoria.disciplina.nome,
                nome_monitor: aluno_monitor.aluno.nome,
                codigo_disciplina: monitoria.disciplina.codigo_disciplina
            }))[0]
        }) 
    });
    res.status(201).send(monitorias)
}

const getMonitoria: RequestHandler = async (req, res) => {
    const { id_monitoria, id_monitor } = req.body;

    const monitoria = await client.monitoria.findFirst({
        where: {
            id: id_monitoria,
            aluno_monitoria: {every: {matricula_aluno: id_monitor}}
        },
        select: {
            id: true,
            horario: true,
            disciplina: {
                select: {
                    nome: true,
                    codigo_disciplina: true
                } 
            },
            aluno_monitoria : {
                select : {
                    id: true,
                    aluno: {
                        select: {
                            nome: true,
                            email: true,
                        }
                    }
                
                } 
            },
            colaborador: { 
                select: {
                    nome: true
                }
            }
        }
    });
    let perfil = { 
            "nome_aluno": monitoria?.aluno_monitoria[0].aluno.nome,
            "nome_professor": monitoria?.colaborador.nome,
            "nome_disciplina": monitoria?.disciplina.nome,
            "horario_monitoria": monitoria?.horario,
            "email_contato": monitoria?.aluno_monitoria[0].aluno.email
        } 
    res.status(201).send(perfil)
}


//TODO: Faltou algo aqui
const getAgendamentoMonitoria: RequestHandler  = (req, res) => {
    const {my} = req.body;
    const today = new Date();
    const hoje = today.getDate()
    const amanha = today.getDate() + 1
    const agendamentos = client.agendamento.findMAny({
        where:{
            horario: {
                lte: amanha,
                gte: hoje,
              },
        }
    })

    var agendamentoJson : any[] = []
    for  ( let agendamento of agendamentos){
        agendamentoJson.push(
            {
                "nome_monitor": agendamento.monitoria.aluno_monitoria[0].aluno.nome,
                "horario" : agendamento.horario,
                "matricula_aluno": agendamento.monitoria.aluno_monitoria[0].aluno.mtricula,
                "status": 1
            }
        )
    }

    let candidaturasformat = {agendamentoJson}

    return res.status(201).send(candidaturasformat)
}


const finalizarSolicitacaoAgentamento: RequestHandler  = (req, res) => {
    let id = req.body["id_solicitacao"]
    res.status(200).send({msg:`solicitacao  ${id} finalizada`})
}


const removerAgendamento: RequestHandler  = (req, res) => {
    let id = req.body["id_solicitacao"]
    res.status(200).send({msg:`solicitacao de agendamento ${id} removida`})
}

const agendarMonitoria: RequestHandler = (req, res) => {
    let perfil = {
        "nome_aluno": "meunomeéjoao",
        "email": "joao@email.com",
        "matricula": "12387878",
        "e_monitor": true
    }
    res.status(201).send(perfil)
}

const sugerirMonitoria: RequestHandler = async (req, res) => {
    console.log(req.body)
    const {
        matricula_aluno, 
        codigo_disciplina, 
        motivo,
        monitor_recomendado
         } = req.body;
        
        if (!matricula_aluno){
            throw new Error("Matricula não foi inserida");
        }
        try {
            const disciplina = await client.disciplina.findFirst({
                where: {
                    codigo_disciplina: codigo_disciplina
                }
            });
        } catch (error) {
            res.status(400).send("Codigo da disciplina não existente");
            throw new Error("Codigo da disciplina não existente");
        }
        try {
            const sugestao_monitoria = await client.sugestao_monitoria.create({
                data:{
                    matricula_aluno: matricula_aluno,
                    codigo_disciplina: codigo_disciplina,
                    motivo: motivo,
                    monitorRecomendado: monitor_recomendado,
                    status: 1
                }
            })
            res.status(201).send("sugestão foi criada com sucesso")
        } catch (error) {
            console.log(error)
            res.status(404).send(error);
        }
}

const getCandidaturas: RequestHandler = async (req, res) => {
    const { authorization : token } = req.headers;
    const result = decode(token);


    const candidaturas = await client.vaga_aluno_monitoria.findMany({
        where: {
            matricula_aluno: result["user_id"],
        },
        select: {
            status: true,
            motivo: true,
            vaga_monitoria: {
                select: {
                    disciplina: {
                        select: {
                            nome: true,
                        }
                    }
                } 
            }
        }
    })

    var candidaturasJson : any[] = []
    for  ( let candidatura of candidaturas){
        candidaturasJson.push(
            {
                "nome_disciplina": candidatura?.vaga_monitoria.disciplina.nome,
                "status": candidatura?.status,
                "motivo": candidatura?.motivo,
            }
        )
    }

    let candidaturasformat = {candidaturasJson}

    return res.status(201).send(candidaturasformat)
}

export {
    getVagasMonitoria,
    postVagaCandidatar,
    getMinhasMonitorias,
    getAgendamentoMonitoria,
    finalizarSolicitacaoAgentamento,
    removerAgendamento,
    getAgendamentos,
    getPerfil,
    getMonitorias,
    getMonitoria,
    agendarMonitoria,
    sugerirMonitoria,
    getPreRequisitos,
    getCandidaturas
}