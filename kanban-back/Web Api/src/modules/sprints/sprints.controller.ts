import { Controller, Get, Req, UseGuards, Post, ValidationPipe, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';

import { JwtAuthGuard } from '../auth/guard/jwt-aut.guard';
import { SprintCreateDto } from './dto/sprint-create.dto';
import { ResponseCreator } from 'src/shared/response-creator.class';
import { SprintsSevrice } from './sprints.service';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../users/user.entity';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('sprints')
@UseGuards(JwtAuthGuard)
@Controller('sprints')
export class SprintsController {
    constructor(private readonly sprintsSevrice: SprintsSevrice) {}

    @Post()
    public async create(
        @Req() req: Request,
        @GetUser() user: User,
        @Body(ValidationPipe) sprintCreateDto: SprintCreateDto) {
        const response = await this.sprintsSevrice.create(user, sprintCreateDto);
        return new ResponseCreator(HttpStatus.CREATED, true, req.url, req.method, response);
    }
}
