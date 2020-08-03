import { Controller, Post, Body, ValidationPipe, HttpStatus, Req } from '@nestjs/common';
import { Request } from 'express';

import { UsersService } from './users.service';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { ResponseCreator } from 'src/shared/response-creator.class';
import { UserSignInDto } from './dto/user-sign-in.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    public async signUp(
        @Req() req: Request,
        @Body(ValidationPipe) userSignUpDto: UserSignUpDto) {
        const response = await this.usersService.signUp(userSignUpDto);
        return new ResponseCreator(HttpStatus.CREATED, true, req.url, req.method, response);
    }

    @Post()
    public async signIn(
        @Req() req: Request,
        @Body(ValidationPipe) userSignInDto: UserSignInDto) {
        const response = await this.usersService.signIn(userSignInDto);
        return new ResponseCreator(HttpStatus.CREATED, true, req.url, req.method, response);
    }
}
