import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TeamRepository } from './team.repository';
import { TeamCreateDto } from './dto/team-create.dto';
import { Team } from './team.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TeamsService {
    constructor(@InjectRepository(TeamRepository) private readonly teamRepository: TeamRepository) {}

    public async create(loggedUser: User, teamCreateDto: TeamCreateDto): Promise<Team> {
        const { name, comment } = teamCreateDto;
        try {
            const createdTask = await this.teamRepository.create({ name, comment, author: loggedUser }).save();
            return createdTask;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async findOneById(id: number): Promise<Team> {
        try {
            const team = await this.teamRepository.findOne({ id });
            return team;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async getOneTeam(loggedUser: User, id: number): Promise<Team> {
        try {
            const team = await this.teamRepository.createQueryBuilder('team')
                .where('team.id == id AND user.authorId === userId', { id, userId: loggedUser.id })
                .leftJoinAndSelect('team.users', 'users')
                .getOne();
            return team;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
