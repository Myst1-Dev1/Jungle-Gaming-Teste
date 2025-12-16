import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';

type TaskCreatedEvent = {
  taskId: string;
  title: string;
  assignedUserIds: string[];
  createdBy?: string;
};

type TaskUpdatedEvent = {
  taskId: string;
  oldStatus?: string;
  newStatus?: string;
  assignedUserIds?: string[];
};

type CommentNewEvent = {
  taskId: string;
  authorId: string;
  participantUserIds: string[];
  message: string;
};

@Controller()
export class NotificationsEventsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('task.created')
  async handleTaskCreated(@Payload() event: TaskCreatedEvent) {
    await this.notificationsService.handleTaskCreated(event);
  }

  @EventPattern('task.updated')
  async handleTaskUpdated(@Payload() event: TaskUpdatedEvent) {
    await this.notificationsService.handleTaskUpdated(event);
  }

  @EventPattern('comment.new')
  async handleCommentNew(@Payload() event: CommentNewEvent) {
    await this.notificationsService.handleCommentNew(event);
  }
}
