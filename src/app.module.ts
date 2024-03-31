import { Module, forwardRef } from '@nestjs/common';
import { MembersModule } from 'src/modules/members/members.module';
import { FormsModule } from 'src/modules/forms/forms.module';
import { CustomLogger } from 'src/core/utils';

@Module({
    imports: [MembersModule, forwardRef(() => FormsModule)],
    providers: [CustomLogger]
})
export class AppModule {}
