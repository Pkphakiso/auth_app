import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './email.controller';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'auth_app',
      entities: [User],
      synchronize: true,
    }),
    AuthModule, 
    UserModule, 
    MailerModule.forRoot({ 
      transport: {
        host:'smtp.sendgrid.net',
        auth:{
          user:'apikey',
          pass:''
        }
      }    
    }), 
  ],

  controllers: [EmailController],
 
})
export class AppModule {}
//