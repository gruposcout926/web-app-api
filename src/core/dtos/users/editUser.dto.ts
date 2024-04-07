import { EditUserRequest } from 'src/core/contracts';

export class EditUserDto extends EditUserRequest {
    email: string;
}
