import { Injectable } from '@nestjs/common';
import {
  CreateTaskDto,
  RespCreateTaskDto,
  RespListTaskDto,
} from 'src/dto/createTaskDto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private TaskRepo: Repository<Task>,
  ) {}
  async createTask(data: CreateTaskDto): Promise<RespCreateTaskDto> {
    try {
      const entitydata = Object.assign(new Task(), data);
      const task = await this.TaskRepo.save(entitydata);
      const resp: RespCreateTaskDto = {
        id: task.id,
        task_name: task.task_name,
      };
      return resp;
    } catch (e) {
      throw e;
    }
  }

  async listTask(userid: string): Promise<RespListTaskDto> {
    try {
      const tasks = await this.TaskRepo.find({
        where: { user_id: userid },
      });
      if (tasks.length > 0) {
        const resp: RespListTaskDto = {
          Task: tasks,
        };
        return resp;
      } else {
        throw 'No Task found against this user';
      }
    } catch (e) {
      throw e;
    }
  }
}
