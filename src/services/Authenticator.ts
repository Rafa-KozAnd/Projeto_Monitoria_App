import { User } from './Aluno'
import { sign } from 'jsonwebtoken';
import { client } from '../../prisma/client';
export class Authenticator{
    public static async authenticateAluno( user: User) : Promise<{}>{
        const login = await user.login()
        const user_id = user.id;
        const secret_key = process.env.SECRETTOKEN;
        const user_role = login["role"]
        if (login["valid"] == true){
            const token = sign({ user_id, user_role, secret_key }, process.env.SECRETTOKEN, {
                expiresIn: 60 * 60 * 24 // expires in 5min
            });
            const {token : refreshToken} = await client.refresh_token.findFirst({where: {user_id}})
            return {
                "valid": true,
                "token": token,
                "refreshToken": refreshToken,
                "role": login["role"],
                "nome": login["nome"]
            }
        }
        else{
            return {
                "valid": false,
                "token": "invalid"
            }
        }
    }
}