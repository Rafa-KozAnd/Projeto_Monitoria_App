import { randomUUID } from 'crypto';
import { RequestHandler } from 'express';
import { client } from '../../prisma/client'
import {Aluno, User} from '../services/Aluno'
import {Authenticator} from '../services/Authenticator'
const { time } = require("console")

const getVagasMonitoria: RequestHandler = async (req, res) => {
    const {matricula, senha} = req.body;
    const aluno = new Aluno(matricula, senha)
    // TODO: nao sei se isso aqui funciona esse cast aqui
    const validate = (Boolean)(await Authenticator.authenticateAluno(aluno))
    if (validate != true)
    {
        res.status(403).send("não autorizado");
        return false
    }
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

//TODO: Faltou algo aqui
const getAgendamentoMonitoria: RequestHandler  = (req, res) => {
    let response = {
        "nome _aluno": "hedison",
        "horario" : Date.now(),
        "matricula_aluno": "123451000",
        "status": 0
    }
    res.status(201).send(response)
}

const finalizarSolicitacaoAgentamento: RequestHandler  = (req, res) => {
    let id = req.body["id_solicitacao"]
    res.status(200).send({msg:`solicitacao  ${id} finalizada`})
}

const removerAgendamento: RequestHandler  = (req, res) => {
    let id = req.body["id_solicitacao"]
    res.status(200).send({msg:`solicitacao de agendamento ${id} removida`})
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
    const { matricula, senha} = req.body;
    //const _aluno = new Aluno(matricula, senha)
    // TODO: nao sei se isso aqui funciona esse cast aqui
    //const validate = (Boolean)(await Authenticator.authenticateAluno(_aluno));
    //if (validate != true)
    //{
        //res.status(403).send("não autorizado");
        //return false
    //}

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


export {
    getVagasMonitoria,
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
}