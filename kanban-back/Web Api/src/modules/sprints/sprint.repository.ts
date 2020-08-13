import { Repository, EntityRepository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

import { Sprint } from './sprint.entity';

@EntityRepository(Sprint)
export class SprintRepository extends Repository<Sprint> {
    
}
