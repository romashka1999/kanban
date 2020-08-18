import { IsNotEmpty, IsNumber, IsDate, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SprintCreateDto {
    @ApiProperty({
        type: Date,
        required: true,
        description: 'startDate for Sprint',
    })
    @IsNotEmpty()
    @IsDateString()
    startDate: string;

    @ApiProperty({
        type: Date,
        required: true,
        description: 'endDate for Sprint',
    })
    @IsNotEmpty()
    @IsDateString()
    endDate: string;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'teamId for Sprint',
    })
    @IsNotEmpty()
    @IsNumber()
    teamId: number;
}
