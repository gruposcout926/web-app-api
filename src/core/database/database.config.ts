import * as dotenv from 'dotenv';

dotenv.config();

import * as CyclicDb from '@cyclic.sh/dynamodb';

export const db: typeof CyclicDb = CyclicDb(process.env.DB_TABLE_NAME);
