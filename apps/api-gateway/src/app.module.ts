import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    AuthModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'auth',
          ttl: 1,
          limit: 10,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
