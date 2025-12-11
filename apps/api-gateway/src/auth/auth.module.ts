import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_HOST || 'auth-service',
          port: Number(process.env.AUTH_PORT) || 3002,
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy],
})
export class AuthModule {}
