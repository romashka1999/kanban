import * as bcryptjs from 'bcryptjs';
import { User } from 'src/modules/users/user.entity';

export const hashPassword = async (password: string): Promise<{ salt: string; hashedPassword: string }> => {
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);
    return {
        salt,
        hashedPassword,
    };
};

export const validatePassword = async (password: string, self: User): Promise<boolean> => {
    const currentHash = await bcryptjs.hash(password, self.salt);
    return currentHash === self.password;
};
