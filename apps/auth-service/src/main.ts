import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger/winston.config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      logger: WinstonModule.createLogger(winstonConfig),
      transport: Transport.TCP,
      options: {
        host: process.env.AUTH_HOST || 'auth-service',
        port: Number(process.env.AUTH_PORT || 3002),
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen();

  Logger.log(`Auth service is running on port ${process.env.AUTH_PORT}`);
}
bootstrap();
