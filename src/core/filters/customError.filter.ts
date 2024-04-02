import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    ForbiddenException,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { CustomError, CustomLogger } from 'src/core/utils';

@Catch()
export class CustomErrorFilter implements ExceptionFilter {
    constructor(private readonly logger: CustomLogger) {}

    catch(exception: any, host: ArgumentsHost) {
        const responseException = this.createHttpException(exception);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const status = responseException.getStatus();
        const message = responseException.message || responseException.getResponse();

        if (exception instanceof CustomError) {
            this.logger.error(
                exception.message,
                `Origin: ${exception.affectedMethods[0]}, Stack: ${exception.affectedMethods}`
            );
        } else {
            this.logger.error(exception.message);
        }

        response.status(status).json({
            statusCode: status,
            message
        });
    }

    private createHttpException(exception: any): HttpException {
        if (exception instanceof HttpException) {
            return exception;
        }

        //Firebase errors
        if (exception.type === 'FirebaseError') {
            let status: HttpStatus;
            let message: string;

            switch (exception.code) {
                case 'auth/user-not-found':
                    status = HttpStatus.BAD_REQUEST;
                    message = 'Usuario no encontrado';
                    break;
                case 'auth/wrong-password':
                case 'auth/invalid-email':
                    status = HttpStatus.BAD_REQUEST;
                    message = 'Credenciales incorrectas';
                    break;
                case 'auth/email-already-in-use':
                    status = HttpStatus.BAD_REQUEST;
                    message = 'El email ya está en uso';
                    break;
                case 'auth/id-token-expired':
                    status = HttpStatus.UNAUTHORIZED;
                    message = 'Token expirado';
                    break;
                case 'auth/id-token-revoked':
                    status = HttpStatus.UNAUTHORIZED;
                    message = 'Token revocado';
                    break;
                default:
                    status = HttpStatus.INTERNAL_SERVER_ERROR;
                    message = 'Ha ocurrido un error con la autenticación';
                    break;
            }

            return new HttpException(message, status);
        }

        if (exception instanceof ForbiddenException) {
            return new HttpException(exception.message, HttpStatus.FORBIDDEN);
        }

        return new HttpException(
            exception.message,
            exception.cause || exception.status || HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
