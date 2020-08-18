import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { UsersModule } from '../users/users.module';
import { SprintsModule } from '../sprints/sprints.module';
import { TeamsModule } from '../teams/teams.module';

@Module({
    imports: [TypeOrmModule.forFeature([TaskRepository]), UsersModule, SprintsModule, TeamsModule],
    controllers: [TasksController],
    providers: [TasksService],
})
export class TasksModule {}
