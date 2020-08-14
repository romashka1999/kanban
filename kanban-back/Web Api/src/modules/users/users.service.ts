import { Injectable, InternalServerErrorException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {}

    public async signUp(userSignUpDto: UserSignUpDto): Promise<User> {
        return await this.userRepository.signUp(userSignUpDto);
    }

    public async findOneByEmail(email: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ email });
            return user;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async findOneById(id: number): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ id });
            return user;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async authorizeByEmail(email: string): Promise<User> {
        try {
            const user = await this.findOneByEmail(email);
            return user;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error);
        }
    }
}
