import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeormConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';

console.log(typeormConfig)
@Module({
    imports: [
        TypeOrmModule.forRoot(typeormConfig),
        AuthModule,
        UsersModule,
        TasksModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
