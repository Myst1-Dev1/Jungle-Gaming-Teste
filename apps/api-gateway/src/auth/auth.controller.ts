import { Controller, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  @Post('register')
  register(@Body() dto: any) {
    return firstValueFrom(this.authClient.send('auth.register', dto));
  }

  @Post('login')
  login(@Body() dto: any) {
    return firstValueFrom(this.authClient.send('auth.login', dto));
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  refresh(@Body('refreshToken') token: string) {
    return firstValueFrom(this.authClient.send('auth.refresh', token));
  }

}
