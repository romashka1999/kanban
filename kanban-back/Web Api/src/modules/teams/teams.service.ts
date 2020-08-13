import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TeamRepository } from './team.repository';
import { TeamCreateDto } from './dto/team-create.dto';
import { Team } from './team.entity';

@Injectable()
export class TeamsService {

    constructor(@InjectRepository(TeamRepository) private readonly teamRepository: TeamRepository) {}

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
