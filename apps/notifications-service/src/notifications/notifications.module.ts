import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsEventsController } from './notifications.events.controller';
import { NotificationsGateway } from './notifications.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey',
    }),
  ],
  controllers: [NotificationsEventsController],
  providers: [NotificationsService, NotificationsGateway],
})
export class NotificationsModule {}
