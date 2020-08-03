import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

import { typeormConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { GlobalExceptionFilter } from './shared/global-exception.filter';

console.log(typeormConfig);
@Module({
    imports: [TypeOrmModule.forRoot(typeormConfig), AuthModule, UsersModule, TasksModule],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
    ],
})
export class AppModule {}
