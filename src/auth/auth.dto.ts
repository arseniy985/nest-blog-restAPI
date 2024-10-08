import { IsString, Length } from "class-validator";


export class AuthDto {
    @IsString()
    @Length(4,20)
    name:string

    @IsString()
    @Length(4,40)
    password:string
}