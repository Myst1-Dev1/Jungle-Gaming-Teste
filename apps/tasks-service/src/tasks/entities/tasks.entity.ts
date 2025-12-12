/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { TaskHistory } from './task-history.entity';

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum Status {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'timestamp with time zone', nullable: true })
  dueDate?: Date | null;

  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.LOW,
  })
  priority: Priority;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.TODO,
  })
  status: Status;

  @OneToMany(() => Comment, (c: any) => c.task, { cascade: true })
  comments: Comment[];

  @OneToMany(() => TaskHistory, (h) => h.task, { cascade: true })
  history: TaskHistory[];

  @Column('text', { array: true, default: () => 'ARRAY[]::text[]' })
  assignedUserIds: string[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
  deletedAt?: Date | null;
}
