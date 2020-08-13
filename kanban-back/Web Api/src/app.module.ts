import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { GlobalExceptionFilter } from './shared/global-exception.filter';


@Module({
    imports: [
        ConfigModule.forRoot({
            expandVariables: true,
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions | any> => ({
                type: configService.get<string>('DB_TYPE'),
                host: configService.get<string>('DB_HOST'),
                port: configService.get<string>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
                synchronize: !!configService.get<string>('DB_SYNCHRONIZE'),
                logging: !!configService.get<string>('DB_LOGGING'),
            })  
        }), 
        AuthModule,
        UsersModule, 
        TasksModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
    ],
})
export class AppModule {}
