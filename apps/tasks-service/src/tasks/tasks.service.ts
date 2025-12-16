import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';

import { Task } from './entities/tasks.entity';
import { Comment } from './entities/comment.entity';
import { TaskHistory } from './entities/task-history.entity';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepo: Repository<Task>,

    @InjectRepository(Comment)
    private readonly commentsRepo: Repository<Comment>,

    @InjectRepository(TaskHistory)
    private readonly historyRepo: Repository<TaskHistory>,

    @Inject('RMQ_SERVICE')
    private readonly rmqClient: ClientProxy,
  ) {}

  async findAll(page = 1, size = 10) {
    const skip = (page - 1) * size;

    const [data, total] = await this.tasksRepo.findAndCount({
      skip,
      take: size,
      order: { createdAt: 'DESC' },
    });

    return { page, size, total, data };
  }

  async findOne(id: string) {
    const task = await this.tasksRepo.findOne({
      where: { id },
      relations: ['comments'],
    });

    if (!task) throw new NotFoundException('Task não encontrada');

    return task;
  }

  async create(dto: CreateTaskDto) {
    const task = this.tasksRepo.create({
      ...dto,
      assignedUserIds: dto.assignedUsers?.map(String) ?? [],
    });

    await this.tasksRepo.save(task);

    await this.createHistory(task.id, 'TASK_CREATED');

    this.rmqClient.emit('task.created', {
      taskId: task.id,
      title: task.title,
      assignedUserIds: task.assignedUserIds,
    });

    return task;
  }

  async update(id: string, dto: UpdateTaskDto) {
    const task = await this.findOne(id);

    const oldStatus = task.status;
    const oldAssignedUserIds = [...task.assignedUserIds];

    Object.assign(task, dto);
    await this.tasksRepo.save(task);

    await this.createHistory(id, 'TASK_UPDATED');

    this.rmqClient.emit('task.updated', {
      taskId: task.id,
      oldStatus,
      newStatus: task.status,
      oldAssignedUserIds,
      newAssignedUserIds: task.assignedUserIds,
    });

    return task;
  }

  async addComment(taskId: string, dto: AddCommentDto) {
    const task = await this.findOne(taskId);

    const comment = this.commentsRepo.create({
      taskId: task.id,
      authorId: dto.userId,
      content: dto.message,
    });

    await this.commentsRepo.save(comment);

    await this.createHistory(task.id, 'COMMENT_ADDED', dto.userId);

    const participantUserIds = Array.from(new Set([...task.assignedUserIds]));

    this.rmqClient.emit('comment.new', {
      taskId: task.id,
      authorId: dto.userId,
      participantUserIds,
      message: dto.message,
    });

    return comment;
  }

  async remove(id: string) {
    const result = await this.tasksRepo.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('Task não encontrada');
    }

    this.rmqClient.emit('task.deleted', { taskId: id });

    return { deleted: true };
  }

  private async createHistory(
    taskId: string,
    change: string,
    changedBy?: string,
  ) {
    const history = this.historyRepo.create({
      taskId,
      change,
      changedBy: changedBy ?? null,
    });

    await this.historyRepo.save(history);
  }
}
