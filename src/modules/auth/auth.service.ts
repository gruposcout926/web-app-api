import { Injectable } from '@nestjs/common';
import { UserRequest } from 'src/core';
import { MembersService } from 'src/modules/members/members.service';

@Injectable()
export class AuthService {
    constructor(private membersService: MembersService) {}

    //TODO: save this user to the database, here we have to return all the necessary to fill the dashboard.
    async signIn(userRequest: UserRequest): Promise<any> {
        console.log({ userRequest });
        return 'User signed in';
        // const dbUser = await this.membersService.findOneByEmail(user.email);
        // if (!dbUser) {
        //     return false;
        // }
    }
}
