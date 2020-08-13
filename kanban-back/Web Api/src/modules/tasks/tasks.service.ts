import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskRepository } from './task.repository';
import { TaskCreateDto } from './dto/task-create.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor(@InjectRepository(TaskRepository) private readonly taskRepository: TaskRepository) {}

    public async create(taskCreateDto: TaskCreateDto): Promise<Task> {
        const { title, description } = taskCreateDto;
        try {
            const createdTask = await this.taskRepository.create({ title, description });
            return createdTask;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }   
    }
}
