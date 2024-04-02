import { Injectable, LogLevel } from '@nestjs/common';
import { ConsoleLogger } from '@nestjs/common/services';
import moment from 'moment';
import util from 'util';

@Injectable()
export class CustomLogger extends ConsoleLogger {
    public requestId = '';
    private readonly _context: string = 'LOGGER';

    setRequestId(requestId: string) {
        this.requestId = requestId;
    }

    constructor() {
        super();
    }

    log(message: any, context?: string) {
        this.logWithLevel('LOG', message, context);
    }

    error(message: any, context?: string) {
        this.logWithLevel('ERROR', message, context);
    }

    warn(message: any, context?: string) {
        this.logWithLevel('WARN', message, context);
    }

    debug(message: any, context?: string) {
        this.logWithLevel('DEBUG', message, context);
    }

    verbose(message: any, context?: string) {
        this.logWithLevel('VERBOSE', message, context);
    }

    setLogLevels(levels: LogLevel[]) {
        super.setLogLevels(levels);
    }

    private logWithLevel(logLevel: string, message: any, context: string) {
        const prefix: string = this.getPrefix(logLevel, context);
        const deepMessage = this.getDeepMessage(message);

        console.log(`${prefix}: ${deepMessage}`);
    }

    private getPrefix(logLevel: string, context?: string): string {
        const now = new Date();
        const timeStamp = moment(now).format('YYYY-MM-DD, HH:mm:ss');

        const formattedRequest = this.requestId ? this.requestId + ' - ' : '';
        return `${timeStamp} - ${formattedRequest}${logLevel} [${context ?? this._context}]`;
    }

    private getDeepMessage(message: any) {
        return util.inspect(message, {
            showHidden: false,
            depth: null,
            colors: true
        });
    }
}
