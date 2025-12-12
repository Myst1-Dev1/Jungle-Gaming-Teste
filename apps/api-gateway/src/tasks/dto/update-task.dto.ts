import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  IsArray,
} from 'class-validator';
import { Priority, Status } from '../entities/tasks.entity';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  deadline?: string;

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @IsArray()
  @IsOptional()
  assignedUsers?: number[];
}
