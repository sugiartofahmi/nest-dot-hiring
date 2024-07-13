CREATE TABLE IF NOT EXISTS "users" (
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
