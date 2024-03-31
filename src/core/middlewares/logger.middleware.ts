import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { GlobalStore } from 'src/core/middlewares';
import { CustomLogger } from 'src/core/utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private logger: CustomLogger) {}
    use(req: Request, res: Response, next: NextFunction) {
        const requestId = GlobalStore.getStore()?.requestId;

        res.setHeader('x-request-id', requestId);

        this.logger.setRequestId(requestId);

        const { method, originalUrl } = req;

        this.logger.log(`${method} - ${originalUrl}`, 'HTTP - Request');

        res.on('finish', () => {
            const { statusCode } = res;
            this.logger.log(`${method} - ${statusCode}`, 'HTTP - Response');
        });

        next();
    }
}
