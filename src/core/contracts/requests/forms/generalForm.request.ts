import { ApiProperty } from '@nestjs/swagger';
import { BeneficiaryRequest } from './beneficiary.request';
import { LegalGuardianRequest } from './legalGuardian.request';

export class GeneralFormRequest {
    @ApiProperty({ type: () => BeneficiaryRequest })
    beneficiary: BeneficiaryRequest;

    @ApiProperty({ type: () => LegalGuardianRequest })
    legalGuardian: LegalGuardianRequest;
}
