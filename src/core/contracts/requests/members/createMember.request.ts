import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { GuardianType } from 'src/core/enums';

export class MemberAuthorizations {
    @ApiProperty()
    @IsBoolean()
    annualAuthorizationForNearbyDeparturesRequest: boolean;

    @ApiProperty()
    @IsBoolean()
    authorizationForImageUseUnder18: boolean;
}

export class CreateMemberRequest {
    @ApiProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    identificationNumber: string;

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

    @ApiProperty({ type: () => MemberAuthorizations })
    @Type(() => MemberAuthorizations)
    @ValidateNested()
    authorizations: MemberAuthorizations;
}
