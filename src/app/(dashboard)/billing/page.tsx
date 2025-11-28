// import { auth } from "@clerk/nextjs/server";
// import { eq } from "drizzle-orm";
// import { Check } from "lucide-react";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbList,
//   BreadcrumbPage,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { db } from "@/db";
// import { subscriptions } from "@/db/schema";
// import { PLANS } from "@/lib/polar";
// import { CheckoutSuccessBanner } from "./checkout-success-banner";
// import { UpgradeButton } from "./upgrade-button";

// export default async function BillingPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ success?: string }>;
// }) {
//   const { userId } = await auth();
//   if (!userId) return null;

//   const subscription = await db
//     .select()
//     .from(subscriptions)
//     .where(eq(subscriptions.userId, userId))
//     .then((rows) => rows[0]);

//   const currentPlan = (subscription?.plan as keyof typeof PLANS) || "free";
//   const { success } = await searchParams;

//   return (
//     <>
//       <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
//         <SidebarTrigger className="-ml-1" />
//         <Separator orientation="vertical" className="mr-2 h-4" />
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbPage>Billing</BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//       </header>
//       <div className="flex flex-1 flex-col gap-8 p-4">
//         {success && !subscription && <CheckoutSuccessBanner />}

//         <div>
//           <h1 className="text-2xl font-bold">Billing</h1>
//           <p className="text-muted-foreground">
//             Manage your subscription and billing
//           </p>
//         </div>

//         <div className="grid gap-6 md:grid-cols-3">
//           {(
//             Object.entries(PLANS) as [
//               keyof typeof PLANS,
//               (typeof PLANS)[keyof typeof PLANS],
//             ][]
//           ).map(([key, plan]) => {
//             return (
//               <div
//                 key={key}
//                 className={`rounded-lg border p-6 ${
//                   key === currentPlan ? "border-primary" : ""
//                 }`}
//               >
//                 <div className="mb-4">
//                   <h3 className="text-lg font-semibold">{plan.name}</h3>
//                   <div className="mt-2">
//                     <span className="text-3xl font-bold">${plan.price}</span>
//                     {plan.price > 0 && (
//                       <span className="text-muted-foreground">/month</span>
//                     )}
//                   </div>
//                 </div>

//                 <ul className="space-y-2 mb-6 text-sm">
//                   <li className="flex items-center gap-2">
//                     <Check className="h-4 w-4 text-primary" />
//                     {plan.projects === Infinity ? "Unlimited" : plan.projects}{" "}
//                     project{plan.projects !== 1 ? "s" : ""}
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <Check className="h-4 w-4 text-primary" />
//                     {plan.feedbacksPerMonth === Infinity
//                       ? "Unlimited"
//                       : plan.feedbacksPerMonth}{" "}
//                     feedbacks/month
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <Check className="h-4 w-4 text-primary" />
//                     {plan.allowImages ? "Screenshot support" : "No screenshots"}
//                   </li>
//                 </ul>

//                 <UpgradeButton
//                   planKey={key}
//                   plan={plan}
//                   currentPlan={currentPlan}
//                   hasSubscription={!!subscription?.polarSubscriptionId}
//                   userId={userId}
//                 />
//               </div>
//             );
//           })}
//         </div>

//         {subscription && subscription.status === "active" && (
//           <div className="rounded-lg border p-4">
//             <h3 className="font-semibold mb-2">Current Subscription</h3>
//             <p className="text-sm text-muted-foreground">
//               Plan: {PLANS[currentPlan].name}
//             </p>
//             {subscription.currentPeriodEnd && (
//               <p className="text-sm text-muted-foreground">
//                 Next billing date:{" "}
//                 {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }




import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Check, CreditCard } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
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
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-zinc-800 bg-black px-4">
        <SidebarTrigger className="-ml-1 text-zinc-400 hover:text-white" />
        <div className="h-4 w-px bg-zinc-800 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-mono text-xs uppercase tracking-wider text-orange-500 font-bold">Billing</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      
      <div className="flex flex-1 flex-col p-8 bg-black">
        {success && !subscription && <CheckoutSuccessBanner />}

        <div className="mb-10 flex items-center gap-3 pb-6 border-b border-zinc-800">
           <div className="p-2 bg-zinc-900 rounded-sm border border-zinc-800">
              <CreditCard className="h-5 w-5 text-white" />
           </div>
           <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Subscription Status</h1>
              <p className="text-sm text-zinc-500 font-mono">Manage your billing cycle and limits</p>
           </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {(
            Object.entries(PLANS) as [
              keyof typeof PLANS,
              (typeof PLANS)[keyof typeof PLANS],
            ][]
          ).map(([key, plan]) => {
            const isCurrent = key === currentPlan;
            return (
              <div
                key={key}
                className={`
                    relative p-8 border flex flex-col
                    ${isCurrent ? "border-orange-500 bg-orange-950/5" : "border-zinc-800 bg-zinc-950"}
                    rounded-sm transition-all hover:border-zinc-700
                `}
              >
                {isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-black px-3 py-1 rounded-sm text-[10px] font-bold font-mono uppercase tracking-widest">
                        Active Plan
                    </div>
                )}
                
                <div className="mb-6">
                  <h3 className={`text-xs font-mono uppercase tracking-wider mb-2 ${isCurrent ? 'text-orange-400' : 'text-zinc-500'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">${plan.price}</span>
                    {plan.price > 0 && (
                      <span className="text-xs text-zinc-600 font-mono">/mo</span>
                    )}
                  </div>
                </div>

                <div className="w-full h-px bg-zinc-800/50 mb-6" />

                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3 text-sm text-zinc-300">
                    <div className={`w-1 h-1 rounded-full ${isCurrent ? 'bg-orange-500' : 'bg-zinc-600'}`} />
                    <span className="font-mono text-xs">
                        {plan.projects === Infinity ? "UNLIMITED" : plan.projects} PROJECTS
                    </span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-300">
                    <div className={`w-1 h-1 rounded-full ${isCurrent ? 'bg-orange-500' : 'bg-zinc-600'}`} />
                    <span className="font-mono text-xs">
                        {plan.feedbacksPerMonth === Infinity ? "UNLIMITED" : plan.feedbacksPerMonth} FEEDBACKS
                    </span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-300">
                    <div className={`w-1 h-1 rounded-full ${isCurrent ? 'bg-orange-500' : 'bg-zinc-600'}`} />
                    <span className="font-mono text-xs text-zinc-400">
                        {plan.allowImages ? "SCREENSHOTS ENABLED" : "TEXT ONLY"}
                    </span>
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
          <div className="rounded-sm border border-zinc-800 bg-zinc-900/20 p-6 flex justify-between items-center max-w-3xl">
            <div>
                <h3 className="font-bold text-white text-sm uppercase font-mono tracking-wider mb-1">Billing Details</h3>
                <p className="text-xs text-zinc-500 font-mono">
                Current Cycle: {PLANS[currentPlan].name.toUpperCase()}
                </p>
            </div>
            {subscription.currentPeriodEnd && (
              <div className="text-right">
                <div className="text-[10px] text-zinc-600 uppercase font-mono mb-1">Renews On</div>
                <div className="text-white font-mono text-sm">
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}