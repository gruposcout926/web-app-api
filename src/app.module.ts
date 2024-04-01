import { Module } from '@nestjs/common';
import { MembersModule } from './modules/members/members.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
    imports: [MembersModule, AuthModule],
    providers: []
})
export class AppModule {}
