import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { GuardianType } from 'src/core/enums';

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
    nationality: string;

    @ApiProperty()
    @IsNotEmpty()
    emergencyPhone: string;

    @ApiProperty({ enum: GuardianType, example: Object.values(GuardianType) })
    @IsNotEmpty()
    @IsEnum(GuardianType, {
        each: true,
        message: `Tutor inválido. Valores disponibles: ${Object.values(GuardianType)}`
    })
    tutorCharacter: GuardianType;
}
