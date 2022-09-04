
import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";


export const authenticate: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  const [, token] = authorization.split(" ");
  try {
    verify(token, `${process.env.SECRET_TOKEN}`)
    return next();
  } catch(err) {
    return res.status(401).json({ message: "Sessão expirada, realize login novamente na plataforma." });
  }
}