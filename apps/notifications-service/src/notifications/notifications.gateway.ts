import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  emitToUser(
    userId: string,
    event: 'tasks:created' | 'tasks:updated' | 'tasks:removed' | 'comment:new',
    payload: any,
  ) {
    this.server.to(userId).emit(event, payload);
  }
}
