
import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { client } from '../../prisma/client'


interface JwtPayload {
  my: string
}

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
    const decoded = verify(authorization, `${process.env.SECRETTOKEN}`) as JwtPayload
    console.log(decoded.my);
    req.body.user_id = decoded.my;
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


export const authenticaColaborador: RequestHandler = async (req, res, next, ROLE="professor") => {
  const { authorization } = await req.headers;
  const { user_id } = await req.body;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  const [, token] = await authorization.split(".");
  try {
    const decoded = verify(authorization, `${process.env.SECRETTOKEN}`) as JwtPayload
    console.log(decoded.my);
    req.body.user_id = decoded.my;
 
    const colaborador = await client.colaborador.findFirst({
      where:  {cpf : user_id }
    });

    if (!colaborador)
    {
      return res.status(401).json({ message: "Não autorizado" });
    }

    if (colaborador.cpf == req.body.user_id )
    {
      return next();
    }

    return next();
  } catch(err) {
    return res.status(401).json({ message: "Sessão expirada, realize login novamente na plataforma.", code: "token.expired" });
  }
}