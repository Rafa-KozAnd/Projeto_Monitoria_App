
import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";


export const authenticate: RequestHandler = async (req, res, next) => {
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
      return res.status(401).send("usuario não autorizado para realizar esta ação!")
    }
    return next();
  } catch(err) {
    return res.status(401).json({ message: "Sessão expirada, realize login novamente na plataforma." });
  }
}