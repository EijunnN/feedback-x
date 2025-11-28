import { Webhooks } from "@polar-sh/nextjs";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { polar } from "@/lib/polar";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    // Handle subscription created - fetch checkout to get metadata
    if (payload.type === "subscription.created") {
      const subscription = payload.data;

      if (!subscription.checkoutId) {
        console.log("No checkoutId in subscription, skipping");
        return;
      }

      // Fetch checkout from Polar to get metadata
      const checkout = await polar.checkouts.get({
        id: subscription.checkoutId,
      });

      const userId = checkout.metadata?.userId as string;
      const plan = (checkout.metadata?.plan as string) || "pro";

      if (!userId) {
        console.log("No userId in checkout metadata, skipping");
        return;
      }

      console.log("Processing subscription for user:", userId, "plan:", plan);

      await db
        .insert(subscriptions)
        .values({
          id: nanoid(),
          userId,
          polarCustomerId: subscription.customerId,
          polarSubscriptionId: subscription.id,
          plan,
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
            plan,
            status: subscription.status,
            currentPeriodEnd: subscription.currentPeriodEnd
              ? new Date(subscription.currentPeriodEnd)
              : null,
          },
        });

      console.log("Subscription created/updated for user:", userId);
    }

    if (payload.type === "subscription.updated") {
      const subscription = payload.data;

      // Check if this is an upgrade by looking at the checkout metadata
      let plan: string | undefined;
      if (subscription.checkoutId) {
        try {
          const checkout = await polar.checkouts.get({
            id: subscription.checkoutId,
          });
          if (checkout.metadata?.upgrade === "true") {
            plan = checkout.metadata?.plan as string;
            console.log("Subscription upgraded to:", plan);
          }
        } catch {
          // Checkout might not exist or be accessible
        }
      }

      await db
        .update(subscriptions)
        .set({
          status: subscription.status,
          currentPeriodEnd: subscription.currentPeriodEnd
            ? new Date(subscription.currentPeriodEnd)
            : null,
          ...(plan && { plan }),
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
