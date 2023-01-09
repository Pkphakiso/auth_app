import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  // the promise to say return users {many}
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({select:{id: true,email:true}});
  }
  // The promise is to say return a user {one}
  async create(createUserDto: CreateUserDto):Promise<User> {

    const {email, password,firstname , username } = createUserDto;
        
    const hashed = await this.hashPassword(password);
    const user = this.usersRepository.create({ email , password:hashed , firstname , username });

    return this.usersRepository.save(user);
    // return this.usersRepository.save(createUserDto);
  }

  async findUserEmail(email: string){
    return await this.usersRepository.findOne({where:{ email}});
  }

  async findUsers( id ){
    return await this.usersRepository.find({select:{id: true,email:true}}); // this is to get only the selected fields
  }

  async hashPassword(password:string){
    const saltOrRounds=10;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    return hashPassword;
  }
  async comparePassword( args:{ password:string, hash: string} ){
    return await bcrypt.compare(args.password, args.hash);
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
