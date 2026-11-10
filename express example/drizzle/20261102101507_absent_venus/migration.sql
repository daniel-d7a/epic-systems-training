CREATE TABLE "sessions" (
	"session_id" varchar(255) PRIMARY KEY,
	"expires_at" timestamp,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "todos" (
	"id" serial PRIMARY KEY,
	"todo_text" text NOT NULL,
	"done" boolean DEFAULT false,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password_hash" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "todos" ADD CONSTRAINT "todos_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");