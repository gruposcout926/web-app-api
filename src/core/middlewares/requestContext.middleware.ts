import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { GlobalStore } from 'src/core/middlewares';
import { v4 as uuidv4 } from 'uuid';
import { DecodedUser } from 'src/core/types';
import { RequestStore } from 'src/core/interfaces';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    use(req: Request, _: Response, next: NextFunction) {
        const user: DecodedUser = null;

        const store: RequestStore = {
            requestId: (req.headers['x-request-id'] as string) || uuidv4(),
            user
        };

        GlobalStore.run(store, () => next());
    }
}
