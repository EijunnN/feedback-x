"use client";

import { RealtimeProvider } from "@upstash/realtime/client";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster richColors   />
      <RealtimeProvider>{children}</RealtimeProvider>
    </>
  );
}