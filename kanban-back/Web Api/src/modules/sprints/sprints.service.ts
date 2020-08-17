import { Injectable, InternalServerErrorException, BadRequestException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { SprintRepository } from './sprint.repository';
import { SprintCreateDto } from './dto/sprint-create.dto';
import { Sprint } from './sprint.entity';
import { User } from '../users/user.entity';
import { TeamsService } from '../teams/teams.service';

@Injectable()
export class SprintsSevrice {
    constructor(@InjectRepository(SprintRepository) private readonly sprintRepository: SprintRepository, private readonly teamsService: TeamsService) {}

    public async create(loggedUser: User, sprintCreateDto: SprintCreateDto): Promise<Sprint> {
        const { startDate, endDate, teamId } = sprintCreateDto;
        try {
            const team = this.teamsService.findOneById(teamId);
            if(!team) {
                throw new BadRequestException('TEAM_DOES_NOT_EXIST');
            }
            const createdSprint = await this.sprintRepository.create({ startDate, endDate, author: loggedUser, teamId }).save();
            return createdSprint;
        } catch (error) {
            if(error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error);
        }
    }
}
