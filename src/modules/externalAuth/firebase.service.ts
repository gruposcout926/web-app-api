import { Injectable } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';
import { ExternalAuthService } from './externalAuth.service';
import { UpdateUserRoleDto } from 'src/core/dtos';
import { CustomLogger, throwCustomError } from 'src/core/utils';
import { SECURITY_ROLE } from 'src/core/enums';

@Injectable()
export class FirebaseService implements ExternalAuthService {
    constructor(private readonly logger: CustomLogger) {}

    public async updateUserRole(updateUserRoleDto: UpdateUserRoleDto): Promise<void> {
        try {
            const roles: SECURITY_ROLE[] = updateUserRoleDto.roles;
            await getAuth().setCustomUserClaims(updateUserRoleDto.externalUserId, { roles });

            this.logger.log(
                `Usuario: '${updateUserRoleDto.externalUserId}' seteado con los roles [${updateUserRoleDto.roles}]`
            );
        } catch (error) {
            throwCustomError(error, `${FirebaseService.name} - createUser`);
        }
    }
}
