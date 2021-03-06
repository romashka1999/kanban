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
            const team = await this.teamsService.findOneById(teamId);
            if(!team) {
                throw new BadRequestException('TEAM_DOES_NOT_EXIST');
            }
            const createdSprint = await this.sprintRepository
                .create({ 
                    startDate: new Date(startDate), 
                    endDate: new Date(endDate), 
                    author: loggedUser, team 
                })
                .save();
            delete createdSprint.author;
            delete createdSprint.team;
            return createdSprint;
        } catch (error) {
            if(error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error);
        }
    }

    public async getOneByIdWithTasks(loggedUser: User, sprintId: number): Promise<Sprint> {
        try {
            const sprint = await this.sprintRepository.findOne({
                where: {
                    id: sprintId
                },
                relations: ['tasks']
            });
            return sprint;
        } catch (error) {
            if(error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error);
        }
    }

    public async getOneForTaskCreate(sprintId: number, teamIds: number[]): Promise<Sprint> {
        try {
            const sprint = await this.sprintRepository
                .createQueryBuilder('sprint')
                .where('sprint.id = sprintId AND sprint.teamId IN(:...teamIds)',{ sprintId, teamIds })
                .execute();
            return sprint;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
