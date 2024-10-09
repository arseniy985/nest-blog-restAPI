import { IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class AuthDto {
    @ApiProperty()
    @IsString()
    @Length(4,20)
    name:string

    @ApiProperty()
    @IsString()
    @Length(4,40)
    password:string
}