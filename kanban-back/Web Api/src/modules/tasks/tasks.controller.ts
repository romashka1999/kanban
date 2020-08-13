import { Controller, Get, Req, UseGuards, Post, ValidationPipe, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';

import { JwtAuthGuard } from '../auth/guard/jwt-aut.guard';
import { TaskCreateDto } from './dto/task-create.dto';
import { ResponseCreator } from 'src/shared/response-creator.class';
import { TasksService } from './tasks.service';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('tasks')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {

    constructor(private readonly tasksService: TasksService) {}
    
    @Post()
    public async create(
        @Req() req: Request,
        @Body(ValidationPipe) taskCreateDto: TaskCreateDto) {
        const response = await this.tasksService.create(taskCreateDto);
        return new ResponseCreator(HttpStatus.CREATED, true, req.url, req.method, response);
    }
}
