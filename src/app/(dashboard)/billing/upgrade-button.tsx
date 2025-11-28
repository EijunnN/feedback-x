"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PLANS } from "@/lib/polar";

interface UpgradeButtonProps {
  planKey: keyof typeof PLANS;
  plan: (typeof PLANS)[keyof typeof PLANS];
  currentPlan: keyof typeof PLANS;
  hasSubscription: boolean;
  userId: string;
}

export function UpgradeButton({
  planKey,
  plan,
  currentPlan,
  hasSubscription,
  userId,
}: UpgradeButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const isCurrent = planKey === currentPlan;
  const isUpgrade =
    planKey !== "free" &&
    (currentPlan === "free" || (currentPlan === "pro" && planKey === "max"));

  const handleUpgrade = async () => {
    if (!("polarProductId" in plan)) return;

    // If user has no subscription (free), go to checkout
    if (!hasSubscription) {
      router.push(
        `/api/checkout?products=${plan.polarProductId}&metadata[userId]=${userId}&metadata[plan]=${planKey}`,
      );
      return;
    }

    // If user has subscription, show confirmation dialog
    setShowConfirmDialog(true);
  };

  const confirmUpgrade = async () => {
    if (!("polarProductId" in plan)) return;

    setLoading(true);
    setShowConfirmDialog(false);

    try {
      const res = await fetch("/api/subscription/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: plan.polarProductId,
          plan: planKey,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.refresh();
      } else {
        alert(data.error || "Failed to upgrade");
        setLoading(false);
      }
    } catch {
      alert("Failed to upgrade");
      setLoading(false);
    }
  };

  const currentPlanPrice =
    "price" in PLANS[currentPlan] ? PLANS[currentPlan].price : 0;
  const newPlanPrice = plan.price;

  if (isCurrent) {
    return (
      <Button disabled className="w-full">
        Current Plan
      </Button>
    );
  }

  if (isUpgrade && "polarProductId" in plan) {
    return (
      <>
        <Button onClick={handleUpgrade} disabled={loading} className="w-full">
          {loading ? "Processing..." : `Upgrade to ${plan.name}`}
        </Button>

        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Upgrade</DialogTitle>
              <DialogDescription>
                You are about to upgrade from {PLANS[currentPlan].name} ($
                {currentPlanPrice}/mo) to {plan.name} (${newPlanPrice}/mo).
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                The price difference will be prorated and charged immediately to
                your payment method. Your new plan benefits will be available
                right away.
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={confirmUpgrade} disabled={loading}>
                {loading ? "Processing..." : "Confirm Upgrade"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Button variant="outline" disabled className="w-full">
      {planKey === "free" ? "Downgrade" : "Not available"}
    </Button>
  );
}
