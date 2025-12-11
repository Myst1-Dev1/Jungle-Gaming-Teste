import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private auth: AuthService) {}

  @MessagePattern('auth.register')
  register(@Payload() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @MessagePattern('auth.login')
  login(@Payload() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @MessagePattern('auth.refresh')
  refresh(@Payload() refreshToken: string) {
    return this.auth.refresh(refreshToken);
  }

  @MessagePattern('auth.validate')
  validate(@Payload() id: string) {
    return this.auth.validate(id);
  }

  @MessagePattern('ping')
  ping(data) {
    console.log('PING RECEBIDO NO AUTH SERVICE!', data);
    return { ok: true };
  }
}
