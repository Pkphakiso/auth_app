import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateAuthDto {
    
    @IsString()
    id: string;

    @IsEmail()
    @IsNotEmpty() 
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length( 3,10,{message:"password  must be 3 to 10 character long"})
    password:string;
}
