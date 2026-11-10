import { defineRelations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-orm/zod";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  todo_text: text("todo_text").notNull(),
  done: boolean("done").default(false),
  title: varchar("title", { length: 255 }),
  userId: integer("user_id").references(() => users.id),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 255 }),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
});

export const sessions = pgTable("sessions", {
  sesssion_id: varchar("session_id", { length: 255 }).primaryKey(),
  expiresAt: timestamp("expires_at", { mode: "string" }),
  userId: integer("user_id").references(() => users.id),
});




export const relations = defineRelations({ todos, users, sessions }, (r) => ({
  users: {
    todos: r.many.todos(),
    sessions: r.many.sessions(),
  },
  todos: {
    users: r.one.users({
      from: r.todos.userId,
      to: r.users.id,
    }),
  },
  sessions: {
    users: r.one.users({
      from: r.sessions.userId,
      to: r.users.id,
    }),
  },
}));
