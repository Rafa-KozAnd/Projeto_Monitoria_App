import { RequestHandler } from "express"
import { v4 as uuidv4 } from 'uuid';
import {Authenticator} from "../services/Authenticator"
import {Aluno, Colaborador} from "../services/Aluno"
import { client } from "../../prisma/client";
import { decode, sign } from 'jsonwebtoken';

export const alunoLogin: RequestHandler = async (req, res) => {
  const {
      matricula,
      senha
  } = req.body;
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

export const refresh: RequestHandler  = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        const { user_id } = await client.refresh_token.findFirst({where: {token: refreshToken}});
        if(user_id) {
            const secret_key = process.env.SECRETTOKEN;
            const newToken = sign({ user_id,  secret_key }, secret_key, {
                expiresIn:  60  // expires in 5min
            });
            const { token : newRefreshToken } = await client.refresh_token.update({where: {user_id}, data: {token: uuidv4()}})
            return res.status(200).send({token: newToken, refreshToken: newRefreshToken});
        }
    }catch(err) {
        res.status(401).send("Invalid refresh token")
    }
}

export const me: RequestHandler  = async (req, res) => {
    const { authorization : token } = req.headers;
    try {
        const result = decode(token);
        if(result["user_role"] ==  "Professor"  || result["user_role"] == "Coordenador") {
            const colaboradorExists = await client.colaborador.findFirst({where: {cpf: result["user_id"]}})
            if(colaboradorExists) {
                res.status(200).json({role: colaboradorExists.role, nome: colaboradorExists.nome, matricula: colaboradorExists.cpf})
            }
        }else {
            const alunoExists = await client.aluno.findFirst({where: {matricula: result["user_id"]}})
        }
    }catch(err) {
        console.log(err);
        res.status(401).send("Invalid token")
    }
}

