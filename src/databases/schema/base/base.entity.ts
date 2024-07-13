import { timestamp, integer } from 'drizzle-orm/pg-core';

export const base = {
  id: integer('id').generatedByDefaultAsIdentity().notNull().primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
};
