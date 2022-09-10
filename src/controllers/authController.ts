import { compare } from "bcryptjs";
import { RequestHandler } from "express"
import { v4 as uuidv4 } from 'uuid';
import {Authenticator} from "../services/Authenticator"
import {Aluno, Colaborador} from "../services/Aluno"


export const alunoLogin: RequestHandler = async (req, res) => {
  const {
      matricula,
      senha
  } = req.body;
  console.log("entuenticando");
  const aluno = new Aluno(matricula, senha)
  const validate = await Authenticator.authenticateAluno(aluno)
  if (validate["valid"] != true )
  {
      res.status(403).send(validate);
      return false
  }
  else{
      res.status(200).send(validate)
      return true;
  }
}

export const colaboradorLogin: RequestHandler  = async (req, res) => {
    const {
      matricula,
      senha
  } = req.body;
  console.log("entuenticando");
  const colaborador = new Colaborador(matricula, senha)
  const validate = await Authenticator.authenticateAluno(colaborador)
  if (validate["valid"] != true )
  {
      res.status(403).send(validate);
      return false
  }
  else{
      res.status(200).send(validate)
      return true;
  }
}
