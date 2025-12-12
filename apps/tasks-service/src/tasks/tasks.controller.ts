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
  async findAll(@Payload() data) {
    try {
      return await this.tasksService.findAll(data.page, data.size);
    } catch (err) {
      console.error('ERRO NO TASKS SERVICE FINDALL:', err);
      throw err;
    }
  }

  @MessagePattern('tasks.findOne')
  async findOne(@Payload() id: string) {
    try {
      return await this.tasksService.findOne(id);
    } catch (err) {
      console.error('ERRO NO TASKS SERVICE FINDONE:', err);
      throw err;
    }
  }

  @MessagePattern('tasks.create')
  async create(@Payload() dto: CreateTaskDto) {
    try {
      return await this.tasksService.create(dto);
    } catch (err) {
      console.error('ERRO NO TASKS SERVICE CREATE:', err);
      throw err;
    }
  }

  @MessagePattern('tasks.update')
  async update(@Payload() data: { dto: UpdateTaskDto; id: string }) {
    try {
      return await this.tasksService.update(data.id, data.dto);
    } catch (err) {
      console.error('ERRO NO TASKS SERVICE UPDATE:', err);
      throw err;
    }
  }

  @MessagePattern('tasks.remove')
  async remove(@Payload() id: string) {
    try {
      return await this.tasksService.remove(id);
    } catch (err) {
      console.error('ERRO NO TASKS SERVICE REMOVE:', err);
      throw err;
    }
  }

  @MessagePattern('tasks.addComment')
  async addComment(@Payload() data) {
    try {
      return await this.tasksService.addComment(data.taskId, data.dto);
    } catch (err) {
      console.error('ERRO NO TASKS SERVICE ADDCOMMENT:', err);
      throw err;
    }
  }
}
