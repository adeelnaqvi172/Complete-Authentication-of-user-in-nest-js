import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { TaskService } from 'src/task/task.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import {
  CreateTaskDto,
  RespCreateTaskDto,
  RespListTaskDto,
} from 'src/dto/createTaskDto.dto';
@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-task')
  async createTask(
    @Req() req,
    @Body() data: CreateTaskDto,
  ): Promise<RespCreateTaskDto> {
    try {
      let task: RespCreateTaskDto = await this.taskService.createTask({
        task_name: data.task_name,
        user_id: req.user,
      });
      return task;
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('list-tasks')
  async listTask(@Req() req): Promise<RespListTaskDto> {
    try {
      let listTask: RespListTaskDto = await this.taskService.listTask(req.user);
      return listTask;
    } catch (e) {
      throw e;
    }
  }
}
