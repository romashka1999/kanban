import { Repository, EntityRepository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

import { Team } from './team.entity';

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
    
}
