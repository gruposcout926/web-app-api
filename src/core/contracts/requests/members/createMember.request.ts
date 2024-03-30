import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateMemberRequest {
    @ApiProperty()
    name: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    @IsNumber()
    identificationNumber: number;

    @ApiProperty()
    @IsNumber()
    dateOfBirth: number;

    @ApiProperty()
    address: string;

    @ApiProperty()
    nationallity: string;
}
