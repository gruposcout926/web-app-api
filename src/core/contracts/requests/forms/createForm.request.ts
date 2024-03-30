import { ApiProperty } from '@nestjs/swagger';
import {
    AnnualAuthorizationForNearbyDeparturesRequest,
    AuthorizationForImageUseUnder18Request,
    GeneralFormRequest
} from 'src/core/contracts/requests';

export class CreateFormRequest {
    @ApiProperty({ type: () => GeneralFormRequest })
    general: GeneralFormRequest;

    // Autorización anual para salidas cercanas
    @ApiProperty({ type: () => AnnualAuthorizationForNearbyDeparturesRequest })
    annualAuthorizationForNearbyDepartures: AnnualAuthorizationForNearbyDeparturesRequest;

    // Autorización de uso de imagen menores de 18
    @ApiProperty({ type: () => AuthorizationForImageUseUnder18Request })
    authorizationForImageUseUnder18: AuthorizationForImageUseUnder18Request;
}
