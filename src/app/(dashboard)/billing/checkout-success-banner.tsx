"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function CheckoutSuccessBanner() {
  const router = useRouter();

  useEffect(() => {
    // Poll every 2 seconds to check if subscription is ready
    const interval = setInterval(() => {
      router.refresh();
    }, 2000);

    // Stop polling after 30 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="rounded-lg border border-green-500 bg-green-500/10 p-4">
      <p className="text-sm text-green-600 dark:text-green-400">
        Payment successful! Your subscription is being activated...
      </p>
    </div>
  );
}
