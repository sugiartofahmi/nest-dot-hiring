import { pgTable, text } from 'drizzle-orm/pg-core';
import { base } from '../base/base.entity';

export const users = pgTable('users', {
  fullName: text('full_name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  ...base,
});
