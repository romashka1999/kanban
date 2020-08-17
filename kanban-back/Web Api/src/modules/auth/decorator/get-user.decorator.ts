import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data, req) => {
    const user = req.args[0].user;
    return user;
});
