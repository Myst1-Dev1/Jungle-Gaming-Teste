import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsArray,
} from 'class-validator';

import { Priority, Status } from '../entities/tasks.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  deadline: string;

  @IsEnum(Priority)
  priority: Priority;

  @IsEnum(Status)
  @IsOptional()
  status?: Status = Status.TODO;

  @IsArray()
  @IsOptional()
  assignedUsers?: number[];
}
