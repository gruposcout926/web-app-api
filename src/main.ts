import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(process.env.APP_PORT || 80);

    console.log(`process.env.APP_PORT: ${process.env.APP_PORT}`);

    console.log(`Application running at ${await app.getUrl()}`, 'Starting App');
}
bootstrap();
