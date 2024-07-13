/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guard/jwt_auth.guard';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBearerAuth} from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'Successfully registered'})
  @ApiBadRequestResponse({ status: 400, description: 'Invalid request parameters'})
  @ApiBearerAuth()
  async register(
    @Body('username') username:string, 
    @Body('email') email: string, 
    @Body('password') password: string) {
    return this.authService.register(username, email, password);
  }

  @Post('login')
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'User successfully logged in.' })
  @ApiBadRequestResponse({ status: 401, description: 'Unauthorized'})
  async login(
    @Body('email') email: string, 
    @Body('password') password: string) {
    return this.authService.login(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiResponse({ status: 200, description: 'User successfully logged out.' })
  async logout(@Req() req: Request) {
    return { message: 'User successfully logged out'};
  }
}

