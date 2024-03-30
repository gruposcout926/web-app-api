import { HttpStatus, NotFoundException } from '@nestjs/common';

export class CustomError extends Error {
    public origin: string;
    public cause: any;
    public errorCode: number;
    public affectedMethods: string[];

    constructor(
        message: string,
        origin: string,
        cause: any,
        errorCode: number,
        affectedMethods: string[]
    ) {
        super(message);
        this.origin = origin;
        this.cause = cause;
        this.errorCode = errorCode;
        this.affectedMethods = affectedMethods;
        Error.captureStackTrace(this, CustomError);
    }
}

export function throwCustomError(error: any, methodName: string) {
    if (error instanceof NotFoundException || error.name === 'NotFoundError') {
        error.message = error.message?.replace('Entity', '');
        error.cause = HttpStatus.NOT_FOUND;
    }

    if (error instanceof CustomError) {
        error.affectedMethods = [...(error.affectedMethods || []), methodName];
        throw error;
    }

    const cause = error.cause || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorCode = error.code || null;
    throw new CustomError(error.message, methodName, cause, errorCode, [methodName]);
}
