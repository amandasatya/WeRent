/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from './guard/jwt_auth.guard';
import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'Successfully registered' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Invalid request parameters',
  })
  @ApiBearerAuth()
  async register(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const result = await this.authService.register(username, email, password);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Successfully registered',
      data: result,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'User successfully logged in.' })
  @ApiBadRequestResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const result = await this.authService.login(email, password);
    return {
      statusCode: HttpStatus.OK,
      message: 'User Successfully login',
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'User successfully logged out.' })
  async logout(@Req() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'User successfully logged out',
    };
  }
}
