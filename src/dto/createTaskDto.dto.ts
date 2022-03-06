import { IsEmail, IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Task } from 'src/entities/task.entity';

export class CreateTaskDto {
  @IsString()
  @ApiProperty()
  task_name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  user_id: string;
}

export class RespCreateTaskDto {
  @IsString()
  @ApiProperty()
  task_name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  id: string;
}

export class RespListTaskDto {
  @IsArray()
  @ApiProperty()
  Task: Task[];
}
