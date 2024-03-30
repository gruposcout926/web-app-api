import { GuardianType } from 'src/core/enums';
import { CreateMemberRequest } from 'src/core/contracts/requests/members';
import { ApiProperty } from '@nestjs/swagger';

export class LegalGuardianRequest extends CreateMemberRequest {
    @ApiProperty()
    phone: string;

    @ApiProperty({ type: 'string', format: 'email' })
    email: string;

    @ApiProperty({ enum: () => GuardianType })
    guardianType: GuardianType;
}
