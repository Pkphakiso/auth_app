import { IsEmail, IsString } from "class-validator";


export class CreateUserDto {

    @IsString()
    firstname: string;

    @IsString()
    username: string;

    @IsEmail()
    email: string

    @IsString()
    password: string
}
