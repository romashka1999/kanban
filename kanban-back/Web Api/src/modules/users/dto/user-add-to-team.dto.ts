import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserAddToTeam {
    @ApiProperty({
        type: Number,
        required: true,
        description: 'userId for user',
    })
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'teamId for user',
    })
    @IsNotEmpty()
    @IsNumber()
    teamId: number;
}
