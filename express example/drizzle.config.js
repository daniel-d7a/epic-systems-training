import { defineConfig } from "drizzle-kit";
import { env } from "./lib/env.js";

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
