
import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { client } from '../../prisma/client'

export const authenticateAluno: RequestHandler = async (req, res, next) => {
  const { authorization } = await req.headers;
  const { user_id } = await req.body;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  const [, token] = await authorization.split(".");
  console.log(token);
  try {
    const decoded = verify(authorization, `${process.env.SECRETTOKEN}`)
    console.log(decoded.user_id);
    req.body.user_id = decoded.user_id;
    console.log(req.body.user_id );
   // TODO :  Verificar como iremos separar os professores dos alunos
    // const aluno = await client.aluno.findFirst({
    //   where:  {matricula : user_id }
    // });

    return next();
  } catch(err) {
    return res.status(401).json({ message: "Sessão expirada, realize login novamente na plataforma." });
  }
}


export const authenticateProfessor: RequestHandler = async (req, res, next, ROLE="professor") => {
  const { authorization } = await req.headers;
  const { user_id } = await req.body;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  const [, token] = await authorization.split(".");
  console.log(token);
  try {
    const decoded = verify(authorization, `${process.env.SECRETTOKEN}`)
    console.log(decoded.user_id);
    req.body.user_id = decoded.user_id;
 
    const colaborador = await client.colaborador.findFirst({
      where:  {cpf : user_id }
    });

    if (colaborador.cpf == req.body.user_id )
    {
      return;
    }

    return next();
  } catch(err) {
    return res.status(401).json({ message: "Sessão expirada, realize login novamente na plataforma." });
  }
}