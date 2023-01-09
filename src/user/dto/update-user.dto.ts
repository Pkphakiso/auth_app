import { IsEmail, IsInt, IsString } from "class-validator";


export class UpdateUserDto {
    
    @IsInt()
    id: number;
    
    @IsString()
    firstname: string;

    @IsString()
    username: string;

    @IsEmail()
    email: string

    @IsString()
    password: string

}