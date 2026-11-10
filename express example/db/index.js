import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";
import { env } from "../lib/env.js";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  // host: "localhost",
  // user: "postgres",
  // password: "password",
  // port: "5432",
  // database: "express_todos",
});

export const db = drizzle({ client: pool, schema });
