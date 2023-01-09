import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
//import {jwtSecret} from  '../utils/constants';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService
       ){}

    async validateUser( email:string, password:string){ 
        const user = await this.userService.findUserEmail( email );  
        if(user && user.password=== password){
            return user;
        }
        return null;
    }
    
    async signup(dto:CreateAuthDto){
        const {email, password,firstname , username } = dto;
        // below to be corrected .. by me .. it is the correct way
        const foundUser = await this.userService.findUserEmail( email ); 
        if (foundUser){
            throw new BadRequestException("email exists");
        }
        const hashPassword = await this.hashPassword(password);
        // need to correct the hash
        //create new user
       const user = await this.userService.create({ email , password:hashPassword , firstname , username });

        return {message:"signup was succefull", hash:hashPassword , dto} ;
    }
    
    async signin(dto: CreateAuthDto,req:Request, res: Response){
        const {email, password}= dto;
        //const secret = jwtSecret test later
        const foundUser = await this.userService.findUserEmail( email ); 
        if (!foundUser){
            throw new BadRequestException("Wrong email credentials ... ");
        }

       const isMatch = await this.comparePassword({password, hash:foundUser.password});

        if(!isMatch){
            throw new BadRequestException("Wrong credentials ...");
        }

        //sign jwt and return to the user
        // there was a complaint about id being a number to string 
        
        const token = await this.signToken({id: foundUser.id, email: foundUser.email});

        if (!token){
            throw new ForbiddenException();
        }
        res.cookie('token', token)

      return res.send({message:"Logged in succefully"});
    }
    




    async signout(req:Request, res: Response){
        res.clearCookie('token');
      return res.send({message:"Logged out"});
    }

    async hashPassword(password:string){
        const saltOrRounds=10;
        const hashPassword = await bcrypt.hash(password, saltOrRounds);
        return hashPassword;
    }
    async comparePassword( args:{ password:string, hash: string}){
        return await bcrypt.compare(args.password, args.hash);
    }
    async signToken(args: {id:number,email:string}){
        const payload = args;
        return  this.jwtService.signAsync(payload,{secret: "secretKey"}); 
    }
}
