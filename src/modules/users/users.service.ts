import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserRequest } from 'src/core/contracts/requests';
import { db } from 'src/core/database/database.config';
import { EditUserDto } from 'src/core/dtos';
import { UserEntity } from 'src/core/entities';
import { DBTables } from 'src/core/enums';
import { throwCustomError } from 'src/core/utils';

@Injectable()
export class UsersService {
    async create(createUserRequest: CreateUserRequest) {
        const users = db.collection(DBTables.Users);
        const user = await users.set(createUserRequest.id, createUserRequest, {});

        return user.key;
    }

    async findOneByFilter(queryFilter: any): Promise<UserEntity | null> {
        try {
            const users = await db.collection(DBTables.Users).filter(queryFilter);

            if (!users?.results || users?.results.length === 0) {
                return null;
            }

            return users.results[0].props;
        } catch (error) {
            throwCustomError(error, `${UsersService.name} - findOneByEmail`);
        }
    }

    public async findOneByExternalId(externalUserId: string): Promise<UserEntity> {
        try {
            const user = await this.findOneByFilter({ externalUserId });

            return user;
        } catch (error) {
            throwCustomError(error, `${UsersService.name} - findOneByExternalId`);
        }
    }

    async editUser(editUserDto: EditUserDto): Promise<void> {
        try {
            const user = await this.findOneByFilter({ email: editUserDto.email });

            db.collection(DBTables.Users).set(user.id, editUserDto, {});
        } catch (error) {
            throwCustomError(error, `${UsersService.name} - editUser`);
        }
    }

    async delete(id: string): Promise<void> {
        await db.collection(DBTables.Users).delete(id, null, null);
    }
}
