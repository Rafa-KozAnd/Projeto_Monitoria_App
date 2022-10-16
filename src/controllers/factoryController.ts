import { RequestHandler } from "express"
import { client } from '../../prisma/client';
import {hash, compare } from 'bcryptjs';

//TODO: Remover esse controller depóis de ser usado
const createAluno : RequestHandler = async (req, res) => {
    const {
        matricula,
        nome,
        senha,
        email,
        telefone,
    } = req.body;
    const senhaHash = await hash(senha, 8);
    console.log("senha: ", senhaHash);
    const aluno = {
        matricula: matricula,
        senha: senhaHash,
        nome: nome,
        email: email,
        telefone: telefone,
        e_monitor: false
    }

    try {
        await client.aluno.create({
            data:aluno
        })
        res.send('Aluno criado com sucesso!');
    
      } catch (error) {
        console.log("Erro ao inserir aluno")
        console.log(error); 
        res.send("error")
      }
}

export {
    createAluno
}