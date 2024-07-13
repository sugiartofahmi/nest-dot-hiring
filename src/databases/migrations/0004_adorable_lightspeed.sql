ALTER TABLE "todos" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "todos" ADD CONSTRAINT "todos_title_unique" UNIQUE("title");