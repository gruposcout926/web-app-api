import * as dotenv from 'dotenv';

dotenv.config();

import * as CyclicDb from '@cyclic.sh/dynamodb';

export const db: typeof CyclicDb = CyclicDb('shy-plum-caprisCyclicDB');
