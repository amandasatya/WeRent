/* eslint-disable prettier/prettier */
import { Injectable, Logger, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}


  async register(username: string, email: string, password: string): Promise<any> {

    
    const existingUser =  await this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }]
      },
    });

      if(existingUser) {
        if (existingUser.username === username) {
          throw new ConflictException('Username already in use')
        } else {
          throw new ConflictException('Email already in use')
        }
      }
      
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.prisma.user.create({
        data: { username, email, password: hashedPassword },
      });

      const payload = { email: user.email, sub: user.id};
      const accessToken = this.jwtService.sign(payload)


      return {user, access_token: accessToken};
    } catch (error) {
      this.logger.error(`Failed to register user: ${error.message}`);
      throw error;
    }
  }


  async login(email: string, password: string): Promise<any> {

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}