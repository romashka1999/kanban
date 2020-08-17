import { Repository, EntityRepository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Task } from './task.entity';
import { User } from '../users/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    public async createTask(loggedUser: User, title: string, desription: string, asignee: User | null): Promise<Task> {
        const task = new Task();
        task.title = title;
        task.description = desription;
        task.author = loggedUser;
        if (asignee) {
            task.assigner = loggedUser;
            task.assignee = asignee;
        }
        try {
            const createdTask = await task.save();
            delete createdTask.author;
            delete createdTask.assigner;
            delete createdTask.assignee;
            return createdTask;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
