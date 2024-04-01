import { AuthModule } from 'src/modules/auth/auth.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MembersModule } from 'src/modules/members/members.module';
import { FormsModule } from 'src/modules/forms/forms.module';
import { CustomLogger } from 'src/core/utils';
import { LoggerMiddleware, RequestContextMiddleware } from 'src/core/middlewares';

@Module({
    imports: [MembersModule, AuthModule, FormsModule],
    providers: [CustomLogger]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestContextMiddleware).forRoutes('*');
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
