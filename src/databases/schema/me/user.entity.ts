import { pgTable, text } from 'drizzle-orm/pg-core';
import { base } from '../base/base.entity';
import { relations } from 'drizzle-orm';
import { todos } from '../todo/todo.entity';

export const users = pgTable('users', {
  fullName: text('full_name'),
  email: text('email').unique().unique(),
  password: text('password'),
  ...base,
});

export const userRelations = relations(users, ({ many }) => ({
  todos: many(todos),
}));
