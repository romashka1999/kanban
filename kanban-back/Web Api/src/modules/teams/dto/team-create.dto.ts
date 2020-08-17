import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TeamCreateDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'name for Team',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'comment for Team',
    })
    @IsNotEmpty()
    @IsString()
    comment: string;
}
