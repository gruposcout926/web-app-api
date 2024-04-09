import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as admin from 'firebase-admin';
import { Observable } from 'rxjs';
import { GlobalStore } from 'src/core/middlewares';
import { DecodedUser } from 'src/core/types';
import { CustomLogger } from 'src/core/utils';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
    constructor(private usersService: UsersService, private readonly logger: CustomLogger) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        return this.validateRequest(request);
    }

    async validateRequest(request: Request): Promise<boolean> {
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            /* checkRevoked = true => requires an extra call to the Firebase backend
             * but increases security.
             */
            const checkRevoked = true;
            const decodedToken = await admin.auth().verifyIdToken(token, checkRevoked);
            const dbUser = await this.usersService.findOneByExternalId(decodedToken.uid);

            const loggedUser: DecodedUser = {
                ...decodedToken,
                applicationUser: dbUser,
                roles: decodedToken.roles
            };

            request.user = loggedUser;
            this.setUserInAsyncStorage(loggedUser);

            return true;
        } catch (e) {
            this.logger.error(e);

            throw new UnauthorizedException();
        }
    }

    private setUserInAsyncStorage(loggedUser: DecodedUser) {
        const store = GlobalStore.getStore();
        if (store) {
            store.user = loggedUser;
        }
    }
}
