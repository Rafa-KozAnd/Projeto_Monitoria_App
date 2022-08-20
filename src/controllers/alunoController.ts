import { RequestHandler } from 'express';
import { client } from '../../prisma/client'
import { AlunoMonitoriaScalarFieldEnum } from '@prisma/client';
const { time } = require("console")

const getVagasMonitoria: RequestHandler = async (req, res) => {
    // const {monitoria} = req.body;
    const vagasMonitorias = await client.vagaMonitoria.findMany({
        select: {
            id:true,
            monitoria: {
                disciplina: {
                    nome: true,
                    codigo_disciplina: true,
                    pre_requisito: true,
                    colaborador: {
                        nome:true,
                    }
                }
            }
        }
    })

    var monitoriasmap : any[] = []
    for  ( let vagaMonitoria of vagasMonitorias){
        monitoriasmap.push(
            {
                "nome_disciplina" : vagaMonitoria.monitoria.nome_disciplina,
                "nome_professor": vagaMonitoria.monitoria.disciplina.colaborador.nome,
                "codigo_disciplina" : vagaMonitoria.disciplina.codigo_disciplina,
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
            disciplina:{
                nome:true,
                colaborador: {
                    nome:true
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
        where: { matricula_aluno: matricula_aluno}
            
    })

    var agendamentosMap : any[] = []
    for  ( let agendamento of agendamentos){
        agendamentosMap.push(
            {
                "horario" : agendamento.horario,
                "nome_aluno": agendamento.aluno.nome,
                "nome_disciplina" : agendamento.monitoria.disciplina.nome_disciplina           }
        )
    }

    let monitoriasJson = {"vagas_monitorias": agendamentosMap}

    res.status(201).send(monitoriasJson)
}

const getPerfil: RequestHandler = async (req, res) => {
    const { matricula_aluno } = req.body;

    const aluno = await client.aluno.findFirst({
        where:  {matricula : matricula_aluno }
    })

    let perfil = {
        "nome_aluno": aluno.nome,
        "email": aluno.email,
        "matricula": aluno.matricula,
        "e_monitor": aluno.e_monitor
    }
    res.status(201).send(perfil)
}

const getMonitorias: RequestHandler = (req, res) => {
    const {matricula} = req.body;
    const monitorias = await client.monitoria.findMany({
        select: {
            id: true,
            disciplina:{
                nome:true,
                monitoria: {
                    alunoMonitoria : {
                        aluno:{
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
                "nome_monitor": monitoria.disciplina.alunoMonitoria.aluno.nome,
                "codigo_disciplina" : monitoria.disciplina.codigo_disciplina,
            }
        )

    
    res.status(201).send(monitoriasmap)
}

const getMonitoria: RequestHandler = async (req, res) => {
    const { id_monitoria } = req.body;

    const monitoria = await client.monitoria.findFirst({
        where: { id: id_monitoria }
    })
    let perfil = { 
            "nome_aluno": monitoria.alunoMonitoria.aluno.nome,
            "nome_professor": monitoria.colaborador.nome,
            "nome_disciplina": monitoria.disciplina.nome,
            "horario_monitoria": monitoria.horario,
            "email_contato": monitoria.alunoMonitoria.aluno.nome
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

const solicitarVagaMonitoria: RequestHandler = (req, res) => {
    let perfil = {
        "nome_aluno": "meunomeéjoao",
        "email": "joao@email.com",
        "matricula": "12387878",
        "e_monitor": true
    }
    res.status(201).send(perfil)
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