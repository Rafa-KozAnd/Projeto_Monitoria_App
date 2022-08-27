import { RequestHandler } from 'express';

const getSolicitacoes: RequestHandler  = (req, res) => {
    res.status(200).json({solicitacoes:[
        {id:"fsm2vsgo1pr", matriculaAluno: "49239df", disciplinaDesejada: "Computação em nuvem", emailAluno: "joao@gmail.com"},
        {id:"sgg1pv5e18a", matriculaAluno:  "3fjk39sd", disciplinaDesejada: "Banco de Dados", emailAluno: "manoel@gmail.com"}
        ]})
    }

const aprovaSolicitacoes: RequestHandler = (req, res) => {
    res.status(200).json({id_solicitacao:"gf34sezvoh6"})
}

const reprovaSolicitacoes: RequestHandler = (req, res) => {
    res.status(200).json({comentario:"aluno burro",id_solicitacao: "gf34sezvoh6"})
}

const getVagas: RequestHandler = (req, res) => {
    res.status(200).json({solicitacoesAbertura:[
        {id: 'dksoaoasdkp', matriculaAluno:"gfressdzvoh6", disciplinaDesejada:"Probabilidade e Estatistica", monitorRecomendado:"Eu mesmo", motivoSolicitacao:"Dificuldade na materia"}
    ]})
}

const aprovaVaga: RequestHandler = (req, res) => {
    res.status(200).json({id_abertura_monitoria:"zvoresgo2v"})
}

const removeVaga: RequestHandler = (req, res) => {
    res.status(200).json({id_abertura_monitoria:"zvoresgo2v"})
}

const getMonitorias: RequestHandler = (req, res) => {
    res.status(200).json({disciplinas:[
        {idDisciplina:"as1d8f4q27", nomeDisciplina:"Banco de dados", monitores:[
            {nomeAluno:"Jeff Bancos", email:"jeffbancos@gmail.com"}]},
        {idDisciplina:"f8fvora1d8", nomeDisciplina:"Desenvolvimento Web Basico", monitores:[
            {nomeAluno:"Bob Web", email:"bobweb@gmail.com"},
            {nomeAluno:"Rodolfo html", email:"rodolf@gmail.com"}]}
        ]})
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