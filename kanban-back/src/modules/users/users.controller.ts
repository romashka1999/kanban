import { Controller, Post, Body, ValidationPipe, HttpStatus, Req } from '@nestjs/common';
import { Request } from 'express';

import { UsersService } from './users.service';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { ResponseCreator } from 'src/shared/response-creator.class';


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
}
