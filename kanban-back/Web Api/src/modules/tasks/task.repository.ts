import { Repository, EntityRepository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { Task } from './task.entity';
import { User } from '../users/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    public async createTask(loggedUser: User, title: string, desription: string, asignee: User | null): Promise<Task> {
        console.log('-----------------', asignee);
        const task = new Task();
        task.title = title;
        task.description = desription;
        task.authorId = loggedUser.id;

        if (asignee) {
            task.assignerId = loggedUser.id;
            task.assigneeId = asignee.id;
        }
        try {
            const createdTask = await task.save();
            return createdTask;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
