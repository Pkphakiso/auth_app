import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto : CreateAuthDto){
    return this.authService.signup(dto);
  }
  @Post('signin')
  async signin(@Body() dto:CreateAuthDto, @Req() req, @Res() res){
    return this.authService.signin(dto, req, res);
  }
  @Get('signout')
  async signout(@Req() req , @Res() res){
    return this.authService.signout(req, res);
  }
  
}
