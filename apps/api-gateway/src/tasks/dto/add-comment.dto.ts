import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AddCommentDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  userId: string;
}
