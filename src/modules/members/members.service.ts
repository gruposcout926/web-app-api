import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'src/core/database/database.config';
import { v4 as uuidv4 } from 'uuid';
import { MemberResponse } from 'src/core/contracts/responses';
import { DBTables } from 'src/core/enums';
import { throwCustomError } from 'src/core/utils';
import { CreateMemberDto, EditMemberDto } from 'src/core/dtos';

// https://docs.cyclic.sh/tutorials/rest-api-and-dynamodb/part-2

@Injectable()
export class MembersService {
    async create(newMember: CreateMemberDto): Promise<string> {
        try {
            const members = db.collection(DBTables.Members);
            const member = await members.set(uuidv4(), newMember, {});

            return member.key;
        } catch (error) {
            throwCustomError(error, `${MembersService.name} - create`);
        }
    }

    async update(updatedMember: EditMemberDto): Promise<void> {
        try {
            const members = db.collection(DBTables.Members);

            // If the member is not found, an error will be thrown
            await this.findOne(updatedMember.id, updatedMember.userId);

            await this.delete(updatedMember.id);
            members.set(updatedMember.id, updatedMember, {});
        } catch (error) {
            throwCustomError(error, `${MembersService.name} - update`);
        }
    }

    /**
     * Finds all the members that belong to a user.
     * @param userId The ID of the user that owns the members.
     * @returns List of members.
     */
    async findAll(userId: string): Promise<MemberResponse[]> {
        try {
            const collection = db.collection(DBTables.Members);
            const { results } = await collection.filter({ userId });

            const members = await Promise.all(
                results.map(async ({ key }) => {
                    const memberProps = (await collection.get(key)).props;

                    return {
                        id: key,
                        ...memberProps
                    };
                })
            );

            return members;
        } catch (error) {
            throwCustomError(error, `${MembersService.name} - findAll`);
        }
    }

    async findOne(memberId: string, userId: string): Promise<MemberResponse> {
        try {
            const member = await db.collection(DBTables.Members).get(memberId);

            if (member?.props.userId === userId) {
                return { id: memberId, ...member.props };
            } else {
                throw new NotFoundException('Miembro no encontrado');
            }
        } catch (error) {
            throwCustomError(error, `${MembersService.name} - findOne`);
        }
    }

    private async delete(id: string): Promise<void> {
        const deleted = await db.collection(DBTables.Members).delete(id, null, null);

        console.log('🚀 ~ MembersService ~ delete ~ deleted:', deleted);
    }
}
