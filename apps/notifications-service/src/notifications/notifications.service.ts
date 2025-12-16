/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(private readonly ws: NotificationsGateway) {}

  async handleTaskCreated(event: {
    taskId: string;
    title: string;
    assignedUserIds: string[];
    createdBy?: string;
  }) {
    for (const userId of event.assignedUserIds ?? []) {
      if (event.createdBy && userId === event.createdBy) continue;

      this.ws.emitToUser(userId, 'task:created', event);
    }
  }

  async handleTaskUpdated(event: {
    taskId: string;
    assignedUserIds?: string[];
    oldStatus?: string;
    newStatus?: string;
  }) {
    const statusMudou =
      event.oldStatus !== undefined &&
      event.newStatus !== undefined &&
      event.oldStatus !== event.newStatus;

    if (!statusMudou) return;

    for (const userId of event.assignedUserIds ?? []) {
      this.ws.emitToUser(userId, 'task:updated', event);
    }
  }

  async handleCommentNew(event: {
    taskId: string;
    authorId: string;
    participantUserIds: string[];
    message: string;
  }) {
    for (const userId of event.participantUserIds ?? []) {
      if (userId === event.authorId) continue;

      this.ws.emitToUser(userId, 'comment:new', event);
    }
  }
}
