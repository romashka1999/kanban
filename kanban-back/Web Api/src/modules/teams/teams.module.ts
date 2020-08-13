import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { AuthModule } from '../auth/auth.module';
import { TeamRepository } from './team.repository';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([TeamRepository])],
    controllers: [TeamsController],
    providers: [TeamsService],
})
export class TeamsModule {}
