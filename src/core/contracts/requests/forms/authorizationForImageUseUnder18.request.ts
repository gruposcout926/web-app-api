import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class AuthorizationForImageUseUnder18Request {
    @ApiProperty()
    @IsBoolean()
    isAccepted: boolean;
}
