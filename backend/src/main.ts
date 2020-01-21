import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * @requires Swagger
 */
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { EmailModule } from './email/email.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    /**
     * @requires Swagger 
     * @description Add swagger document builder 
     */
    const options = new DocumentBuilder()
        .setTitle('SiteMinder API')
        .setDescription('The SiteMinder RESTful API')
        .setVersion('1.0')
        .addTag('email')
        .build();
    
    const document = SwaggerModule.createDocument(app, options);
    /*const document = SwaggerModule.createDocument(app, options, {
        include: [
            EmailModule
        ]
    });*/
    SwaggerModule.setup('/', app, document);

    await app.listen(3000);
}
bootstrap();
