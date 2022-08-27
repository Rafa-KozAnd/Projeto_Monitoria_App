import { RequestHandler } from "express"
import { client } from '../../prisma/client';
import {hash, compare } from 'bcryptjs';

const createAluno : RequestHandler = async (req, res) => {
    const {
        matricula,
        nome,
        senha,
        email,
        telefone,
    } = req.body;

    const aluno = {
        matricula: matricula,
        senha: await hash(senha, 8),
        nome: nome,
        email: email,
        telefone: telefone,
        e_monitor: false
    }

    try {
        const senhaHash = await hash(senha, 8);
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