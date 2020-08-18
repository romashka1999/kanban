import { Injectable, InternalServerErrorException, NotFoundException, HttpException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, FindManyOptions } from 'typeorm';

import { TaskRepository } from './task.repository';
import { TaskCreateDto } from './dto/task-create.dto';
import { Task } from './task.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { pagination } from 'src/shared/pagination';
import { StrictPaginationGetFilterDto } from 'src/shared/dtos/strict-pagination-get-filter.dto';
import { TaskStatusUpdateDto } from './dto/task-status-update.dto';
import { SprintsSevrice } from '../sprints/sprints.service';
import { TeamsService } from '../teams/teams.service';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository) private readonly taskRepository: TaskRepository, 
        private readonly usersService: UsersService,
        private readonly sprintsSevrice: SprintsSevrice,
        private readonly teamsService: TeamsService) {}

    public async create(loggedUser: User, taskCreateDto: TaskCreateDto): Promise<Task> {
        const { title, description, asigneeId, sprintId } = taskCreateDto;
        let assignee: User | null = null;
        try {
            const user = await this.usersService.getUserWithTeams(loggedUser.id);
            const teamIds = user.teams.map((team) => {
                return team.id
            })
            if(teamIds.length === 0) {
                throw new NotFoundException('USER_IS_NOT_IN_ANY_TEAM');
            }
            const sprint = await this.sprintsSevrice.getOneForTaskCreate(sprintId, teamIds);
            if (!sprint) {
                throw new NotFoundException('SPRINT_DOES_NOT_EXIST');
            }
            if (asigneeId) {
                assignee = await this.usersService.findOneById(asigneeId);
                if (!assignee) {
                    throw new NotFoundException('ASIGNEE_DOES_NOT_EXIST');
                }
            }
            const createdTask = await this.taskRepository.createTask(loggedUser, title, description, assignee);
            return createdTask;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error);
        }
    }

    public async getAssignedTasksToOther(loggedUser: User, strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<Task[]> {
        const params: FindManyOptions<Task> = {
            where: {
                assigner: loggedUser,
            },
            order: {
                createDate: 'DESC'
            }
        }
        return await this.getPaginatedTasksWithWhereParams(loggedUser.id, strictPaginationGetFilterDto, params);
    }

    public async getAssignedTasksToMe(loggedUser: User, strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<Task[]> {
        const params: FindManyOptions<Task> = {
            where: {
                assignee: loggedUser,
            },
            order: {
                createDate: 'DESC'
            }
        }
        return await this.getPaginatedTasksWithWhereParams(loggedUser.id, strictPaginationGetFilterDto, params);
    }

    public async getTasksWhichICreated(loggedUser: User, strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<Task[]> {
        const params: FindManyOptions<Task> = {
            where: {
                author: loggedUser,
            },
            order: {
                createDate: 'DESC'
            }
        }
        return await this.getPaginatedTasksWithWhereParams(loggedUser.id, strictPaginationGetFilterDto, params);
    }

    private async getPaginatedTasksWithWhereParams(id: number, strictPaginationGetFilterDto: StrictPaginationGetFilterDto, params: FindManyOptions<Task>): Promise<Task[]> {
        const { page, pageSize } = strictPaginationGetFilterDto;
        const { offset, limit } = pagination(page, pageSize);
        try {
            return await this.taskRepository.find({
                ...params,
                skip: offset,
                take: limit,
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }


    public async setTaskStatusById(loggedUser: User, taskId: number, taskStatusUpdateDto: TaskStatusUpdateDto): Promise<Task> {
        try {
            const updatedTask: UpdateResult =  await this.taskRepository.update({
                id: taskId, 
                authorId: loggedUser.id, 
                archived: false
            }, taskStatusUpdateDto);
            
            if(!updatedTask.affected) {
                throw new BadRequestException('TASK_DOES_NOT_EXIST')
            }
            return updatedTask.raw;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error);
        }
    }

    public async archiveTask(loggedUser: User, taskId: number): Promise<Task> {
        try {
            const updatedTask: UpdateResult =  await this.taskRepository.update({id: taskId, authorId: loggedUser.id}, { archived: true });
            if(!updatedTask.affected) {
                throw new BadRequestException('TASK_DOES_NOT_EXIST')
            }
            return updatedTask.raw;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error);
        }
    }
}
