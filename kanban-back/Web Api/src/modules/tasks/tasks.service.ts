import { Injectable, InternalServerErrorException, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNull } from 'util';

import { TaskRepository } from './task.repository';
import { TaskCreateDto } from './dto/task-create.dto';
import { Task } from './task.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { pagination } from 'src/shared/pagination';
import { StrictPaginationGetFilterDto } from 'src/shared/dtos/strict-pagination-get-filter.dto';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private readonly taskRepository: TaskRepository, private readonly usersService: UsersService) {}

    public async create(loggedUser: User, taskCreateDto: TaskCreateDto): Promise<Task> {
        const { title, description, asigneeId } = taskCreateDto;
        let assignee: User | null = null;
        if (!isNull(asigneeId)) {
            assignee = await this.usersService.findOneById(asigneeId);
            if (!assignee) {
                throw new NotFoundException('ASIGNEE_DOES_NOT_EXIST');
            }
        }
        try {
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
        return await this.getPaginatedTasksWithWhereParams(loggedUser.id, strictPaginationGetFilterDto, { assignerId: loggedUser.id });
    }

    public async getAssignedTasksToMe(loggedUser: User, strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<Task[]> {
        return await this.getPaginatedTasksWithWhereParams(loggedUser.id, strictPaginationGetFilterDto, { assigneeId: loggedUser.id });
    }

    public async getTasksWhichICreated(loggedUser: User, strictPaginationGetFilterDto: StrictPaginationGetFilterDto): Promise<Task[]> {
        return await this.getPaginatedTasksWithWhereParams(loggedUser.id, strictPaginationGetFilterDto, { authorId: loggedUser.id });
    }

    private async getPaginatedTasksWithWhereParams(id: number, strictPaginationGetFilterDto: StrictPaginationGetFilterDto, where: any): Promise<Task[]> {
        const { page, pageSize } = strictPaginationGetFilterDto;
        const { offset, limit } = pagination(page, pageSize);
        try {
            return await this.taskRepository.find({
                where,
                skip: offset,
                take: limit,
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
