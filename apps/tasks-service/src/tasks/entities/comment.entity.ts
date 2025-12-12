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

  @Column('uuid')
  taskId: string;

  @ManyToOne(() => Task, (task) => task.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @Column('uuid')
  authorId: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
}
