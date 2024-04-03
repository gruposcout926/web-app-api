import { SECURITY_ROLE } from 'src/core/enums';

export interface UpdateUserRoleDto {
    externalUserId: string;
    roles: SECURITY_ROLE[];
}
