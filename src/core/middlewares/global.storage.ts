import { AsyncLocalStorage } from 'async_hooks';
import { DecodedUser } from 'src/core/types';

export type RequestContext = {
    requestId: string;
    user?: DecodedUser;
};

export const GlobalStore: AsyncLocalStorage<RequestContext> = new AsyncLocalStorage();
