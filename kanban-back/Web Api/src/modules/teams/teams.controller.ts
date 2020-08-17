import { Controller, Get, Req, UseGuards, Post, ValidationPipe, Body, HttpStatus, Param } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';

import { JwtAuthGuard } from '../auth/guard/jwt-aut.guard';
import { TeamCreateDto } from './dto/team-create.dto';
import { ResponseCreator } from 'src/shared/response-creator.class';
import { TeamsService } from './teams.service';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../users/user.entity';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('teams')
@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

    @Post()
    public async create(
        @Req() req: Request,
        @GetUser() user: User,
        @Body(ValidationPipe) teamCreateDto: TeamCreateDto) {
        const response = await this.teamsService.create(user, teamCreateDto);
        return new ResponseCreator(HttpStatus.CREATED, true, req.url, req.method, response);
    }

    @Get(':id')
    public async getOneTeam(
        @Req() req: Request,
        @GetUser() user: User,
        @Param('id', ValidationPipe) id: number) {
        const response = await this.teamsService.getOneTeam(user, id);
        return new ResponseCreator(HttpStatus.OK, true, req.url, req.method, response);
    }
}
