import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateMemberRequest } from '../members';

export class BeneficiaryRequest extends CreateMemberRequest {
    @ApiProperty()
    @IsOptional()
    phone?: string;

    @ApiProperty({ type: () => 'string', format: 'email' })
    @IsOptional()
    email?: string;
}
