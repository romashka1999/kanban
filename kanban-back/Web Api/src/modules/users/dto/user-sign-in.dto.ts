import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSignInDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'email for user',
    })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'password for user',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}
