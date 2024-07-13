import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const config = {
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT || 3000,
  apiIntegration: {
    url: process.env.API_URL,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'access-secret',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
  },
  cache: {
    todos: {
      list: 'list-todo',
      detail: 'todo',
    },
    users: {
      detail: 'user',
      list: 'list-user',
    },
  },
};
