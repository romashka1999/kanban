import { IsString, IsNotEmpty, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "../task.entity";

export class TaskStatusUpdateDto {
    
    @ApiProperty({
        enum: TaskStatus,
        description: 'status of task',
        required: true
    })
    @IsEnum(TaskStatus)
    @IsNotEmpty()
    status: TaskStatus;
}