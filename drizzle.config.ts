import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/databases/schema/*',
  out: './src/databases/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env['DATABASE_URL'] as string,
  },
});
