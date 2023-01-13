import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get, Post, Query } from '@nestjs/common';
import {passKey, emailFrom} from  './utils/constants';

@Controller('email')
export class EmailController {
    constructor(private mailService:MailerService){}

    @Post('plain-text-email')
    async plainTextEmail(@Query('toemail') toemail){
        // = 
        await this.mailService.sendMail({
            to: toemail,
            from: emailFrom,
            subject:' Simple Email Text',
            text:'welcom to my mail... This was sent',
            
        })
        //console.log(email);
        return "successfully sent";
    }
}
