import { Controller, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from './jwt.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    console.log('Gateway recebeu:', body);
    return firstValueFrom(this.authClient.send('auth.register', body));
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return firstValueFrom(this.authClient.send('auth.login', body));
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  refresh(@Body('refreshToken') token: string) {
    return firstValueFrom(this.authClient.send('auth.refresh', token));
  }

  @Post('test')
  async test(): Promise<any> {
    return firstValueFrom(this.authClient.send('ping', { test: true }));
  }
}
