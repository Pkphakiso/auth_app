import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAuthDto {
   
    @IsString()
    firstname: string;

    @IsString()
    username: string;
    
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length( 3,10,{message:"password  must be 3 to 10 character long"})
    password: string;

}
