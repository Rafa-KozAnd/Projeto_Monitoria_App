
const getSolicitacoes = (req, res) => {
    res.status(200).send("get Solicitacoes")
}

const postSolicitacoes = (req, res) => {
    res.status(200).send({msg:"post Solicitacoes"})
}

const deleteSolicitacoes = (req, res) => {
    res.status(200).send({msg:"delete Solicitacoes"})
}


const getMonitores = (req, res) => {
    res.status(200).send("get monitores")
}

const postMonitores = (req, res) => {
    res.status(200).send({msg:"post monitores"})
}

const putMonitores = (req, res) => {
    res.status(200).send({msg:"put monitores"})
}

const deleteMonitores = (req, res) => {
    res.status(200).send({msg:"delete monitores"})
}


const getAbrirVaga = (req, res) => {
    res.status(200).send("get vagas")
}

const postAbrirVaga = (req, res) => {
    res.status(200).send({msg:"post vagas"})
}

module.exports = {
    getSolicitacoes,
    postSolicitacoes,
    deleteSolicitacoes,
    getMonitores,
    postMonitores,
    putMonitores,
    deleteMonitores,
    getAbrirVaga,
    postAbrirVaga
}