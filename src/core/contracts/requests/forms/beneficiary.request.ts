import { ApiProperty } from '@nestjs/swagger';
import { CreateMemberRequest } from '../members';
import { IsOptional } from 'class-validator';

export class BeneficiaryRequest extends CreateMemberRequest {
    @ApiProperty()
    @IsOptional()
    phone?: string;

    @ApiProperty({ type: 'string', format: 'email' })
    @IsOptional()
    email?: string;
}
