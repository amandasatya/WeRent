/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body('username') username:string, 
    @Body('email') email: string, 
    @Body('password') password: string) {
    return this.authService.register(username, email, password);
  }

  @Post('login')
  async login(
    @Body('email') email: string, 
    @Body('password') password: string) {
    return this.authService.login(email, password);
  }
}
