import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';

import * as config from 'config';
import { AppModule } from './app.module';

async function bootstrap() {
    const serverConfig = config.get('server');
    const PORT = serverConfig.port;

    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Kankban API')
        .setDescription('Task Management system')
        .setVersion('1.0.0')
        .build();
        
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT, () => {
        Logger.log(`app listening to port: ${PORT}`, 'bootsrap');
    });
}
bootstrap();
