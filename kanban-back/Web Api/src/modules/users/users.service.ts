import { Injectable, InternalServerErrorException, HttpException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm'

import { UserRepository } from './user.repository';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { User } from './user.entity';
import { UserAddToTeam } from './dto/user-add-to-team.dto';
import { TeamsService } from '../teams/teams.service';
import { Team } from '../teams/team.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        private readonly teamsService: TeamsService) {}

    public async signUp(userSignUpDto: UserSignUpDto): Promise<User> {
        return await this.userRepository.signUp(userSignUpDto);
    }

    public async findOneByEmail(email: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ email });
            return user;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async findOneById(id: number): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ id });
            return user;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async authorizeByEmail(email: string): Promise<User> {
        try {
            const user = await this.findOneByEmail(email);
            return user;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error);
        }
    }

    public async getUserWithTeams(userId: number): Promise<User> {
        try {
            const user = await this.userRepository
                .createQueryBuilder('user')
                .where('user.id = :userId', { userId })
                .leftJoinAndSelect('user.teams', 'team')
                .getOne();
            return user;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error);
        }
    }

    public async addUserToTeam(loggedUser: User, userAddToTeam: UserAddToTeam): Promise<Team> {
        const { userId, teamId } = userAddToTeam;
        try {
            const team = await this.teamsService.getTeamByAdminId(loggedUser.id);
            if(!team) {
                throw new BadRequestException('YOU_ARE_ANY_TEAM');
            }

            if(teamId !== team.id) {
                throw new BadRequestException('YOU_ARE_NOT_ADMIN');
            }

            const user = await this.findOneById(userId);
            if(!user) {
                throw new NotFoundException('USER_DOES_NOT_EXIST');
            }

            team.users = [ user ];
            await getConnection().manager.save(team);
            delete team.users;
            return team
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error);
        }
    }
}
