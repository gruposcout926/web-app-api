import { Module } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { UsersController } from 'src/modules/users/users.controller';
import { CustomLogger } from 'src/core/utils';

@Module({
    controllers: [UsersController],
    providers: [CustomLogger, UsersService]
})
export class UsersModule {}
