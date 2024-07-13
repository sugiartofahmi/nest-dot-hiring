import { config } from 'dotenv';
import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'path';
import { Pool } from 'pg';
import * as schema from './schemas';

config();

const main = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });

  const migrationPath = path.join(process.cwd(), 'src/databases/migrations');

  await migrate(db, { migrationsFolder: migrationPath });
};

main();
