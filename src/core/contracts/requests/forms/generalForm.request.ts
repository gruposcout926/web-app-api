import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { BeneficiaryRequest } from 'src/core/contracts/requests';

export class GeneralFormRequest {
    @ApiProperty({ type: () => BeneficiaryRequest })
    @Type(() => BeneficiaryRequest)
    @ValidateNested()
    @IsNotEmpty()
    beneficiary: BeneficiaryRequest;

    @ApiProperty()
    @ValidateNested()
    @IsNotEmpty()
    legalGuardianId: string;
}
