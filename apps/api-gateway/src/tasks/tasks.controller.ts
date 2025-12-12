/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { JwtAuthGuard } from '../auth/jwt.guard';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject('TASK_SERVICE')
    private readonly tasksClient: ClientProxy,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('page') page: number = 1, @Query('size') size: number = 10) {
    return firstValueFrom(
      this.tasksClient.send('tasks.findAll', { page, size }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return firstValueFrom(this.tasksClient.send('tasks.findOne', id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTaskDto) {
    return firstValueFrom(this.tasksClient.send('tasks.create', dto));
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return firstValueFrom(this.tasksClient.send('tasks.update', { id, dto }));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return firstValueFrom(this.tasksClient.send('tasks.remove', id));
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  addComment(@Param('id') taskId: string, @Body() dto: AddCommentDto) {
    return firstValueFrom(
      this.tasksClient.send('tasks.addComment', { taskId, dto }),
    );
  }
}
