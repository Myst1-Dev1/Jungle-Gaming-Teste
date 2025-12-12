import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'],
        queue: 'tasks_queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app.listen();

  Logger.log(`Tasks service is running on port ${process.env.AUTH_PORT}`);
}
bootstrap();
