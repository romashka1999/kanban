import { Controller, Post, Body, ValidationPipe, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { UsersService } from './users.service';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { ResponseCreator } from 'src/shared/response-creator.class';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { LocalAuthGuard } from '../auth/guard/local-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

}
