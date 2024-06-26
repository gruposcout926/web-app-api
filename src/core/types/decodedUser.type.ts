import { UserEntity } from 'src/core/entities';
import { FirebaseUser } from 'src/core/types';

export type DecodedUser = FirebaseUser & {
    applicationUser: UserEntity;
    roles: string[];
};
