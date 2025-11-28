import { Webhooks } from "@polar-sh/nextjs";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    if (payload.type === "subscription.created") {
      const subscription = payload.data;
      const userId = subscription.metadata?.userId as string;

      if (!userId) return;

      await db
        .insert(subscriptions)
        .values({
          id: nanoid(),
          userId,
          polarCustomerId: subscription.customerId,
          polarSubscriptionId: subscription.id,
          plan: (subscription.metadata?.plan as string) || "pro",
          status: subscription.status,
          currentPeriodEnd: subscription.currentPeriodEnd
            ? new Date(subscription.currentPeriodEnd)
            : null,
        })
        .onConflictDoUpdate({
          target: subscriptions.userId,
          set: {
            polarCustomerId: subscription.customerId,
            polarSubscriptionId: subscription.id,
            plan: (subscription.metadata?.plan as string) || "pro",
            status: subscription.status,
            currentPeriodEnd: subscription.currentPeriodEnd
              ? new Date(subscription.currentPeriodEnd)
              : null,
          },
        });
    }

    if (payload.type === "subscription.updated") {
      const subscription = payload.data;

      await db
        .update(subscriptions)
        .set({
          status: subscription.status,
          currentPeriodEnd: subscription.currentPeriodEnd
            ? new Date(subscription.currentPeriodEnd)
            : null,
        })
        .where(eq(subscriptions.polarSubscriptionId, subscription.id));
    }

    if (payload.type === "subscription.canceled") {
      const subscription = payload.data;

      await db
        .update(subscriptions)
        .set({
          status: "canceled",
        })
        .where(eq(subscriptions.polarSubscriptionId, subscription.id));
    }
  },
});
