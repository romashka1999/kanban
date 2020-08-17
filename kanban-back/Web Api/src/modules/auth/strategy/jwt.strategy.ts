import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/modules/users/user.repository';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/modules/users/user.entity';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('token'),
            ignoreExpiration: false,
            secretOrKey: 'secret',
        });
    }

    async validate(payload: { email: string; sub: number; iat: number; exp: number }): Promise<User> {
        const { email, sub } = payload;
        const user = await this.userRepository.findOne({ email, id: sub });
        console.log('Logged User >> ', user);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
