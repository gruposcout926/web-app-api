import { Injectable } from '@nestjs/common';
import { db } from 'src/core/database/database.config';
import { CreateMemberRequest } from 'src/core/contracts/requests';
import { v4 as uuidv4 } from 'uuid';
import { MemberResponse } from 'src/core/contracts/responses';
import { DBTables } from 'src/core/enums';

// https://docs.cyclic.sh/tutorials/rest-api-and-dynamodb/part-2

@Injectable()
export class MembersService {
    async create(memberRequest: CreateMemberRequest): Promise<string> {
        const members = db.collection(DBTables.Members);
        const member = await members.set(uuidv4(), memberRequest, {});

        return member.key;
    }

    async findAll(): Promise<MemberResponse[]> {
        const collection = db.collection(DBTables.Members);
        const { results } = await collection.list();

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
    }

    async findOne(id: string): Promise<MemberResponse> {
        const member = await db.collection(DBTables.Members).get(id);
        return { id, ...member.props };
    }
}
