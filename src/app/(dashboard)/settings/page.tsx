import { SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getUserUsage } from "@/lib/plans";
import {
  Activity,
  Settings as SettingsIcon,
  ShieldAlert,
  User,
} from "lucide-react";
import Link from "next/link";

export default async function SettingsPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await currentUser();
  const usage = await getUserUsage(userId);

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-zinc-800 bg-black px-4">
        <SidebarTrigger className="-ml-1 text-zinc-400 hover:text-white" />
        <div className="h-4 w-px bg-zinc-800 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-mono text-xs uppercase tracking-wider text-orange-500 font-bold">
                Settings
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col p-8 bg-black">
        <div className="mb-10 flex items-center gap-3 pb-6 border-b border-zinc-800">
          <div className="p-2 bg-zinc-900 rounded-sm border border-zinc-800">
            <SettingsIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Account Settings
            </h1>
            <p className="text-sm text-zinc-500 font-mono">
              Personal preferences and system quotas
            </p>
          </div>
        </div>

        <div className="max-w-2xl space-y-8">
          {/* USAGE METRICS SECTION */}
          <section className="border border-zinc-800 rounded-sm bg-zinc-950 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity className="h-24 w-24 text-orange-500" />
            </div>

            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-orange-500" />
                <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  System Quotas
                </h2>
              </div>
              <div className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-sm uppercase">
                Plan: {usage.plan}
              </div>
            </div>

            <div className="grid gap-6 relative z-10">
              {/* Projects Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                    Active Projects
                  </span>
                  <span className="text-xs font-mono text-white font-bold">
                    {usage.projects.used} /{" "}
                    {usage.projects.limit === Infinity
                      ? "∞"
                      : usage.projects.limit}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-sm overflow-hidden border border-zinc-800">
                  <div
                    className="h-full bg-orange-500 transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(usage.projects.percentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Feedbacks Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                    Monthly Ingestion (Feedbacks)
                  </span>
                  <span className="text-xs font-mono text-white font-bold">
                    {usage.feedbacks.used} /{" "}
                    {usage.feedbacks.limit === Infinity
                      ? "∞"
                      : usage.feedbacks.limit}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-sm overflow-hidden border border-zinc-800">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(usage.feedbacks.percentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Upgrade Callout */}
              {usage.plan === "free" && (
                <div className="mt-2 flex items-center justify-between bg-zinc-900/50 border border-zinc-800 p-3 rounded-sm">
                  <p className="text-[10px] text-zinc-400 font-mono">
                    Need higher limits? Upgrade to Pro.
                  </p>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-6 text-[10px] font-mono uppercase hover:bg-orange-500/10 hover:text-orange-500 text-zinc-300"
                  >
                    <Link href="/billing">Upgrade Plan</Link>
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* PROFILE SECTION */}
          <section className="border border-zinc-800 rounded-sm bg-zinc-950 p-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="h-4 w-4 text-zinc-500" />
              <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                Profile Identity
              </h2>
            </div>

            <div className="flex items-start gap-6">
              {user?.imageUrl && (
                <div className="relative">
                  {/* biome-ignore lint/performance/noImgElement: external clerk avatar */}
                  <img
                    src={user.imageUrl}
                    alt="Avatar"
                    className="h-16 w-16 rounded-sm border border-zinc-800"
                  />
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border border-black rounded-full" />
                </div>
              )}
              <div className="space-y-4 flex-1">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-600 font-mono uppercase">
                    Display Name
                  </label>
                  <div className="text-sm text-white font-medium border-b border-zinc-800 pb-1 w-full">
                    {user?.fullName}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-600 font-mono uppercase">
                    Email Address
                  </label>
                  <div className="text-sm text-zinc-300 font-mono border-b border-zinc-800 pb-1 w-full">
                    {user?.primaryEmailAddress?.emailAddress}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SESSION CONTROL */}
          <section className="border border-red-900/30 rounded-sm bg-red-950/5 p-6">
            <div className="flex items-center gap-2 mb-6">
              <ShieldAlert className="h-4 w-4 text-red-500" />
              <h2 className="text-sm font-bold text-red-500 uppercase font-mono tracking-wider">
                Session Control
              </h2>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-white font-medium">Sign Out</p>
                <p className="text-xs text-zinc-500">
                  End your current session on this device.
                </p>
              </div>
              <SignOutButton>
                <Button
                  variant="destructive"
                  size="sm"
                  className="font-mono text-xs uppercase bg-red-900/20 hover:bg-red-900 border border-red-900 text-red-400 hover:text-white rounded-sm"
                >
                  Terminate Session
                </Button>
              </SignOutButton>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}