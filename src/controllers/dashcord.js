
const getSolicitacoes = (req, res) => {
    res.status(200).send("get pagina inicial coordenação")
}

const postSolicitacoes = (req, res) => {
    res.status(200).send({msg:"post pagina inicial coordenação"})
}

const deleteSolicitacoes = (req, res) => {
    res.status(200).send({msg:"delete inicial coordenação"})
}


const getAlunos = (req, res) => {
    res.status(200).send("get alunos pendentes")
}

const postAlunos = (req, res) => {
    res.status(201).send({msg:"post alunos pendentes"})
}

const putAlunos = (req, res) => {
    res.status(201).send({msg:"post alunos pendentes"})
}

module.exports = {
    getSolicitacoes,
    postSolicitacoes,
    deleteSolicitacoes,
    getAlunos,
    postAlunos,
    putAlunos
}