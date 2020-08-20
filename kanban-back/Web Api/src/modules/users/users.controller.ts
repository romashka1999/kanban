import { Controller, Post, Body, ValidationPipe, HttpStatus, Req, UseGuards, Param, ParseIntPipe, Get, Query } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';

import { UsersService } from './users.service';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { ResponseCreator } from 'src/shared/response-creator.class';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { LocalAuthGuard } from '../auth/guard/local-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from './user.entity';
import { UserAddToTeam } from './dto/user-add-to-team.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-aut.guard';
import { StrictPaginationGetFilterDto } from 'src/shared/dtos/strict-pagination-get-filter.dto';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('addUserToTeam/:userId')
    public async addUserToTeam(
        @Req() req: Request,
        @GetUser() user: User,
        @Body(ValidationPipe) userAddToTeam: UserAddToTeam) {
        const response = await this.usersService.addUserToTeam(user, userAddToTeam);
        return new ResponseCreator(HttpStatus.CREATED, true, req.url, req.method, response);
    }

}
