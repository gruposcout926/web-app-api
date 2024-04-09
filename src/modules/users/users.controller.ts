import { Body, Controller, Get, Put, Request, UseFilters, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { EditUserRequest, GetUserResponse } from 'src/core/contracts';
import { CustomErrorFilter } from 'src/core/filters';
import { FirebaseAuthGuard } from 'src/core/guards';
import { UsersService } from 'src/modules/users/users.service';

@UseGuards(FirebaseAuthGuard)
@UseFilters(CustomErrorFilter)
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOkResponse({ type: GetUserResponse })
    @Get('me')
    async findCurrent(@Request() req: ExpressRequest): Promise<GetUserResponse> {
        const { email } = req.user;

        const userEntity = await this.usersService.findOneByFilter({
            email
        });

        return {
            id: userEntity.id,
            address: userEntity.address,
            dateOfBirth: userEntity.dateOfBirth,
            email: userEntity.email,
            identificationNumber: userEntity.identificationNumber,
            lastName: userEntity.lastName,
            name: userEntity.name,
            nationality: userEntity.nationality,
            phone: userEntity.phone,
            roles: req.user.roles
        };
    }

    @Put('me')
    async editUser(@Body() userRequest: EditUserRequest, @Request() req: ExpressRequest) {
        const { email } = req.user;

        return await this.usersService.editUser({
            ...userRequest,
            email
        });
    }
}
