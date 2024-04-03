import { UpdateUserRoleDto } from 'src/core/dtos';

export interface ExternalAuthService {
    updateUserRole: (updateUserRoleDto: UpdateUserRoleDto) => Promise<void>;
}
