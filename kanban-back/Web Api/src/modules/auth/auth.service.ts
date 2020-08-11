import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { UserSignUpDto } from '../users/dto/user-sign-up.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService) {}

    public async validateUser(email: string, password: string) {
        const user = await this.usersService.findOneByEmail(email);
        if(user && await user.validatePassword(password)) {
            const { password, salt, ...result } = user;
            return result;
        }
        return null;
    }

    public async signUpUser(userSignUpDto: UserSignUpDto): Promise<User> {
        return await this.usersService.signUp(userSignUpDto);
    }

    public signInUser(user: User): {access_token: string} {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload) 
        }
    }

}
