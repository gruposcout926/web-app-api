import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MembersModule } from 'src/modules/members/members.module';
import { UsersService } from 'src/modules/users/users.service';
import { CustomLogger } from 'src/core/utils';

@Module({
    imports: [MembersModule],
    controllers: [AuthController],
    providers: [AuthService, CustomLogger, UsersService],
    exports: [AuthService]
})
export class AuthModule {}
