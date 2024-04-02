import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class AnnualAuthorizationForNearbyDeparturesRequest {
    @ApiProperty()
    @IsBoolean()
    isAccepted: boolean;
}
