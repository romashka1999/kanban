import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserSignUpDto } from './dto/user-sign-up.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {}

    public signUp(userSignUpDto: UserSignUpDto) {
        return this.userRepository.signUp(userSignUpDto);
    }

    public async signIn(userSignUpDto: UserSignUpDto) {
        const response = await this.signIn(userSignUpDto);
    }
}
