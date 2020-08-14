import { Controller, Get, Req, UseGuards, Post, ValidationPipe, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';

import { JwtAuthGuard } from '../auth/guard/jwt-aut.guard';
import { SprintCreateDto } from './dto/sprint-create.dto';
import { ResponseCreator } from 'src/shared/response-creator.class';
import { SprintsSevrice } from './sprints.service';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('sprints')
@UseGuards(JwtAuthGuard)
@Controller('sprints')
export class SprintsController {
    constructor(private readonly sprintsSevrice: SprintsSevrice) {}

    // @Post()
    // public async create(
    //     @Req() req: Request,
    //     @Body(ValidationPipe) taskCreateDto: TaskCreateDto) {
    //     const response = await this.tasksService.create(taskCreateDto);
    //     return new ResponseCreator(HttpStatus.CREATED, true, req.url, req.method, response);
    // }
}
