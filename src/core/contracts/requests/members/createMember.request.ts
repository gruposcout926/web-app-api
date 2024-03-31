import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMemberRequest {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    identificationNumber: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    dateOfBirth: number;

    @ApiProperty()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    nationallity: string;
}
