import { compare } from "bcryptjs";
import { RequestHandler } from "express"
import { v4 as uuidv4 } from 'uuid';
import { client } from "../../prisma/client";

export const alunoLogin: RequestHandler  = (req, res) => {
  res.status(200).json({user:{ role: 'Professor', nome: 'Joao Pedro'}})
}

export const colaboradorLogin: RequestHandler  = async (req, res) => {
  const { matricula, senha } = req.body;
  try {
    const colaboradorAlreadyExists = await client.colaborador.findFirst({
      where: {cpf: matricula}
    })
    if (!colaboradorAlreadyExists) {
      return res.status(400).json({message: 'Usuário ou senha incorretos.'})
    }
    const passwordMatches = await compare(senha, colaboradorAlreadyExists.senha);

    if(!passwordMatches) {
      return res.status(400).json({message: 'Usuário ou senha incorretos.'})
    }

    res.status(200).json({user: {role: colaboradorAlreadyExists.role, nome: colaboradorAlreadyExists.nome}})
  }catch(err) {
    res.status(500).json({message: 'Houve um erro ao tentar logar, tente novamente mais tarde.'})
  }
}
