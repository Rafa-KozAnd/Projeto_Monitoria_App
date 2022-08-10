const { time } = require("console")

const getVagasMonitoria = (req, res) => {
    let monitorias = [
        {
            "nome_disciplina" : "computação em nuvem",
            "nome_professor": "vasco",
            "codigo_disciplina" : "123451000",
            "pre_requisito": "ser aluno inteligente comprometido com a verdade"
        }
    ]
    res.status(200).send(monitorias)
}

const getMinhasMonitorias = (req, res) => {
    let monitorias = [
        {
            "nome_disciplina" : "computação em nuvem",
            "nome_professor": "vasco",
            "codigo_disciplina" : "123451000",
        }
    ]
    res.status(201).send(monitorias)
}

const getAgendamentoMonitoria = (req, res) => {
    let response = {
        "nome _aluno": "hedison",
        "horario" : Date.now(),
        "matricula_aluno": "123451000",
        "status": 0
    }
    res.statur(201).send(response)
}

const finalizarSolicitacaoAgentamento = (req, res) => {
    let id = req.id_solicitacao
    res.status(200).send({msg:`solicitacao  ${id} finalizada`})
}

const removerAgendamento = (req, res) => {
    let id = req.id_solicitacao
    res.status(200).send({msg:`solicitacao de agendamento ${id} removida`})
}

const getAgendamentos = (req, res) => {
    let reunioes =  [ 
        {
            "horario":  Date.now(),
            "nome_aluno": "Hedis1" ,
            "nome_disciplina": "strindisciplina1" 
        },
        {
            "horario":  Date.now() ,
            "nome_aluno": "Hedis2" ,
            "nome_disciplina": "strindisciplina2g2" 
        },
            ] 
    res.status(201).send(reunioes)
}

const getPerfil = (req, res) => {
    let perfil = {
        "nome_aluno": "meunomeéjoao",
        "email": "joao@email.com",
        "matricula": "12387878",
        "e_monitor": true
    }
    res.status(201).send(perfil)
}

const getMonitorias = (req, res) => {
    let response = {
        monitorias : [
            {
                "nome_disciplina" : "inteligencia aritficial",
                "nome_monitor": "hedison1",
                "codigo_disciplina" :"10002323"
            },
            {
                "nome_disciplina" : "javascript ",
                "nome_monitor": "hedison12",
                "codigo_disciplina" :"10003323"
            },
            {
                "nome_disciplina" : "inteligencia orientada a objetos",
                "nome_monitor": "hedison13",
                "codigo_disciplina" :"34234234"
            },
        ]
    }
    res.status(201).send(response)
}

const getMonitoria = (req, res) => {
    let perfil = {
        "nome_aluno": "meunomeéjoao",
        "email": "joao@email.com",
        "matricula": "12387878",
        "e_monitor": true
    }
    res.status(201).send(perfil)
}

const agendarMonitoria = (req, res) => {
    let perfil = {
        "nome_aluno": "meunomeéjoao",
        "email": "joao@email.com",
        "matricula": "12387878",
        "e_monitor": true
    }
    res.status(201).send(perfil)
}

const solicitarVagaMonitoria = (req, res) => {
    let perfil = {
        "nome_aluno": "meunomeéjoao",
        "email": "joao@email.com",
        "matricula": "12387878",
        "e_monitor": true
    }
    res.status(201).send(perfil)
}

module.exports = {
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