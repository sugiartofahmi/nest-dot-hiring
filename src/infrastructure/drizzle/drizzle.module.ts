import { Global, Module } from '@nestjs/common';
import { Pool } from 'pg';
import * as schema from '../../databases/schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from 'src/common/config';
export const DRIZZLE = 'drizzle';
@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: async () => {
        const connectionString = config.databaseUrl;

        const pool = new Pool({
          connectionString,
        });

        return drizzle(pool, { schema });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
