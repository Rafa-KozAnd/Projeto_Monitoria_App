import { RequestHandler } from 'express';

const getSolicitacoes: RequestHandler  = (req, res) => {
    res.status(200).json({solicitacoes:[
        {Id:"fsm2vsgo1pr", nome_aluno: "Joao", nome_disciplina: "Computação em nuvem", email: "joao@gmail.com"},
        {Id:"sgg1pv5e18a", nome_aluno:  "Manoel", nome_disciplina: "Banco de Dados", email: "manoel@gmail.com"}
        ]})
}

const aprovaSolicitacoes: RequestHandler = (req, res) => {
    res.status(200).json({id_solicitacao:"gf34sezvoh6"})
}

const reprovaSolicitacoes: RequestHandler = (req, res) => {
    res.status(200).json({comentario:"aluno burro",id_solicitacao: "gf34sezvoh6"})
}

const getVagas: RequestHandler = (req, res) => {
    res.status(200).json({solicitacoes_abertura:[
        {id_aluno:"gfressdzvoh6", nome_disciplina:"Probabilidade e Estatistica", recomendacao_monitor:"Eu mesmo", motivo:"Dificuldade na materia"}]})
}

const aprovaVaga: RequestHandler = (req, res) => {
    res.status(200).json({id_abertura_monitoria:"zvoresgo2v"})
}

const removeVaga: RequestHandler = (req, res) => {
    res.status(200).json({id_abertura_monitoria:"zvoresgo2v"})
}

const getMonitorias: RequestHandler = (req, res) => {
    res.status(200).json({disciplinas:[
        {id_disciplina:"as1d8f4q27", nome_disciplina:"Banco de dados", monitores:[
            {nome_aluno:"Jeff Bancos", email:"jeffbancos@gmail.com"}]},
        {id_disciplina:"f8fvora1d8", nome_disciplina:"Desenvolvimento Web Basico", monitores:[
            {nome_aluno:"Bob Web", email:"bobweb@gmail.com"},{nome_aluno:"Rodolfo html", email:"rodolf@gmail.com"}]}
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