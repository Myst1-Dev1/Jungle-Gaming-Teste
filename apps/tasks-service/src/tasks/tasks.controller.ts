/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// tasks-service/src/tasks/tasks.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern('tasks.findAll')
  findAll(@Payload() data) {
    return this.tasksService.findAll(data.page, data.size);
  }

  @MessagePattern('tasks.findOne')
  findOne(@Payload() id: string) {
    return this.tasksService.findOne(id);
  }

  @MessagePattern('tasks.create')
  create(@Payload() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @MessagePattern('tasks.update')
  update(@Payload() data: { dto: UpdateTaskDto; id: string }) {
    return this.tasksService.update(data.id, data.dto);
  }

  @MessagePattern('tasks.remove')
  remove(@Payload() id: string) {
    return this.tasksService.remove(id);
  }

  @MessagePattern('tasks.addComment')
  addComment(@Payload() data) {
    return this.tasksService.addComment(data.taskId, data.dto);
  }
}
