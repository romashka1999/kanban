import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SprintCreateDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'title for task',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'description for task',
    })
    @IsNotEmpty()
    @IsString()
    description: string;
}
