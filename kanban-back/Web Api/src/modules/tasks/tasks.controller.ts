import { Controller, Get, Req, UseGuards, Post, ValidationPipe, Body, HttpStatus, Query, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';

import { JwtAuthGuard } from '../auth/guard/jwt-aut.guard';
import { TaskCreateDto } from './dto/task-create.dto';
import { ResponseCreator } from 'src/shared/response-creator.class';
import { TasksService } from './tasks.service';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../users/user.entity';
import { StrictPaginationGetFilterDto } from 'src/shared/dtos/strict-pagination-get-filter.dto';
import { TaskStatusUpdateDto } from './dto/task-status-update.dto';

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
    public async create(@Req() req: Request, @GetUser() user: User, @Body(ValidationPipe) taskCreateDto: TaskCreateDto) {
        const response = await this.tasksService.create(user, taskCreateDto);
        return new ResponseCreator(HttpStatus.CREATED, true, req.url, req.method, response);
    }

    @Get('getAssignedTasksToMe')
    public async getAssignedTasksToMe(@Req() req: Request, @GetUser() user: User, @Query(ValidationPipe) strictPaginationGetFilterDto: StrictPaginationGetFilterDto) {
        const response = await this.tasksService.getAssignedTasksToMe(user, strictPaginationGetFilterDto);
        return new ResponseCreator(HttpStatus.OK, true, req.url, req.method, response);
    }

    @Get('getAssignedTasksToOther')
    public async getAssignedTasksToOther(@Req() req: Request, @GetUser() user: User, @Query(ValidationPipe) strictPaginationGetFilterDto: StrictPaginationGetFilterDto) {
        const response = await this.tasksService.getAssignedTasksToOther(user, strictPaginationGetFilterDto);
        return new ResponseCreator(HttpStatus.OK, true, req.url, req.method, response);
    }

    @Get('getTasksWhichICreated')
    public async getTasksWhichICreated(@Req() req: Request, @GetUser() user: User, @Query(ValidationPipe) strictPaginationGetFilterDto: StrictPaginationGetFilterDto) {
        const response = await this.tasksService.getTasksWhichICreated(user, strictPaginationGetFilterDto);
        return new ResponseCreator(HttpStatus.OK, true, req.url, req.method, response);
    }

    @Patch(':id/status')
    public async setTaskStatusById(
        @Req() req: Request, 
        @GetUser() user: User, 
        @Param('id', ParseIntPipe) id: number, 
        @Body(ValidationPipe) taskStatusUpdateDto: TaskStatusUpdateDto) {
        const response = await this.tasksService.setTaskStatusById(user, id, taskStatusUpdateDto);
        return new ResponseCreator(HttpStatus.OK, true, req.url, req.method, response);
    }

    @Patch(':id/archive')
    public async archiveTask(
        @Req() req: Request, 
        @GetUser() user: User, 
        @Param('id', ParseIntPipe) id: number) {
        const response = await this.tasksService.archiveTask(user, id);
        return new ResponseCreator(HttpStatus.OK, true, req.url, req.method, response);
    }
}
