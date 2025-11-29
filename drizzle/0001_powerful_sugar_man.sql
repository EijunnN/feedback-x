CREATE TABLE "usage_stats" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"month" text NOT NULL,
	"feedback_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "user_month_unique" UNIQUE("user_id","month")
);
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "widget_position" text DEFAULT 'bottom-right';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "widget_color" text DEFAULT '#6366f1';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "widget_text" text DEFAULT 'Feedback';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "show_branding" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "enable_bugs" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "enable_ideas" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "enable_other" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "notify_email" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "bug_label" text DEFAULT 'Bug';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "bug_emoji" text DEFAULT '🐛';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "idea_label" text DEFAULT 'Idea';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "idea_emoji" text DEFAULT '💡';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "other_label" text DEFAULT 'Other';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "other_emoji" text DEFAULT '💬';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "feedback_placeholder" text DEFAULT 'Describe your issue or idea...';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "branding_text" text DEFAULT 'Powered by Annya';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "branding_link" text DEFAULT 'https://annya.io';