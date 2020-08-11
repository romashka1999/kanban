import { Repository, EntityRepository } from 'typeorm';

import { User } from './user.entity';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { hashPassword } from 'src/utils/password.helper';
import { ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { UserSignInDto } from './dto/user-sign-in.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async signUp(userSignUpDto: UserSignUpDto): Promise<User> {
        const { email, password } = userSignUpDto;
        const { salt, hashedPassword } = await hashPassword(password);
        const user = new User();
        user.email = email;
        user.password = hashedPassword;
        user.salt = salt;
        try {
            const createdUser = await user.save();
            delete createdUser.password;
            delete createdUser.salt;
            return createdUser;
        } catch (error) {
            if (error.errno === 1062) {
                throw new ConflictException('EMAIL_ALREADY_EXISTS');
            } else {
                throw new InternalServerErrorException(error);
            }
        }
    }
    
}
