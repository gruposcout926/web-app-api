import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { UsersService } from 'src/modules/users/users.service';
import { CustomLogger } from 'src/core/utils';

@Module({
    controllers: [MembersController],
    providers: [CustomLogger, MembersService, UsersService],
    exports: [MembersService]
})
export class MembersModule {}
