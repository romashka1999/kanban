import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-aut.guard';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiHeader({
    name: 'token',
    description: 'token for Auth',
})
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }
}
