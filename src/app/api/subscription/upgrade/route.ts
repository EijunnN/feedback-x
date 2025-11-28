import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { polar } from "@/lib/polar";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { productId, plan } = body;

  if (!productId || !plan) {
    return NextResponse.json(
      { error: "Product ID and plan required" },
      { status: 400 },
    );
  }

  // Get current subscription
  const subscription = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .then((rows) => rows[0]);

  if (!subscription?.polarSubscriptionId) {
    return NextResponse.json(
      { error: "No active subscription found" },
      { status: 400 },
    );
  }

  // Update subscription directly with Polar - invoice immediately for proration
  try {
    await polar.subscriptions.update({
      id: subscription.polarSubscriptionId,
      subscriptionUpdate: {
        productId,
        prorationBehavior: "invoice",
      },
    });

    // Update local DB immediately
    await db
      .update(subscriptions)
      .set({ plan })
      .where(eq(subscriptions.userId, userId));

    return NextResponse.json({ success: true, plan });
  } catch (error) {
    console.error("Failed to upgrade subscription:", error);
    return NextResponse.json(
      { error: "Failed to upgrade subscription" },
      { status: 500 },
    );
  }
}
