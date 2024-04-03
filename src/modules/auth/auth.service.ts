import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SignInUserRequest } from 'src/core/contracts';
import { UsersService } from 'src/modules/users/users.service';
import { CustomLogger, throwCustomError } from 'src/core/utils';
import { ExternalAuthService } from 'src/modules/externalAuth';
import { SECURITY_ROLE } from 'src/core/enums';

@Injectable()
export class AuthService {
    constructor(
        @Inject('ExternalAuthService')
        private readonly externalAuthService: ExternalAuthService,
        private usersService: UsersService,
        private readonly logger: CustomLogger
    ) {}

    async signIn(userRequest: SignInUserRequest): Promise<any> {
        try {
            const dbUser = await this.usersService.findOneByEmail(userRequest.email);

            if (!dbUser) {
                await this.usersService.create({
                    id: uuidv4(),
                    name: userRequest.displayName,
                    identificationNumber: 0,
                    dateOfBirth: 0,
                    lastName: userRequest.lastName,
                    phone: userRequest.phoneNumber,
                    email: userRequest.email,
                    address: '',
                    nationallity: '',
                    externalUserId: userRequest.uid
                });

                await this.externalAuthService.updateUserRole({
                    externalUserId: userRequest.uid,
                    roles: [SECURITY_ROLE.Tutor]
                });

                this.logger.log(`Usuario creado: ${userRequest.email} con rol:`);
            }
        } catch (error) {
            throwCustomError(error, `${AuthService.name} - signIn`);
        }
    }
}
