import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Task } from './tasks.entity';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'task_id' })
  taskId: string;

  @ManyToOne(() => Task, (task) => task.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @Column({ type: 'uuid', name: 'author_id', nullable: true })
  authorId: string | null;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'created_at',
  })
  createdAt: Date;
}
