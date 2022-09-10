import { client } from '../../prisma/client'
import { alunoLogin } from '../controllers/authController';
import {hash, compare } from 'bcryptjs';

export class User{
    public id: string
    senha: string
    constructor(_id, _senha){
        this.id = _id;
        this.senha = _senha;
    }
    
    public async login(): Promise<{}>{
        return {};
    }
}


export class Aluno extends User {
    matricula: string
    
    constructor(_matricula, _senhaHash){
        super(_matricula, _senhaHash);
    }
    
    public async login(): Promise<{}>{
        console.log(this.senha)
        try {
            const aluno = (await client.aluno.findFirst({
                where:{matricula: this.id}
            }))
            const _senha = aluno.senha;
  
            if (await compare(this.senha, _senha)){
                return {
                        "valid":true,
                        "eh_monitor": aluno.e_monitor};
            }
            else{
                return false;
            }
        } catch (error) {
            console.log("Erro ao efetuar login")
            return false
        }
    }

}

export class Colaborador extends User{

    public async login(): Promise<{}>{
        try {
            const colaborador = (await client.colaborador.findFirst({
                where:{cpf: this.id}
            })).senha
            const _senha = colaborador.senha;
            // const senhaHash = await hash(_senha, 8);
            if (await compare(this.senha, _senha)){
                return true;
            }
            else{
                return {
                    "valid":false,
                    "role": colaborador.role
                }
            }
        } catch (error) {
            console.log("Erro ao efetuar login")
            return false
        }
    }
}
