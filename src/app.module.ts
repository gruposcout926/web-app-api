import { Module } from '@nestjs/common';
import { MembersModule } from './modules/members/members.module';
import { FormsModule } from './modules/forms/forms.module';

@Module({
    imports: [MembersModule, FormsModule],
    providers: []
})
export class AppModule {}
