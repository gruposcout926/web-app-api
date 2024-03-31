import { DecodedUser } from 'src/core/types';

export interface RequestStore {
    requestId: string;
    user: DecodedUser;
}
