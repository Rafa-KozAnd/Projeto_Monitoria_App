
import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { client } from '../../prisma/client'

export const authenticate: RequestHandler = async (req, res, next, role) => {
  const { authorization } = await req.headers;
  const { user_id } = await req.body;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  const [, token] = await authorization.split(".");
  console.log(token);
  try {
    decoded = verify(authorization, `${process.env.SECRETTOKEN}`)
    if ( decoded.user_id != user_id )
    {
      return res.status(401).send("usuario não autorizado para realizar esta ação!");
    }
    // TODO :  Verificar como iremos separar os professores dos alunos
    const aluno = await client.aluno.findFirst({
      where:  {matricula : user_id }
    });
    if ( aluno.role != role )
    {
      return res.status(401).send("Usuario não autorizado para realizar esta ação!");
    }
    return next();
  } catch(err) {
    return res.status(401).json({ message: "Sessão expirada, realize login novamente na plataforma." });
  }
}