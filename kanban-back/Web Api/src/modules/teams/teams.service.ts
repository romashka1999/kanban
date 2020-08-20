import { Injectable, InternalServerErrorException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TeamRepository } from './team.repository';
import { TeamCreateDto } from './dto/team-create.dto';
import { Team } from './team.entity';
import { User } from '../users/user.entity';
import { StrictPaginationGetFilterDto } from 'src/shared/dtos/strict-pagination-get-filter.dto';
import { pagination } from 'src/shared/pagination';

@Injectable()
export class TeamsService {
    constructor(@InjectRepository(TeamRepository) private readonly teamRepository: TeamRepository) {}

    public async create(loggedUser: User, teamCreateDto: TeamCreateDto): Promise<Team> {
        const { name, comment } = teamCreateDto;
        try {
            const createdTeam = await this.teamRepository.create({ name, comment, admin: loggedUser }).save();
            delete createdTeam.admin;
            return createdTeam;
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
            const team = await this.teamRepository
                .createQueryBuilder('team')
                .where('team.id == id AND user.authorId === userId', { id, userId: loggedUser.id })
                .leftJoinAndSelect('team.users', 'users')
                .getOne();
            return team;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async getTeamByAdminId(userId: number): Promise<Team> {
        try {
            const team = await this.teamRepository
                .createQueryBuilder('team')
                .where('team.adminId = :userId', { userId })
                .getOne();
            return team;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async getUsersByTeamId(user: User, teamId: number, strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<User[]> {
        const { page, pageSize } = strictPaginationGetFilterDto;
        const { offset, limit } = pagination(page, pageSize);
        try {
            const users = await this.teamRepository
                        .createQueryBuilder('team')
                        .where('team.id = :teamId', { teamId })
                        .leftJoinAndSelect('team.users', 'users')
                        .addSelect(subQuery => {
                            return subQuery
                                .select('user.id', 'id')
                                .addSelect('user.email', 'email')
                                .from(User, 'user')
                                .orderBy('user.createDate', 'DESC')
                                .skip(offset)
                                .take(limit)
                        }, 'users')
                        .getRawMany();
            return users;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
          
            throw new InternalServerErrorException(error);
        }
    }
}
