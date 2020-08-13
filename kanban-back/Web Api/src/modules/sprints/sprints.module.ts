import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SprintsController } from './sprints.controller';
import { SprintsSevrice } from './sprints.service';
import { AuthModule } from '../auth/auth.module';
import { SprintRepository } from './sprint.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([SprintRepository])],
    controllers: [SprintsController],
    providers: [SprintsSevrice],
})
export class SprintsModule {}