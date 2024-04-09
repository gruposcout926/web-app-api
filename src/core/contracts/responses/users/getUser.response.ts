import { UserEntity } from 'src/core/entities';

export type GetUserResponse = UserEntity & {
    roles: string[];
};
