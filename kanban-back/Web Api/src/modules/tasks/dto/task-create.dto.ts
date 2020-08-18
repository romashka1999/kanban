import { IsNotEmpty, IsString, IsOptional, IsNumber, NotEquals } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskCreateDto {
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

    @ApiProperty({
        type: Number,
        required: false,
        description: 'asigneeId for task',
    })
    @IsOptional()
    @IsNumber()
    @NotEquals(0)
    asigneeId: number;

    @ApiProperty({
        type: Number,
        required: false,
        description: 'sprintId for task',
    })
    @IsNotEmpty()
    @IsNumber()
    @NotEquals(0)
    sprintId: number;
}
