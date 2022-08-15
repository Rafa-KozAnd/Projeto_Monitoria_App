import { RequestHandler } from 'express';
import { client } from '../../prisma/client'


const getSolicitacoes: RequestHandler  = async (req, res) => {
    let cpfProfessor = "07337326993" //alguma meneira de saber quem ta logado
    
    try {
        const solicitacoesAlunos = await client.vagaAlunoMonitoria.findMany({
            where: {
                VagaMonitoria: {
                    status: 1,
                    professor_requisitante: cpfProfessor
                }
            },
            select: {
                matricula_aluno: true,
                id_vaga: true,
                Aluno: {
                    select: {
                        email: true
                    }
                },
                VagaMonitoria: {
                    select: {
                        Disciplina: {
                            select: {
                                nome: true
                            }
                        }
                    }
                }
            }
        })

        const solicitacoesAlunosJson : any[] = []
        
        for (var solicitacaoAluno of solicitacoesAlunos) {
            solicitacoesAlunosJson.push
            ( {
                "id": solicitacaoAluno.id_vaga,
                "matriculaAluno": solicitacaoAluno.matricula_aluno,
                "disciplinaDesejada": solicitacaoAluno.VagaMonitoria.Disciplina.nome,
                "emailAluno": solicitacaoAluno.Aluno.email
            })
        }

        var solicitacoesAlunosFormat = {"solicitacoes": solicitacoesAlunosJson}
        
        res.status(200).json(solicitacoesAlunosFormat)

    }catch(err) {
        res.status(500).json({message: 'Houve um erro ao tentar logar, tente novamente mais tarde.'})
    }
}

const aprovaSolicitacoes: RequestHandler = (req, res) => {
    res.status(200).json({id_solicitacao:"gf34sezvoh6"})
}

const reprovaSolicitacoes: RequestHandler = (req, res) => {
    res.status(200).json({comentario:"aluno burro",id_solicitacao: "gf34sezvoh6"})
}


const getVagas: RequestHandler = async (req, res) => {
    res.status(200).json({solicitacoesAbertura:[
        {id: 'dksoaoasdkp', matriculaAluno:"gfressdzvoh6", disciplinaDesejada:"Probabilidade e Estatistica", monitorRecomendado:"Eu mesmo", motivoSolicitacao:"Dificuldade na materia"}
    ]})
    client.solicitacaoMonitoria.findMany({
        where: {
            
        }
    })


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