import { Global, Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Pool } from 'pg';
import * as schema from '../../databases/schema';
import { drizzle } from 'drizzle-orm/node-postgres';
export const DRIZZLE = 'drizzle';
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');

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
