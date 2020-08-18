import { Controller, Post, Body, ValidationPipe, HttpStatus, Req, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { UsersService } from './users.service';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { ResponseCreator } from 'src/shared/response-creator.class';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { LocalAuthGuard } from '../auth/guard/local-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from './user.entity';
import { UserAddToTeam } from './dto/user-add-to-team.dto';

@ApiTags('users')
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
