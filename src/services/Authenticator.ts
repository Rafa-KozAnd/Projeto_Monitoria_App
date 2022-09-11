import { User , Aluno, Colaborador} from './Aluno'
import { json } from 'body-parser';
import { jwt, sign } from 'jsonwebtoken';
export class Authenticator{

    public static async authenticateAluno( user: User) : Promise<{}>{
        console.log("inside")
        const login = await user.login()
        const user_id = user.id;
        const secret_key = await process.env.SECRETTOKEN;
        console.log(secret_key);
        console.log("outside")
        if (login["valid"] == true){
            console.log("generating token")
            console.log();
            const token = await sign({ user_id, secret_key }, process.env.SECRETTOKEN, {
                expiresIn: 300 // expires in 5min
            });
            
            console.log(token);

            return {
                "valid": true,
                "token": token,
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