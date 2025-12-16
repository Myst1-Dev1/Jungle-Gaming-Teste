/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  emitToUser(
    userId: string,
    event: 'task:created' | 'task:updated' | 'comment:new',
    payload: any,
  ) {
    this.server.to(userId).emit(event, payload);
  }
}
