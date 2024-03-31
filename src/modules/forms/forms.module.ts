import { Module } from '@nestjs/common';
import { FormsService } from 'src/modules/forms/forms.service';
import { FormsController } from 'src/modules/forms/forms.controller';
import { CustomLogger } from 'src/core/utils';

@Module({
    controllers: [FormsController],
    providers: [CustomLogger, FormsService]
})
export class FormsModule {}
