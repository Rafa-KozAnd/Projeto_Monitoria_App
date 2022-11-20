import { randomUUID } from 'crypto';
import { RequestHandler } from 'express';
import { client } from '../../prisma/client'
import { decode } from 'jsonwebtoken';
import {Aluno, User} from '../services/Aluno'
import {Authenticator} from '../services/Authenticator'
const { time } = require("console")

const dias = {
    0:'Domingo',
    1:'Segunda',
    2:'Terca',
    3:"Quarta",
    4:"Quinta",
    5:"Sexta",
    6:"Sabado"
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    result.setHours(0);
    result.setMinutes(0);
    return result;
}

function addMinutes(date, minutos) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes()+ minutos);
    return result;
}

function timeBetween(_input_date, _initial_date, _minutes){
    const input_date = new Date(_input_date);
    const initial_date = new Date(_initial_date);
    if (
        input_date >= input_date &&
        input_date <= addMinutes(initial_date, _minutes)
    ) {
        return true
    }
    else false
}

const getPreRequisitos : RequestHandler = async (req, res) => {
    const { id_solicitacao } = req.body;
    try {
        const pre_requisito = await client.vaga_monitoria.findFirst({
            where: {
                id: id_solicitacao
            },
            select: {
                pre_requisito: true
            }
        })
        console.log(pre_requisito)
        res.status(200).json({pre_requisito})
    }catch(err) {
        res.status(403).json({message: err.message})
    }
}

const getVagasMonitoria: RequestHandler = async (req, res) => {
    const { my } = req.body;

    const vagasMonitorias = await client.vaga_monitoria.findMany({
        where: {
            NOT: {
                vaga_aluno_monitoria: {
                    some: {
                        matricula_aluno: my
                    }   
                }
            }
        },
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
                "id": vaga_monitoria.id,
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

const postVagaCandidatar: RequestHandler = async (req, res) => {
    const { vaga, my } = req.body;
    try {
        const nova_candidatura = await client.vaga_aluno_monitoria.create({
            data: {
                id_vaga: vaga,
                matricula_aluno: my,
                status: 0,
            }
        })
        if(nova_candidatura) {
            return res.status(200).json({message: 'Candidatura realizada com sucesso.'})
        }
    }catch(err) {
        console.log(err);
        return res.status(500).json({message: 'Houve um erro ao tentar realizar a candidatura, tente novamente mais tarde.'})
    }
}

const getMinhasMonitorias: RequestHandler  = async (req, res) => {
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

const getAgendamentos: RequestHandler = async (req, res) => {
    const { my } = req.body;

    const agendamentos = await client.agendamento.findMany({
        where: { 
            matricula_aluno: my,
            NOT: {
                status:"Cancelado"
            }
        },
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
    const { matricula} = req.body;

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
            "id_monitoria":monitoria?.id,
            "nome_aluno": monitoria?.aluno_monitoria[0].aluno.nome,
            "nome_professor": monitoria?.colaborador.nome,
            "nome_disciplina": monitoria?.disciplina.nome,
            "horario_monitoria": monitoria?.horario,
            "email_contato": monitoria?.aluno_monitoria[0].aluno.email
        } 
    res.status(201).send(perfil)
}

const getAgendamentoMonitoriaAluno: RequestHandler  = async (req, res) => {
    const {my} = req.body;
    const today = new Date();
    const hoje = await today.getDate()
    const amanha = await today.getDate() + 1
    
    console.log(today);
    const agendamentos_data = await client.agendamento.findMany({
        where:{
            horario: {
                lte: addDays(today,1),
                gte: addDays(today,0),
              },
            matricula_aluno: my
        },
        include:{
            monitoria: {
                include : {
                    aluno_monitoria: {
                        include: {
                            aluno:true
                        }
                    }
                }
            }
        }
    });



    console.log(agendamentos_data);
    var agendamentos : any[] = []
    for  ( let agendamento of agendamentos_data){
        agendamentos.push(
            {
                "nome_monitor": agendamento.monitoria.aluno_monitoria[0].aluno.nome,
                "horario" : agendamento.horario,
                "matricula_aluno": agendamento.monitoria.aluno_monitoria[0].aluno.matricula,
                "status": agendamento.status
            }
        )
    }

    let agendamentos_json = {agendamentos}

    return res.status(201).send(agendamentos_json)
}

const getAgendamentoMonitoriaMonitor: RequestHandler  = async (req, res) => {
    const {my} = req.body;
    const {id_monitoria} = req.params;
    const today = new Date();
    const hoje = await today.getDate()
    const amanha = await today.getDate() + 1
    
    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        result.setHours(0);
        result.setMinutes(0);
        return result;
    }
    const agendamentos_data = await client.agendamento.findMany({
        where:{
            horario: {
                lte: addDays(today,1),
                gte: addDays(today,0),
              },
            monitoria: {
                    id: parseInt(id_monitoria),
                    aluno_monitoria: {
                        some: {
                            matricula_aluno: my
                        }
                    }     
            },
            NOT: {
                status:"Cancelado"
            }
        },
        include:{
            aluno:true,
            monitoria: {
                include : {
                    aluno_monitoria: {
                        include: {
                            aluno:true
                        }
                    }
                }
            }
        }
    });
    


    var agendamentos : any[] = []
    for  ( let agendamento of agendamentos_data){
        agendamentos.push(
            {
                "id_agendamento": agendamento.id,
                "nome_aluno": agendamento.aluno.nome,
                "horario" : agendamento.horario,
                "matricula_aluno": agendamento.aluno.matricula,
                "status": agendamento.status
            }
        )
        console.log(agendamento.monitoria.aluno_monitoria[0].aluno.nome);
    }

    let agendamentos_json = {agendamentos}

    return res.status(201).send(agendamentos_json)
}

const getHorariosDisponiveis: RequestHandler = async(req,res) => {
    const { my } = req.body;
    const { id_monitoria} = req.params;
    const today = new Date(Date.now());

    const agendamentos = await client.agendamento.findMany({
        where: {
            id_monitoria: parseInt(id_monitoria),
            NOT:{
                status:"Cancelado"
            }
        }
    });

    const monitoria = await client.monitoria.findFirst({
        where :{
            id: parseInt(id_monitoria)
        }
    })
    const horario_monitoria = new Date(monitoria.horario)
    const result = []

    if(monitoria.dia != dias[today.getDay()]){
        console.log("não e esse dia")
        res.status(202).send({horarios:result})
        return
    }
    let horario_inicial = horario_monitoria;
    while(horario_inicial <= addMinutes(horario_monitoria,180)){
        let hora_nova = horario_inicial.getHours().toString();
        let minutos_novo = horario_inicial.getMinutes().toString();
        if (minutos_novo.length < 2){
            minutos_novo = minutos_novo + "0";
        }
        if (hora_nova.length < 2){
            hora_nova = "0" + hora_nova; 
        }
        result.push(hora_nova + ":"+ minutos_novo)
        horario_inicial = addMinutes(horario_inicial,30);
    }
    for  ( let agendamento of agendamentos){
        const horarios_agendamento= new Date(agendamento.horario);
        let hora = new Date(agendamento.horario).getHours().toString();
        let minutos = new Date(agendamento.horario).getMinutes().toString();
        if (minutos.length < 2){
            minutos = minutos + "0";
        }
        if (hora.length < 2){
            hora = "0" + hora; 
        }
        result.forEach(v => {
            if ((hora+":"+ minutos).match(v)) {
                result.splice(result.indexOf(v),1)
            }
          });
    }    
    res.status(202).send({horarios:result})
    return
}

const aprovarSolicitacaoAgentamento: RequestHandler  = async (req, res) => {
    const id_agendamento = req.body["id_agendamento"]
    try {
        await client.agendamento.update({
            where : {
                id: parseInt(id_agendamento)
            },
            data:{
                status:"Aprovado"
            }
        })
    } catch (error) {
        res.status(400).send({msg:`Não foi possivel atualizart o status`})
        console.log(error)
    }
    
    res.status(200).send({msg:`sAgendamento confirmado com sucesso`})
}


const cancelarAgendamento: RequestHandler  = async (req, res) => {
    const id_agendamento = req.body["id_agendamento"]
    try {
        await client.agendamento.update({
            where : {
                id: parseInt(id_agendamento)
            },
            data:{
                status:"Cancelado"
            }
        })
    } catch (error) {
        res.status(400).send({msg:`Não foi possivel atualizart o status`})
        console.log(error)
    }
    
    res.status(200).send({msg:`sAgendamento cancelado com sucesso`})
}

const agendarMonitoria: RequestHandler = async (req, res) => {
    const { id_monitoria, horario , my} = req.body;
    // const dias = {
    //     0:'Domingo',
    //     1:'Segunda',
    //     2:'Terca',
    //     3:"Quarta",
    //     4:"Quinta",
    //     5:"Sexta",
    //     6:"Sabado"
    // }
    const monitoria = await client.monitoria.findFirst({
        where: {
            id: parseInt(id_monitoria)
        },
        include: {
            agendamento: true
        }
    });

    if (!monitoria){
        console.log("monitoria inexistente")
        res.status(404).send('{"message": "monitoria não existe"}')
        return 
    }
    const data_entrada = new Date(horario);
    const data_hoje = new Date(Date.now());
    
    const dia_entrada = data_entrada.getDay();
    const dia_hoje = data_hoje.getDay();
    console.log(monitoria);
    console.log(dia_hoje);
    if(dias[dia_hoje] == monitoria.dia ){
        // Verifica se o horario da monitoria esta disponivel
        // 1 - Pega os agendamentos da disciplina no dia de hoje
        const agendamentos = await client.agendamento.findMany({
            where: {
                id_monitoria: parseInt(id_monitoria),
                horario:
                {
                    lte: addMinutes(data_entrada,120),
                    gte: addMinutes(data_entrada,0)
                }
            }
        })
        const horario_solicitado = data_entrada.getHours()
        if(agendamentos){
            for  ( let agendamento of agendamentos){
                const date = new Date(agendamento.horario);
                if (
                    timeBetween(horario_solicitado, date, 30)
                ){
                    console.log("horario ja esta reservado");
                    res.status(404).send('{"message": "horario ja esta agendado"}')
                    return
                }
            }        
        }
        try {
            console.log("Pode agendar")
            const novo_agendamento_data = {
                    horario:  data_entrada,
                    agendamento: "a",
                    id_monitoria:parseInt(id_monitoria),
                    matricula_aluno: my 
            }
            const novo_agendamento = await client.agendamento.create({
                data:novo_agendamento_data
            });
            client.monitoria
            console.log("Agendamento marcado com sucesso");
        } catch (error) {
            console.log(error)
            res.status(404).send('{"message": "Algo ocoorreu durante a criacao do agendamento"}')
            return
        }

        // 2 - Verifica se o horario esta dentro da time-range da monitoria
        // 3 - Cria o agendamento
        res.status(202).send('{"message": "agendou"}')
        return
    }
    else{
        console.log("Não pode agendar por conta do dia")
        res.status(202).send('{"message": "nao agendou"}')
        return
    }
    // const dia_agendamento = new Date()
    // let perfil = {
    //     "nome_aluno": "meunomeéjoao",
    //     "email": "joao@email.com",
    //     "matricula": "12387878",
    //     "e_monitor": true
    // }
    // res.status(201).send(perfil)
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

const getCandidaturas: RequestHandler = async (req, res) => {
    const {my} = req.body;


    const candidaturas = await client.vaga_aluno_monitoria.findMany({
        where: {
            matricula_aluno: my,
        },
        select: {
            status: true,
            motivo: true,
            vaga_monitoria: {
                select: {
                    disciplina: {
                        select: {
                            nome: true,
                        }
                    }
                } 
            }
        }
    })

    var candidaturasJson : any[] = []
    for  ( let candidatura of candidaturas){
        candidaturasJson.push(
            {
                "nome_disciplina": candidatura?.vaga_monitoria.disciplina.nome,
                "status": candidatura?.status,
                "motivo": candidatura?.motivo,
            }
        )
    }

    let candidaturasformat = {candidaturasJson}

    return res.status(201).send(candidaturasformat)
}

export {
    getVagasMonitoria,
    postVagaCandidatar,
    getMinhasMonitorias,
    getAgendamentoMonitoriaAluno,
    aprovarSolicitacaoAgentamento,
    getAgendamentoMonitoriaMonitor,
    cancelarAgendamento,
    getAgendamentos,
    getPerfil,
    getMonitorias,
    getMonitoria,
    agendarMonitoria,
    sugerirMonitoria,
    getPreRequisitos,
    getCandidaturas,
    getHorariosDisponiveis
}