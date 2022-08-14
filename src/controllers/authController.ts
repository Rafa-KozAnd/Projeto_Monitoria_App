import { RequestHandler } from "express"
import { v4 as uuidv4 } from 'uuid';

export const logIn: RequestHandler  = (req, res) => {
  res.status(200).json({user:{ role: 'Professor', nome: 'Joao Pedro'}})
}