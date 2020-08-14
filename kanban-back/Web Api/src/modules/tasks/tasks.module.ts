import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([TaskRepository]), UsersModule],
    controllers: [TasksController],
    providers: [TasksService],
})
export class TasksModule {}
