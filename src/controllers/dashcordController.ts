import { RequestHandler } from 'express';

export const getSolicitacoes: RequestHandler  = (req, res) => {
    res.status(200).json({solicitacoes:[
        {Id:"as7ygtd87a8", nome_aluno: "Rafael", nome_disciplina: "Aplicação Mobile", email: "rafa@rafa.com"},
        {Id:"usahday8781", nome_aluno:  "Pedro", nome_disciplina: "Modelagem II", email: "pedrocomposto@gmail.com"}
        ]})
}

export const aprovaSolicitacoes: RequestHandler = (req, res) => {
    res.status(200).json({id_solicitacao:"usahday8781"})
}

export const reprovaSolicitacoes: RequestHandler = (req, res) => {
    res.status(200).json({comentario:"Aluno não foi aprovado na disciplina",id_solicitacao: "usahday8781"})
}

export const deleteSolicitacoes: RequestHandler = (req, res) => {
    res.status(200).json({id_abertura_monitoria:"usahday8781"})
}

export const getSolicitacoesPendentes: RequestHandler = (req, res) => {
    res.status(200).json({disciplinas:[
        {id_disciplina:"61gsa71214", nome_disciplina:"Banco de dados", monitores:[
            {nome_aluno:"Carol", email:"carol@gmail.com"}]},
        {id_disciplina:"f8grsd222d8", nome_disciplina:"Desenvolvimento de Software", monitores:[
            {nome_aluno:"Bob Marlei", email:"bobmarlei@gmail.com"},{nome_aluno:"Geraldo", email:"derivia@gmail.com"}]}
        ]})
}

module.exports = {
    getSolicitacoes,
    aprovaSolicitacoes,
    reprovaSolicitacoes,
    deleteSolicitacoes,
    getSolicitacoesPendentes
}