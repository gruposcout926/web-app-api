import { Module } from '@nestjs/common';
import { MembersModule } from './modules/members/members.module';

@Module({
    imports: [MembersModule],
    providers: []
})
export class AppModule {}
