import { User , Aluno, Colaborador} from './Aluno'


export class Authenticator{

    public static async  authenticateAluno( user: User){
        const login = await user.login()
        return login
    }

    
}