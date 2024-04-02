import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import {
    AnnualAuthorizationForNearbyDeparturesRequest,
    AuthorizationForImageUseUnder18Request,
    GeneralFormRequest
} from 'src/core/contracts/requests';
import { Type } from 'class-transformer';

export class CreateFormRequest {
    @ApiProperty({ type: () => GeneralFormRequest })
    @Type(() => GeneralFormRequest)
    @ValidateNested()
    @IsNotEmpty()
    general: GeneralFormRequest;

    // Autorización anual para salidas cercanas
    @ApiProperty({ type: () => AnnualAuthorizationForNearbyDeparturesRequest })
    @Type(() => AnnualAuthorizationForNearbyDeparturesRequest)
    @ValidateNested()
    @IsNotEmpty()
    annualAuthorizationForNearbyDepartures: AnnualAuthorizationForNearbyDeparturesRequest;

    // Autorización de uso de imagen menores de 18
    @ApiProperty({ type: () => AuthorizationForImageUseUnder18Request })
    @Type(() => AuthorizationForImageUseUnder18Request)
    @ValidateNested()
    @IsNotEmpty()
    authorizationForImageUseUnder18: AuthorizationForImageUseUnder18Request;
}
