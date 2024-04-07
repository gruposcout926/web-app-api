import { Body, Controller, Get, Put, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EditUserRequest, GetUserResponse } from 'src/core/contracts';
import { CustomErrorFilter } from 'src/core/filters';
import { UsersService } from 'src/modules/users/users.service';

@UseFilters(CustomErrorFilter)
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    async findAll(): Promise<GetUserResponse> {
        const userEntity = await this.usersService.findOneByEmail('ema.ceballos@gmail.com');

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

            // TODO: this role will be taken from the logged user
            role: 'father'
        };
    }

    @Put('me')
    async editUser(@Body() userRequest: EditUserRequest) {
        return await this.usersService.editUser({
            ...userRequest,
            email: 'ema.ceballos@gmail.com'
        });
    }
}
