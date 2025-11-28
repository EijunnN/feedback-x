import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { projects, subscriptions, usageStats } from "@/db/schema";

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    projects: 1,
    feedbacksPerMonth: 50,
    allowImages: false,
    allowCustomization: false,
    allowRemoveBranding: false,
    allowExport: false,
  },
  pro: {
    name: "Pro",
    price: 9,
    projects: 5,
    feedbacksPerMonth: 500,
    allowImages: true,
    allowCustomization: true,
    allowRemoveBranding: false,
    allowExport: true,
    polarProductId: process.env.POLAR_PRO_PRODUCT_ID,
  },
  max: {
    name: "Max",
    price: 29,
    projects: Infinity,
    feedbacksPerMonth: Infinity,
    allowImages: true,
    allowCustomization: true,
    allowRemoveBranding: true,
    allowExport: true,
    polarProductId: process.env.POLAR_MAX_PRODUCT_ID,
  },
} as const;

export type PlanType = keyof typeof PLANS;

export async function getUserPlan(userId: string): Promise<PlanType> {
  const sub = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .then((rows) => rows[0]);

  if (!sub || sub.status !== "active") return "free";
  return (sub.plan as PlanType) || "free";
}

export async function getUserPlanDetails(userId: string) {
  const plan = await getUserPlan(userId);
  return { plan, ...PLANS[plan] };
}

export async function getProjectCount(userId: string): Promise<number> {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(projects)
    .where(eq(projects.userId, userId))
    .then((rows) => Number(rows[0].count));

  return result;
}

export async function canCreateProject(userId: string): Promise<boolean> {
  const plan = await getUserPlan(userId);
  const count = await getProjectCount(userId);
  return count < PLANS[plan].projects;
}

export async function getMonthlyFeedbackCount(userId: string): Promise<number> {
  const month = new Date().toISOString().slice(0, 7);
  const stats = await db
    .select()
    .from(usageStats)
    .where(and(eq(usageStats.userId, userId), eq(usageStats.month, month)))
    .then((rows) => rows[0]);

  return stats?.feedbackCount ?? 0;
}

export async function canSubmitFeedback(userId: string): Promise<boolean> {
  const plan = await getUserPlan(userId);
  const limit = PLANS[plan].feedbacksPerMonth;
  if (limit === Infinity) return true;

  const count = await getMonthlyFeedbackCount(userId);
  return count < limit;
}

export async function incrementFeedbackCount(userId: string): Promise<void> {
  const month = new Date().toISOString().slice(0, 7);
  const { nanoid } = await import("nanoid");

  await db
    .insert(usageStats)
    .values({
      id: nanoid(),
      userId,
      month,
      feedbackCount: 1,
    })
    .onConflictDoUpdate({
      target: [usageStats.userId, usageStats.month],
      set: {
        feedbackCount: sql`${usageStats.feedbackCount} + 1`,
      },
    });
}

export async function getUserUsage(userId: string) {
  const plan = await getUserPlan(userId);
  const projectCount = await getProjectCount(userId);
  const feedbackCount = await getMonthlyFeedbackCount(userId);
  const limits = PLANS[plan];

  return {
    plan,
    projects: {
      used: projectCount,
      limit: limits.projects,
      percentage:
        limits.projects === Infinity
          ? 0
          : Math.round((projectCount / limits.projects) * 100),
    },
    feedbacks: {
      used: feedbackCount,
      limit: limits.feedbacksPerMonth,
      percentage:
        limits.feedbacksPerMonth === Infinity
          ? 0
          : Math.round((feedbackCount / limits.feedbacksPerMonth) * 100),
    },
  };
}
