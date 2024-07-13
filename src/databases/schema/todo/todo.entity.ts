import { pgTable, text, boolean, integer } from 'drizzle-orm/pg-core';
import { base } from '../base/base.entity';
import { users } from '../me/user.entity';
import { relations } from 'drizzle-orm';

export const todos = pgTable('todos', {
  title: text('title').notNull(),
  completed: boolean('completed').default(false),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
  ...base,
});

export const todoRelations = relations(todos, ({ one }) => ({
  user: one(users, {
    fields: [todos.userId],
    references: [users.id],
  }),
}));
