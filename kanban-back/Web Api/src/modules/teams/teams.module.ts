import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TeamRepository } from './team.repository';

@Module({
    imports: [TypeOrmModule.forFeature([TeamRepository])],
    controllers: [TeamsController],
    providers: [TeamsService],
    exports: [TeamsService]
})
export class TeamsModule {}
