import {AccessMode, accessMode, dto, include, mapTo, nested, readOnly, scope, transform, writeOnly} from "dto-mapper"

@dto()
export class AlunoDto{
    @include()
    id:number;



}

export class AlunoDtoo {
    matricula  : string;
    nome       : string;
    email      : string;
    telefone   : string;

}