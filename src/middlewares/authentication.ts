
import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { client } from '../../prisma/client'


interface JwtPayload {
  user_id: string
}

export const authenticateAluno: RequestHandler = async (req, res, next) => {
  const { authorization } = await req.headers;
  const { user_id } = await req.body;
  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  const [, token] = await authorization.split(".");
  try {
    const decoded = verify(authorization, `${process.env.SECRETTOKEN}`) as JwtPayload
    req.body.my = decoded.user_id;
   // TODO :  Verificar como iremos separar os professores dos alunos
    // const aluno = await client.aluno.findFirst({
    //   where:  {matricula : user_id }
    // });
    console.log("aaa")
    return next();
  } catch(err) {
    return res.status(401).json({ message: "Sessão expirada, realize login novamente na plataforma." });
  }
}


export const authenticaColaborador: RequestHandler = async (req, res, next) => {
  const { authorization } = await req.headers;
  const { user_id } = await req.body;
  
  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  const [, token] = await authorization.split(".");
  try {
    const decoded = verify(authorization, `${process.env.SECRETTOKEN}`) as JwtPayload
    req.body.my = await decoded.user_id;
 
    const colaborador = await client.colaborador.findFirst({
      where:  {cpf : req.body.my  }
    });
    console.log("aaa")

    if (!colaborador)
    {
      return res.status(401).json({ message: "Não autorizado" });
    }
    console.log(req.body.my)

    if (colaborador.cpf == req.body.my )
    {
      console.log("aaa")

      console.log(req.body.my)
      return next();
    }

    // return next();
  } catch(err) {
    return res.status(401).json({ message: "Sessão expirada, realize login novamente na plataforma.", code: "token.expired" });
  }
}