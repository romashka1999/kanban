import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SprintsController } from './sprints.controller';
import { SprintsSevrice } from './sprints.service';

import { SprintRepository } from './sprint.repository';
import { TeamsModule } from '../teams/teams.module';

@Module({
    imports: [TypeOrmModule.forFeature([SprintRepository]), TeamsModule],
    controllers: [SprintsController],
    providers: [SprintsSevrice],
})
export class SprintsModule {}
