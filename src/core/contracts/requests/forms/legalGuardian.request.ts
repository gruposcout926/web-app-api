import { ApiProperty } from '@nestjs/swagger';
import { GuardianType } from 'src/core/enums';
import { CreateMemberRequest } from 'src/core/contracts/requests/members';
import { IsNotEmpty } from 'class-validator';

export class LegalGuardianRequest extends CreateMemberRequest {
    @ApiProperty()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ type: () => 'string', format: 'email' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ enum: () => GuardianType, example: Object.values(GuardianType), isArray: false })
    @IsNotEmpty()
    guardianType: GuardianType;
}
