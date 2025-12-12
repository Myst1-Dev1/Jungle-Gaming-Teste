import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/tasks.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Comment } from './entities/comment.entity';
import { TaskHistory } from './entities/task-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Comment, TaskHistory])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
