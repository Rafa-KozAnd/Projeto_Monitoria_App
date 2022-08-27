import { RequestHandler } from 'express';
import { client } from '../../prisma/client'
const { time } = require("console")

const getVagasMonitoria: RequestHandler = async (req, res) => {
    // const {monitoria} = req.body;
    const vagasMonitorias = await client.vagaMonitoria.findMany({
        select: {
            id:true,
            pre_requisito: true,
            Monitoria: {
                select: {
                    Disciplina: {
                        select: {
                            nome: true,
                            codigo_disciplina: true,
                            Colaborador: {
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
    for  ( let vagaMonitoria of vagasMonitorias){
        monitoriasmap.push(
            {
                "nome_disciplina" : vagaMonitoria.Monitoria.Disciplina.nome,
                "nome_professor": vagaMonitoria.Monitoria.Disciplina.Colaborador.nome,
                "codigo_disciplina" : vagaMonitoria.Monitoria.Disciplina.codigo_disciplina,
                "pre_requisito": vagaMonitoria.pre_requisito
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
            Disciplina:{
                select:{
                    nome:true,
                    codigo_disciplina: true,
                    Colaborador: {
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
                "nome_disciplina" : monitoria.Disciplina.nome,
                "nome_professor": monitoria.Disciplina.Colaborador.nome,
                "codigo_disciplina" : monitoria.Disciplina.codigo_disciplina,
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
            Aluno: {
                select:{
                    nome: true
                }
            },
            Monitoria:{
                select: {
                    Disciplina:{
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
                "nome_aluno": agendamento.Aluno.nome,
                "nome_disciplina" : agendamento.Monitoria.Disciplina.nome           }
        )
    }

    let monitoriasJson = {"vagas_monitorias": agendamentosMap}

    res.status(201).send(monitoriasJson)
}

const getPerfil: RequestHandler = async (req, res) => {
    const { matricula_aluno } = req.body;

    const aluno = await client.aluno.findFirst({
        where:  {matricula : matricula_aluno }
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
    const {matricula} = req.body;
    const monitorias = await client.monitoria.findMany({
        select: {
            id: true,
            Disciplina: {
                select: {
                    nome: true,
                    codigo_disciplina: true
                }
            },
            AlunoMonitoria : {
                select : {
                    id: true,
                    Aluno: {
                        select: {
                            nome: true
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
                    "nome_disciplina" : monitoria.Disciplina.nome,
                    "nome_monitor": monitoria.AlunoMonitoria[0].Aluno.nome,
                    "codigo_disciplina" : monitoria.Disciplina.codigo_disciplina,
                }
            )
        }

    
    res.status(201).send(monitoriasmap)
}

const getMonitoria: RequestHandler = async (req, res) => {
    const { id_monitoria } = req.body;

    const monitoria = await client.monitoria.findFirst({
        where: {
            id: id_monitoria
        },
        select: {
            id: true,
            horario: true,
            Disciplina: {
                select: {
                    nome: true,
                    codigo_disciplina: true
                } 
            },
            AlunoMonitoria : {
                select : {
                    id: true,
                    Aluno: {
                        select: {
                            nome: true
                        }
                    }
                
                } 
            },
            Colaborador: { 
                select: {
                    nome: true
                }
            }
        }
    });
    let perfil = { 
            "nome_aluno": monitoria?.AlunoMonitoria[0].Aluno.nome,
            "nome_professor": monitoria?.Colaborador.nome,
            "nome_disciplina": monitoria?.Disciplina.nome,
            "horario_monitoria": monitoria?.horario,
            "email_contato": monitoria?.AlunoMonitoria[0].Aluno.nome
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

const solicitarVagaMonitoria: RequestHandler = async (req, res) => {
    const {
        matricula_aluno, 
        codigo_disciplina, 
        motivo,
        monitor_recomendado
         } = req.body;

        const solicitacaoMonitoria = await client.solicitacaoMonitoria.create({
        data:{
            matricula_aluno: matricula_aluno,
            codigo_disciplina: codigo_disciplina,
            motivo: motivo,
            monitorRecomendado: monitor_recomendado,
            status: 1
        }
            
    })
    // let perfil = {
    //     "nome_aluno": "meunomeéjoao",
    //     "email": "joao@email.com",
    //     "matricula": "12387878",
    //     "e_monitor": true
    // }
    res.status(201).send("ok")
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
    solicitarVagaMonitoria
}