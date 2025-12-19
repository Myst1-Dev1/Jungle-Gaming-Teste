import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private auth: AuthService) {}

  @MessagePattern('auth.register')
  async register(@Payload() dto: RegisterDto) {
    console.log('Auth Service recebeu REGISTER:', dto);
    try {
      return await this.auth.register(dto);
    } catch (err) {
      console.error('ERRO NO AUTH SERVICE REGISTER:', err);
      throw err;
    }
  }

  @MessagePattern('auth.login')
  async login(@Payload() dto: LoginDto) {
    console.log('Auth Service recebeu LOGIN:', dto);
    try {
      return await this.auth.login(dto);
    } catch (err) {
      console.error('ERRO NO AUTH SERVICE LOGIN:', err);
      throw err;
    }
  }

  @MessagePattern('auth.findAllUsers')
  async findAllUsers() {
    return await this.auth.findAllUsers();
  }

  @MessagePattern('auth.refresh')
  async refresh(@Payload() refreshToken: string) {
    try {
      return await this.auth.refresh(refreshToken);
    } catch (err) {
      console.error('ERRO NO AUTH SERVICE REFRESH:', err);
      throw err;
    }
  }

  @MessagePattern('auth.validate')
  validate(@Payload() id: string) {
    return this.auth.validate(id);
  }
}
