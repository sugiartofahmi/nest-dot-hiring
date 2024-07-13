import { pgTable, text } from 'drizzle-orm/pg-core';
import { base } from '../base/base.entity';
import { relations } from 'drizzle-orm';
import { todos } from '../todo/todo.entity';

export const users = pgTable('users', {
  fullName: text('full_name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  ...base,
});

export const userRelations = relations(users, ({ many }) => ({
  todos: many(todos),
}));
