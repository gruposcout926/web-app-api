import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(process.env.APP_PORT || 3001);

    console.log(`Application running at ${await app.getUrl()}`, 'Starting App');
}
bootstrap();
