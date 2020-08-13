import { Repository, EntityRepository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    
}