import { Injectable } from '@nestjs/common';
import { db } from 'src/core/database/database.config';
import { CreateFormRequest } from 'src/core/contracts/requests';

@Injectable()
export class FormsService {
    async create(formData: CreateFormRequest): Promise<string> {
        const members = db.collection('members');
        // const member = await members.set(uuidv4(), memberRequest, {});

        return 'Form added';
    }
}
