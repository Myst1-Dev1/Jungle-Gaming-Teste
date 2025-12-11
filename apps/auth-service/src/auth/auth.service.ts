/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private users: UserService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const exists = await this.users.findByEmail(dto.email);
      if (exists) throw new ConflictException('Email already in use');

      const hashed = await bcrypt.hash(dto.password, 10);

      const user = await this.users.create({
        email: dto.email,
        username: dto.username,
        password: hashed,
      });

      return this.generateTokens(user.id, user.email, user.username);
    } catch (error) {
      throw new BadRequestException(
        'Tivemos um erro ao cadastrar um usuário',
        error,
      );
    }
  }

  async login(dto: LoginDto) {
    const user = await this.users.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    return this.generateTokens(user.id, user.email, user.username);
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwt.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      return this.generateTokens(payload.sub, payload.email, payload.username);
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private generateTokens(id: string, email: string, username: string) {
    const payload = { sub: id, email, username };

    const accessToken = this.jwt.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwt.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
      user: { id, email, username },
    };
  }

  async validate(id: string) {
    const user = await this.users.findById(id);
    if (!user) return null;

    const { password, ...rest } = user;
    return rest;
  }
}
