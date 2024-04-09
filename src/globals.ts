import { DecodedUser } from 'src/core/types';

declare module 'express' {
    export interface Request {
        user?: DecodedUser;
    }
}
