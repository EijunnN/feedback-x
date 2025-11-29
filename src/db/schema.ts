import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  domain: text("domain"),
  apiKey: text("api_key").notNull().unique(),

  // Widget customization (Pro+)
  widgetPosition: text("widget_position").default("bottom-right"),
  widgetColor: text("widget_color").default("#6366f1"),
  widgetText: text("widget_text").default("Feedback"),
  showBranding: boolean("show_branding").default(true),

  // Feedback types enabled
  enableBugs: boolean("enable_bugs").default(true),
  enableIdeas: boolean("enable_ideas").default(true),
  enableOther: boolean("enable_other").default(true),

  // Notifications (Pro+)
  notifyEmail: text("notify_email"),

  // Capture matrix customization (all plans)
  bugLabel: text("bug_label").default("Bug"),
  bugEmoji: text("bug_emoji").default("🐛"),
  ideaLabel: text("idea_label").default("Idea"),
  ideaEmoji: text("idea_emoji").default("💡"),
  otherLabel: text("other_label").default("Other"),
  otherEmoji: text("other_emoji").default("💬"),
  feedbackPlaceholder: text("feedback_placeholder").default(
    "Describe your issue or idea...",
  ),

  // Branding customization (Max plan)
  brandingText: text("branding_text").default("Powered by Annya"),
  brandingLink: text("branding_link").default("https://annya.io"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const feedbacks = pgTable("feedbacks", {
  id: text("id").primaryKey(),
  projectId: text("project_id").references(() => projects.id, {
    onDelete: "cascade",
  }),
  type: text("type").notNull(),
  message: text("message").notNull(),
  imageUrl: text("image_url"),
  userEmail: text("user_email"),
  metadata: jsonb("metadata"),
  status: text("status").default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const subscriptions = pgTable("subscriptions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  polarCustomerId: text("polar_customer_id"),
  polarSubscriptionId: text("polar_subscription_id"),
  plan: text("plan").default("free"),
  status: text("status").default("active"),
  currentPeriodEnd: timestamp("current_period_end"),
});

export const usageStats = pgTable(
  "usage_stats",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    month: text("month").notNull(),
    feedbackCount: integer("feedback_count").default(0),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [unique("user_month_unique").on(table.userId, table.month)],
);
