import { pool } from "./db/index.js";

async function main() {
  await pool.query(`
    Create table todos(
      id Serial Primary Key,
      todo_text text,
      done boolean default false
    );
  `);
  console.log("done");
}

main();
