import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { SprintRepository } from './sprint.repository';
import { SprintCreateDto } from './dto/sprint-create.dto';
import { Sprint } from './sprint.entity';

@Injectable()
export class SprintsSevrice {
    constructor(@InjectRepository(SprintRepository) private readonly sprintRepository: SprintRepository) {}

    // public async create(taskCreateDto: TaskCreateDto): Promise<Task> {
    //     const { title, description } = taskCreateDto;
    //     try {
    //         const createdTask = await this.taskRepository.create({ title, description });
    //         return createdTask;
    //     } catch (error) {
    //         throw new InternalServerErrorException(error);
    //     }
    // }
}
