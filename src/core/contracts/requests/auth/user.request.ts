import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class SignInUserRequest {
    @ApiProperty()
    @IsNotEmpty()
    displayName: string;

    @ApiProperty()
    @IsOptional()
    lastName?: string;

    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty()
    @IsNotEmpty()
    uid: string;
}
