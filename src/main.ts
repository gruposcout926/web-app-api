import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidateInputPipe } from './core/validations';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidateInputPipe({ whitelist: true, forbidNonWhitelisted: true }));

    const config = new DocumentBuilder()
        .setTitle('GS 926 API')
        .setDescription('RESTfull API del Grupo Scout 926 Malvinas Argentinas')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    app.enableCors();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
    await app.listen(process.env.APP_PORT || 3001, '0.0.0.0');

    Logger.log(`Application running at ${await app.getUrl()}`, 'Starting App');
}
bootstrap();
