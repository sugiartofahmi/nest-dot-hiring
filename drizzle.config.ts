import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/drizzle/schemas*',
  out: './src/drizzle/schemas/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env['DATABASE_URL'] as string,
  },
});
