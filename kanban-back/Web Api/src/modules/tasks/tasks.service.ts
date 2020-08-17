import { Injectable, InternalServerErrorException, NotFoundException, HttpException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNull } from 'util';

import { TaskRepository } from './task.repository';
import { TaskCreateDto } from './dto/task-create.dto';
import { Task } from './task.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { pagination } from 'src/shared/pagination';
import { StrictPaginationGetFilterDto } from 'src/shared/dtos/strict-pagination-get-filter.dto';
import { UpdateResult } from 'typeorm';
import { TaskStatusUpdateDto } from './dto/task-status-update.dto';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private readonly taskRepository: TaskRepository, private readonly usersService: UsersService) {}

    public async create(loggedUser: User, taskCreateDto: TaskCreateDto): Promise<Task> {
        const { title, description, asigneeId } = taskCreateDto;
        let assignee: User | null = null;
        try {
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
