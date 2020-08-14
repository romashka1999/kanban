import { Controller, Get, UseGuards, Post, Body, Req, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserSignInDto } from '../users/dto/user-sign-in.dto';
import { ResponseCreator } from 'src/shared/response-creator.class';
import { UserSignUpDto } from '../users/dto/user-sign-up.dto';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('signIn')
    public async signIn(@Req() req: Request, @Body(ValidationPipe) userSignInDto: UserSignInDto) {
        const response = this.authService.signInUser(req.user as User);
        return new ResponseCreator(HttpStatus.OK, true, req.url, req.method, response);
    }

    @Post('signUp')
    public async signUp(@Req() req: Request, @Body(ValidationPipe) userSignUpDto: UserSignUpDto) {
        const response = await this.authService.signUpUser(userSignUpDto);
        return new ResponseCreator(HttpStatus.CREATED, true, req.url, req.method, response);
    }
}
