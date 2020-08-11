import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-aut.guard';
import { ApiTags, ApiHeader } from '@nestjs/swagger';

@ApiHeader({
    name: 'Authorization',
    description: 'token for Auth',
})
@ApiTags('tasks')
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }
}
