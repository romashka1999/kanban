import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SprintCreateDto {
    @ApiProperty({
        type: Date,
        required: true,
        description: 'startDate for Sprint',
    })
    @IsNotEmpty()
    @IsDate()
    startDate: Date;

    @ApiProperty({
        type: Date,
        required: true,
        description: 'endDate for Sprint',
    })
    @IsNotEmpty()
    @IsDate()
    endDate: Date;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'teamId for Sprint',
    })
    @IsNotEmpty()
    @IsNumber()
    teamId: number;
}
