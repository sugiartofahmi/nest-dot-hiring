import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from 'src/infrastructure/drizzle/drizzle.module';
import * as schema from '../../../databases/schemas';

@Injectable()
export class JobTypeRepository {
  constructor(@Inject(DRIZZLE) private repo: NodePgDatabase<typeof schema>) {}
}
