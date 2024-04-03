import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SignInUserRequest } from 'src/core/contracts';
import { UsersService } from 'src/modules/users/users.service';
import { CustomLogger, throwCustomError } from 'src/core/utils';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private readonly logger: CustomLogger) {}

    //TODO: save this user to the database, here we have to return all the necessary to fill the dashboard.
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

                this.logger.log(`Usuario creado: ${userRequest.email}`);
            }
        } catch (error) {
            throwCustomError(error, `${AuthService.name} - signIn`);
        }
    }
}
