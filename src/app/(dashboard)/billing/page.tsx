import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Check } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { PLANS } from "@/lib/polar";
import { CheckoutSuccessBanner } from "./checkout-success-banner";
import { UpgradeButton } from "./upgrade-button";

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) return null;

  const subscription = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .then((rows) => rows[0]);

  const currentPlan = (subscription?.plan as keyof typeof PLANS) || "free";
  const { success } = await searchParams;

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Billing</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-8 p-4">
        {success && !subscription && <CheckoutSuccessBanner />}

        <div>
          <h1 className="text-2xl font-bold">Billing</h1>
          <p className="text-muted-foreground">
            Manage your subscription and billing
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {(
            Object.entries(PLANS) as [
              keyof typeof PLANS,
              (typeof PLANS)[keyof typeof PLANS],
            ][]
          ).map(([key, plan]) => {
            return (
              <div
                key={key}
                className={`rounded-lg border p-6 ${
                  key === currentPlan ? "border-primary" : ""
                }`}
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    {plan.projects === Infinity ? "Unlimited" : plan.projects}{" "}
                    project{plan.projects !== 1 ? "s" : ""}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    {plan.feedbacksPerMonth === Infinity
                      ? "Unlimited"
                      : plan.feedbacksPerMonth}{" "}
                    feedbacks/month
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    {plan.allowImages ? "Screenshot support" : "No screenshots"}
                  </li>
                </ul>

                <UpgradeButton
                  planKey={key}
                  plan={plan}
                  currentPlan={currentPlan}
                  hasSubscription={!!subscription?.polarSubscriptionId}
                  userId={userId}
                />
              </div>
            );
          })}
        </div>

        {subscription && subscription.status === "active" && (
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Current Subscription</h3>
            <p className="text-sm text-muted-foreground">
              Plan: {PLANS[currentPlan].name}
            </p>
            {subscription.currentPeriodEnd && (
              <p className="text-sm text-muted-foreground">
                Next billing date:{" "}
                {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
