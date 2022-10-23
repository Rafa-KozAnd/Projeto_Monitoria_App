
import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";


export const authenticate: RequestHandler = async (req, res, next) => {
  const { authorization } = await req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  const [, token] = await authorization.split(".");
  try {
    verify(authorization, `${process.env.SECRETTOKEN}`)
    return next();
  } catch(err) {
    return res.status(401).json({ message: "Sessão expirada, realize login novamente na plataforma.", code: "token.expired" });
  }
}